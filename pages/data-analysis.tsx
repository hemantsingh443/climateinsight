import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sliders, Download, Sun, Moon, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const data = [
  { year: 2010, temperature: 14.5, co2: 389, seaLevel: 0 },
  { year: 2015, temperature: 15.2, co2: 400, seaLevel: 3 },
  { year: 2020, temperature: 15.8, co2: 412, seaLevel: 7 },
  { year: 2025, temperature: 16.3, co2: 420, seaLevel: 12 },
];

export default function DataAnalysis() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['temperature', 'co2', 'seaLevel']);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMetric = (metric: 'temperature' | 'co2' | 'seaLevel') => {
    setSelectedMetrics(prev => 
      prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]
    );
  };

  const getLatestValue = (metric: string) => {
    const latestData = data[data.length - 1];
    return latestData[metric as keyof typeof latestData];
  };

  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'temperature':
        return '°C';
      case 'co2':
        return 'ppm';
      case 'seaLevel':
        return 'cm';
      default:
        return '';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>Data Analysis - ClimateInsight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-bold"
          >
            Data Analysis
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

        <Link href="/" passHref>
          <Button 
            variant="outline" 
            className={`mb-8 ${darkMode ? 'border-gray-700 hover:bg-gray-800 text-white' : ''}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Homepage
          </Button>
        </Link>

        <Card className={`mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={darkMode ? 'text-white' : ''}>Climate Trends</CardTitle>
            <div className="flex space-x-2">
              <Button size="icon" variant="outline">
                <Sliders className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="year" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                  <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
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
                  {selectedMetrics.includes('temperature') && <Bar dataKey="temperature" fill="#8884d8" name="Temperature (°C)" />}
                  {selectedMetrics.includes('co2') && <Bar dataKey="co2" fill="#82ca9d" name="CO2 (ppm)" />}
                  {selectedMetrics.includes('seaLevel') && <Bar dataKey="seaLevel" fill="#ffc658" name="Sea Level Rise (cm)" />}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className={`mb-8 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className={darkMode ? 'text-white' : ''}>Metric Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {['temperature', 'co2', 'seaLevel'].map(metric => (
                <Button
                  key={metric}
                  onClick={() => toggleMetric(metric as 'temperature' | 'co2' | 'seaLevel')}
                  variant={selectedMetrics.includes(metric) ? "default" : "outline"}
                  className={`flex items-center space-x-2 ${darkMode && !selectedMetrics.includes(metric) ? 'border-gray-700 text-gray-300' : ''}`}
                >
                  <span>{metric.charAt(0).toUpperCase() + metric.slice(1)}</span>
                  <Badge variant="secondary" className={darkMode ? 'bg-gray-700' : ''}>
                    {getLatestValue(metric)} {getMetricUnit(metric)}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className={darkMode ? 'text-white' : ''}>AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className={`list-disc pl-5 space-y-2 ${darkMode ? 'text-gray-300' : ''}`}>
              <li>Temperature is rising at an average rate of 0.3°C per decade.</li>
              <li>CO2 levels show a strong correlation with temperature increase (r = 0.95).</li>
              <li>Sea level rise is accelerating, with the rate doubling every 20 years.</li>
              <li>Current trends suggest a potential temperature increase of 2°C by 2050 if no action is taken.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
