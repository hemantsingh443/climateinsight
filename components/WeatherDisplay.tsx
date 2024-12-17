import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Thermometer,
  Wind,
  Droplet,
  Clock,
  Navigation,
  Eye,
  CloudRain,
  Gauge,
  Search,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// Type definitions for weather data
interface WeatherCondition {
  text: string;
  icon: string;
}

interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  localtime: string;
}

interface WeatherCurrent {
  temp_c: number;
  feelslike_c: number;
  condition: WeatherCondition;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  humidity: number;
  dewpoint_c: number;
  vis_km: number;
  cloud: number;
  pressure_mb: number;
  uv: number;
}

interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
}

interface WeatherDisplayProps {
  darkMode?: boolean;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ darkMode = false }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('Delhi');
  const [isSearching, setIsSearching] = useState(false);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchWeather(searchQuery);
    const interval = setInterval(() => fetchWeather(searchQuery), 300000);
    return () => clearInterval(interval);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      fetchWeather(searchQuery);
    }
  };

  const renderWeatherCards = () => {
    if (!weatherData) return null;
    const { current } = weatherData;

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="h-5 w-5 text-red-500" />
            <span className={darkMode ? 'text-white' : ''}>Temperature</span>
          </div>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>
            {current.temp_c}°C
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Feels like: {current.feelslike_c}°C
          </p>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2 mb-2">
            <CloudRain className="h-5 w-5 text-blue-500" />
            <span className={darkMode ? 'text-white' : ''}>Condition</span>
          </div>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : ''}`}>
            {current.condition.text}
          </p>
          <Image
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            width={32}
            height={32}
            className="h-8 w-8"
          />
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Wind className="h-5 w-5 text-green-500" />
            <span className={darkMode ? 'text-white' : ''}>Wind</span>
          </div>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : ''}`}>
            {current.wind_kph} km/h
          </p>
          <div className="flex items-center gap-1">
            <Navigation className="h-4 w-4" style={{ transform: `rotate(${current.wind_degree}deg)` }} />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              {current.wind_dir}
            </span>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Droplet className="h-5 w-5 text-blue-500" />
            <span className={darkMode ? 'text-white' : ''}>Humidity</span>
          </div>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : ''}`}>
            {current.humidity}%
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Dew point: {current.dewpoint_c}°C
          </p>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-5 w-5 text-purple-500" />
            <span className={darkMode ? 'text-white' : ''}>Visibility</span>
          </div>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : ''}`}>
            {current.vis_km} km
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            Cloud cover: {current.cloud}%
          </p>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-5 w-5 text-yellow-500" />
            <span className={darkMode ? 'text-white' : ''}>Pressure</span>
          </div>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : ''}`}>
            {current.pressure_mb} mb
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            UV Index: {current.uv}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className={darkMode ? 'text-white' : ''}>
                {weatherData?.location?.name}, {weatherData?.location?.region}
              </CardTitle>
              <CardDescription className={darkMode ? 'text-gray-300' : ''}>
                {weatherData?.location?.country}
              </CardDescription>
            </div>
            <div className="text-right">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                <Clock className="inline-block mr-1 h-4 w-4" />
                {weatherData?.location?.localtime}
              </p>
            </div>
          </div>
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
              disabled={isSearching}
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 pr-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            renderWeatherCards()
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
