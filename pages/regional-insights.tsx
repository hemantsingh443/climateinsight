import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, AlertTriangle, Droplet, Thermometer, Sun, Moon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

// Define the valid region names as a type
type RegionName = 'North America' | 'Europe' | 'Asia' | 'Africa' | 'South America' | 'Oceania';

const RegionalInsights = () => {
  // Type `selectedRegion` as a valid region name
  const [selectedRegion, setSelectedRegion] = useState<RegionName>('North America');
  const [darkMode, setDarkMode] = useState(false);

  const regions = [
    { id: 1, name: 'North America', color: 'bg-blue-500' },
    { id: 2, name: 'Europe', color: 'bg-green-500' },
    { id: 3, name: 'Asia', color: 'bg-yellow-500' },
    { id: 4, name: 'Africa', color: 'bg-red-500' },
    { id: 5, name: 'South America', color: 'bg-purple-500' },
    { id: 6, name: 'Oceania', color: 'bg-pink-500' },
  ];

  const regionalData: Record<RegionName, { year: number; temperature: number; precipitation: number; }[]> = {
    'North America': [
      { year: 2020, temperature: 15.2, precipitation: 1000 },
      { year: 2030, temperature: 16.1, precipitation: 980 },
      { year: 2040, temperature: 17.0, precipitation: 960 },
      { year: 2050, temperature: 17.9, precipitation: 940 },
    ],
    'Europe': [
      { year: 2020, temperature: 14.8, precipitation: 850 },
      { year: 2030, temperature: 15.5, precipitation: 830 },
      { year: 2040, temperature: 16.2, precipitation: 810 },
      { year: 2050, temperature: 16.9, precipitation: 790 },
    ],
    'Asia': [
      { year: 2020, temperature: 16.5, precipitation: 1200 },
      { year: 2030, temperature: 17.3, precipitation: 1150 },
      { year: 2040, temperature: 18.1, precipitation: 1100 },
      { year: 2050, temperature: 18.9, precipitation: 1050 },
    ],
    'Africa': [
      { year: 2020, temperature: 21.1, precipitation: 600 },
      { year: 2030, temperature: 21.8, precipitation: 580 },
      { year: 2040, temperature: 22.5, precipitation: 560 },
      { year: 2050, temperature: 23.2, precipitation: 540 },
    ],
    'South America': [
      { year: 2020, temperature: 20.3, precipitation: 1200 },
      { year: 2030, temperature: 21.0, precipitation: 1150 },
      { year: 2040, temperature: 21.7, precipitation: 1100 },
      { year: 2050, temperature: 22.4, precipitation: 1050 },
    ],
    'Oceania': [
      { year: 2020, temperature: 18.7, precipitation: 950 },
      { year: 2030, temperature: 19.4, precipitation: 930 },
      { year: 2040, temperature: 20.1, precipitation: 910 },
      { year: 2050, temperature: 20.8, precipitation: 890 },
    ],
  };  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-bold"
          >
            Regional Climate Insights
          </motion.h1>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-full ${darkMode ? 'border-gray-700 hover:bg-gray-800' : ''}`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardHeader>
              <CardTitle className={darkMode ? 'text-white' : ''}>Regions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {regions.map((region) => (
                  <motion.button
                    key={region.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRegion(region.name as RegionName)} 
                   
                    className={`w-full flex items-center p-3 rounded-lg transition-all ${
                      selectedRegion === region.name
                        ? 'bg-blue-500 text-white shadow-lg'
                        : darkMode
                        ? 'hover:bg-gray-700 text-gray-200'
                        : 'hover:bg-gray-100 text-gray-900'
                    }`}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{region.name}</span>
                    <Badge
                      variant="outline"
                      className={`ml-auto ${region.color} bg-opacity-20 ${darkMode ? 'border-gray-700' : ''}`}
                    >
                      {regionalData[region.name as RegionName]?.[0].temperature}°C  {/* Cast here */}
                    </Badge>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={`md:col-span-3 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardHeader>
              <CardTitle className={darkMode ? 'text-white' : ''}>{selectedRegion} Climate Projections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={regionalData[selectedRegion]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis 
                      dataKey="year" 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <YAxis 
                      yAxisId="left" 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke={darkMode ? '#9CA3AF' : '#4B5563'}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? '#1F2937' : 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        color: darkMode ? '#F9FAFB' : '#111827'
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone"
                      dataKey="temperature"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      dot={{ stroke: '#8B5CF6', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone"
                      dataKey="precipitation"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ stroke: '#10B981', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  Key Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className={`flex items-center ${darkMode ? 'text-gray-300' : ''}`}>
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                    Increased frequency of heatwaves
                  </li>
                  <li className={`flex items-center ${darkMode ? 'text-gray-300' : ''}`}>
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                    Rising sea levels affecting coastal areas
                  </li>
                  <li className={`flex items-center ${darkMode ? 'text-gray-300' : ''}`}>
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                    More intense and frequent hurricanes
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                  <Thermometer className="mr-2 h-5 w-5 text-orange-500" />
                  Temperature Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : ''}`}>
                  Average temperature is projected to increase by 2.7°C by 2050, leading to significant changes in local ecosystems and agriculture.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
              <CardHeader>
                <CardTitle className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                  <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                  Precipitation Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : ''}`}>
                  Annual precipitation is expected to decrease by 6% by 2050, potentially leading to water scarcity issues in some areas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Link href="/" passHref>
          <Button 
            variant="outline" 
            className={`mt-8 ${darkMode ? 'border-gray-700 hover:bg-gray-800 text-white' : ''}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Homepage
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default RegionalInsights;
