
import Head from 'next/head';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapPin, AlertTriangle, Droplet, Thermometer } from 'lucide-react';

// Define the type for the regional data
interface ClimateData {
  year: number;
  temperature: number;
  precipitation: number;
}

// Define the type for regional data mapping
interface RegionalData {
  [region: string]: ClimateData[];
}

// Define regions
const regions = [
  { id: 1, name: 'North America' },
  { id: 2, name: 'Europe' },
  { id: 3, name: 'Asia' },
  { id: 4, name: 'Africa' },
  { id: 5, name: 'South America' },
  { id: 6, name: 'Oceania' },
];

// Define the regional data with proper typing
const regionalData: RegionalData = {
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
};

export default function RegionalInsights() {
  const [selectedRegion, setSelectedRegion] = useState<'North America' | 'Europe' | 'Asia' | 'Africa' | 'South America' | 'Oceania'>('North America');

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Regional Insights - ClimateInsight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Regional Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select Region</h2>
            <ul className="space-y-2">
              {regions.map(region => (
                <li key={region.id}>
                  <button
                    onClick={() => setSelectedRegion(region.name as 'North America' | 'Europe' | 'Asia' | 'Africa' | 'South America' | 'Oceania')}
                    className={`w-full text-left px-4 py-2 rounded ${
                      selectedRegion === region.name ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <MapPin className="inline-block mr-2" size={16} />
                    {region.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedRegion} Climate Projections</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={regionalData[selectedRegion]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="precipitation" stroke="#82ca9d" name="Precipitation (mm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <AlertTriangle className="mr-2" size={20} />
              Key Risks
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Increased frequency of heatwaves</li>
              <li>Rising sea levels affecting coastal areas</li>
              <li>More intense and frequent hurricanes</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Thermometer className="mr-2" size={20} />
              Temperature Impact
            </h3>
            <p>Average temperature is projected to increase by 2.7°C by 2050, leading to significant changes in local ecosystems and agriculture.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Droplet className="mr-2" size={20} />
              Precipitation Changes
            </h3>
            <p>Annual precipitation is expected to decrease by 6% by 2050, potentially leading to water scarcity issues in some areas.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Adaptation Strategies</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Implement water conservation measures and improve irrigation efficiency</li>
            <li>Develop heat-resistant crop varieties to maintain agricultural productivity</li>
            <li>Enhance coastal defenses to mitigate the impact of rising sea levels</li>
            <li>Improve urban planning to reduce heat island effects in cities</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

