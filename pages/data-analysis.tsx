
import Head from 'next/head';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sliders, Download, Sun, Moon } from 'lucide-react'; // Import Sun and Moon icons
import Link from 'next/link'; // Import Link for navigation

const data = [
  { year: 2010, temperature: 14.5, co2: 389, seaLevel: 0 },
  { year: 2015, temperature: 15.2, co2: 400, seaLevel: 3 },
  { year: 2020, temperature: 15.8, co2: 412, seaLevel: 7 },
  { year: 2025, temperature: 16.3, co2: 420, seaLevel: 12 },
];

export default function DataAnalysis() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['temperature', 'co2', 'seaLevel']);
  const [darkMode, setDarkMode] = useState(false); // Local darkMode state

  const toggleMetric = (metric: 'temperature' | 'co2' | 'seaLevel') => {
    setSelectedMetrics(prev => 
      prev.includes(metric) ? prev.filter(m => m !== metric) : [...prev, metric]
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Head>
        <title>Data Analysis - ClimateInsight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Data Analysis</h1>

          {/* Dark mode toggle button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-600'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Button to navigate back to the homepage */}
        <Link href="/" className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back to Homepage
        </Link>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg mb-8`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Climate Trends</h2>
            <div className="flex space-x-2">
              <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Sliders size={20} />
              </button>
              <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                <Download size={20} />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedMetrics.includes('temperature') && <Bar dataKey="temperature" fill="#8884d8" name="Temperature (°C)" />}
              {selectedMetrics.includes('co2') && <Bar dataKey="co2" fill="#82ca9d" name="CO2 (ppm)" />}
              {selectedMetrics.includes('seaLevel') && <Bar dataKey="seaLevel" fill="#ffc658" name="Sea Level Rise (cm)" />}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} p-6 rounded-lg shadow-lg mb-8`}>
          <h2 className="text-xl font-semibold mb-4">Metric Selection</h2>
          <div className="flex flex-wrap gap-4">
            {['temperature', 'co2', 'seaLevel'].map(metric => (
              <button
                key={metric}
                onClick={() => toggleMetric(metric as 'temperature' | 'co2' | 'seaLevel')}
                className={`px-4 py-2 rounded ${
                  selectedMetrics.includes(metric) ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} p-6 rounded-lg shadow-lg`}>
          <h2 className="text-xl font-semibold mb-4">AI-Powered Insights</h2>
          <ul className={`list-disc pl-5 space-y-2 ${darkMode ? 'text-gray-300' : 'text-black'}`}>
            <li>Temperature is rising at an average rate of 0.3°C per decade.</li>
            <li>CO2 levels show a strong correlation with temperature increase (r = 0.95).</li>
            <li>Sea level rise is accelerating, with the rate doubling every 20 years.</li>
            <li>Current trends suggest a potential temperature increase of 2°C by 2050 if no action is taken.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}


