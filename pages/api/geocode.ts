
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  lat: number;
  lon: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  const apiKey = process.env.WEATHER_API_KEY;
  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Address is required and must be a string' });
  }

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(address)}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }

    res.status(200).json({
      lat: data[0].lat,
      lon: data[0].lon,
    });
  } catch (error) {
    console.error('Geocoding API error:', error);
    const message = error instanceof Error ? error.message : 'Failed to geocode address';
    res.status(500).json({ error: message });
  }
}

