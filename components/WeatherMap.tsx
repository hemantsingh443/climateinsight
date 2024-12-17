import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

// Interfaces remain the same...
interface Location {
  name: string;
  region: string;
  lat: number;
  lon: number;
}

interface Current {
  temp_c: number;
  wind_kph: number;
  humidity: number;
  precip_mm: number;
  vis_km: number;
  pressure_mb: number;
  condition: {
    text: string;
    icon: string;
  };
}

interface WeatherData {
  location: Location;
  current: Current;
}

interface WeatherMapProps {
  darkMode: boolean;
}

interface MapPosition {
  lat: number;
  lng: number;
}

// Key fix: Move Map component import outside of WeatherMap component
const Map = dynamic(
  () => import('./Map').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
);

const WeatherMap: React.FC<WeatherMapProps> = ({ darkMode }) => {
  const [weatherPoints, setWeatherPoints] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Changed to false initially
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [center, setCenter] = useState<[number, number]>([28.6139, 77.2090]);
  const [zoom, setZoom] = useState<number>(10);

  const fetchWeatherForLocation = async (lat: number, lng: number): Promise<void> => {
    try {
      setError(null); // Clear any previous errors
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lng}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();
      
      setWeatherPoints(prevPoints => {
        const exists = prevPoints.some(point => 
          point.location.lat === data.location.lat && 
          point.location.lon === data.location.lon
        );
        if (!exists) {
          return [...prevPoints, data];
        }
        return prevPoints;
      });
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleMapClick = async (position: MapPosition) => {
    setLoading(true);
    await fetchWeatherForLocation(position.lat, position.lng);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/geocode?address=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to geocode address');
      }
      const { lat, lon } = await response.json();
      setCenter([lat, lon]);
      setZoom(12);
      await fetchWeatherForLocation(lat, lon);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial weather data
    const fetchInitialData = async () => {
      setLoading(true);
      await fetchWeatherForLocation(center[0], center[1]);
      setLoading(false);
    };
    
    fetchInitialData();
    
    // Update weather data every 5 minutes
    const interval = setInterval(() => {
      weatherPoints.forEach(point => {
        fetchWeatherForLocation(point.location.lat, point.location.lon);
      });
    }, 300000);
    
    return () => clearInterval(interval);
  }, []); // Remove center from dependencies to prevent infinite loop

  return (
    <Card className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <CardTitle className={darkMode ? 'text-white' : ''}>
            Interactive Weather Map
          </CardTitle>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ''}`}
            />
            <button
              type="submit"
              className={`p-2 rounded-md flex items-center justify-center ${
                darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          <Map
            center={center}
            zoom={zoom}
            darkMode={darkMode}
            weatherPoints={weatherPoints}
            onMapClick={handleMapClick}
          />
          {error && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-2 rounded-md">
              {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherMap;
