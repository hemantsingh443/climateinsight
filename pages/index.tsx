
import Head from 'next/head';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sun, Moon, BarChart2, Map, AlertTriangle, UserCircle } from 'lucide-react';
import Link from 'next/link';
import ClimateMap from '../components/ClimateMap';
import NewsSection from '../components/NewsSection';
import LoginModal from '../components/LoginModal';

// Mock data for the chart
const data = [
  { year: 2010, temperature: 14.5, co2: 389 },
  { year: 2015, temperature: 15.2, co2: 400 },
  { year: 2020, temperature: 15.8, co2: 412 },
  { year: 2025, temperature: 16.3, co2: 420 },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Head>
        <title>ClimateInsight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-md`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">ClimateInsight</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/data-analysis">
              <span className="hover:text-blue-500">Data Analysis</span>
            </Link>
            <Link href="/regional-insights">
              <span className="hover:text-blue-500">Regional Insights</span>
            </Link>
            <Link href="/early-warnings">
              <span className="hover:text-blue-500">Early Warnings</span>
            </Link>

            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <UserCircle size={20} />
              <span>Login</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-600'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Climate Dashboard</h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#82ca9d" name="CO2 (ppm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Interactive Climate Map</h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <ClimateMap darkMode={darkMode} />
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <BarChart2 className="w-12 h-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p>Advanced AI algorithms analyze vast amounts of climate data to identify trends and patterns.</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <Map className="w-12 h-12 mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Regional Insights</h3>
            <p>Get localized climate predictions and impact assessments for your specific region.</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
            <h3 className="text-xl font-semibold mb-2">Early Warnings</h3>
            <p>Receive timely alerts about potential climate-related risks and extreme weather events.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Climate Action Recommendations</h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <ul className="list-disc pl-6">
              <li>Reduce energy consumption by 15% through efficient appliances and behavior changes.</li>
              <li>Increase use of renewable energy sources by 30% in your local area.</li>
              <li>Implement water conservation measures to prepare for potential droughts.</li>
              <li>Support local initiatives for urban greening and biodiversity preservation.</li>
            </ul>
          </div>
        </section>

        <NewsSection darkMode={darkMode} />
      </main>

      <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} py-6 mt-12`}>
        <div className="container mx-auto text-center">
          <p>&copy; 2024 ClimateInsight. All rights reserved.</p>
        </div>
      </footer>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} darkMode={darkMode} />}
    </div>
  );
}

