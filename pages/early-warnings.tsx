// pages/early-warnings.js
import Head from 'next/head';
import { useState } from 'react';
import { AlertTriangle, ThermometerSun, Droplets, Wind, MapPin } from 'lucide-react';

const warningLevels = {
  low: 'bg-green-100 text-green-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  severe: 'bg-red-100 text-red-800',
};

const warnings = [
  { id: 1, type: 'Heatwave', level: 'high', region: 'Southwest', description: 'Temperatures expected to exceed 40°C for the next 5 days.' },
  { id: 2, type: 'Drought', level: 'moderate', region: 'Midwest', description: 'Rainfall 50% below average for the past 3 months.' },
  { id: 3, type: 'Severe Storm', level: 'severe', region: 'Southeast', description: 'Category 4 hurricane approaching the coast.' },
  { id: 4, type: 'Flooding', level: 'moderate', region: 'Northeast', description: 'Heavy rainfall may cause river levels to rise significantly.' },
];

export default function EarlyWarnings() {
  const [selectedWarning, setSelectedWarning] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Early Warnings - ClimateInsight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Early Warnings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Active Warnings</h2>
            <div className="space-y-4">
              {warnings.map(warning => (
                <div
                  key={warning.id}
                  className={`p-4 rounded-lg cursor-pointer ${warningLevels[warning.level]} ${selectedWarning === warning.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedWarning(warning.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{warning.type}</h3>
                    <span className="px-2 py-1 text-sm rounded-full bg-white">{warning.region}</span>
                  </div>
                  <p className="text-sm">{warning.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Warning Levels</h2>
            <ul className="space-y-2">
              {Object.entries(warningLevels).map(([level, className]) => (
                <li key={level} className={`px-4 py-2 rounded-lg ${className}`}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Recent Trends</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <ThermometerSun className="mr-2" size={20} />
                <span>Average temperature increased by 1.2°C in the past decade</span>
              </li>
              <li className="flex items-center">
                <Droplets className="mr-2" size={20} />
                <span>20% increase in extreme precipitation events since 2000</span>
              </li>
              <li className="flex items-center">
                <Wind className="mr-2" size={20} />
                <span>Tropical cyclone intensity has increased by 5% globally</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">AI-Powered Predictions</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                <span>70% chance of severe drought in the Southwest within the next 5 years</span>
              </li>
              <li className="flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                <span>Projected 30% increase in category 4-5 hurricanes by 2050</span>
              </li>
              <li className="flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                <span>Risk of wildfires in Western regions expected to double by 2040</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Preparedness Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">For Individuals:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create an emergency kit with essential supplies</li>
                <li>Stay informed about local weather conditions and warnings</li>
                <li>Develop and practice a family emergency plan</li>
                <li>Consider flood and storm-resistant home improvements</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">For Communities:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Implement early warning systems and communication networks</li>
                <li>Develop and maintain evacuation routes and shelters</li>
                <li>Invest in climate-resilient infrastructure</li>
                <li>Conduct regular emergency response drills</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Regional Alert Map</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
            {/* Placeholder for an interactive map */}
            <div className="flex items-center justify-center h-full">
              <MapPin size={48} className="text-gray-400" />
              <span className="ml-2 text-gray-500">Interactive map placeholder</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            This interactive map would show the locations and severity of current climate-related alerts and warnings across different regions.
          </p>
        </div>
      </main>
    </div>
  );
}
