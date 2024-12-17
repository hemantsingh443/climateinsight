import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface WeatherApiError {
  error?: {
    message?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.WEATHER_API_KEY;
  const { lat, lon, location = 'Delhi' } = req.query;

  try {
    // Ensure query parameters are strings
    const safeLat = Array.isArray(lat) ? lat[0] : lat;
    const safeLon = Array.isArray(lon) ? lon[0] : lon;
    const safeLocation = Array.isArray(location) ? location[0] : location;
    
    const query = safeLat && safeLon ? `${safeLat},${safeLon}` : safeLocation;
    
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      // Use type assertion or type guard to safely handle the response
      const errorData = await response.json() as WeatherApiError;
      throw new Error(
        errorData.error?.message || `Weather API responded with status: ${response.status}`
      );
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch weather data';
    res.status(500).json({ error: message });
  }
}
