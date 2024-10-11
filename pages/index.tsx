import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Sun, Moon, BarChart2, Map, AlertTriangle, Thermometer, Wind, Droplet, ArrowRight } from 'lucide-react';

// Components
import ClimateMap from '../components/ClimateMap';
import NewsSection from '../components/NewsSection';
import LoginModal from '../components/LoginModal';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({ temp: 0, humidity: 0, windSpeed: 0 });
  const [activeHeroSection, setActiveHeroSection] = useState(0);

  useEffect(() => {
    // Simulating weather data fetch
    setCurrentWeather({ temp: 22, humidity: 60, windSpeed: 5 });

    // Rotate hero sections
    const interval = setInterval(() => {
      setActiveHeroSection((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const climateData = [
    { year: 2010, temperature: 14.5, co2: 389 },
    { year: 2015, temperature: 15.2, co2: 400 },
    { year: 2020, temperature: 15.8, co2: 412 },
    { year: 2025, temperature: 16.3, co2: 420 },
  ];

  const seaLevelData = [
    { year: 1900, level: 0 },
    { year: 1950, level: 5 },
    { year: 2000, level: 20 },
    { year: 2050, level: 50 },
  ];

  const heroSections = [
    {
      title: "Understanding Our Climate",
      description: "Dive deep into historical climate data and AI-powered predictions                                                                                                            to comprehend the changing patterns of our planet.",
    },
    {
      title: "Predicting Our Future",
      description: "Leverage cutting-edge AI models to forecast climate trends and prepare for potential environmental challenges.",
    },
    {
      title: "Taking Action Together",
      description: "Join a global community of climate-conscious individuals and organizations working towards a sustainable future.",
    },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen font-sans transition-colors duration-300 ease-in-out`}>
      <Head>
        <title>ClimateInsight - AI-Powered Climate Monitoring</title>
        <meta name="description" content="Track climate change trends and get AI-powered insights and early warnings for your region." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Bar */}
      <nav className="bg-blue-600 py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white cursor-pointer">
            ClimateInsight
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/data-analysis" className="text-white hover:text-blue-200 cursor-pointer">
              Data Analysis
            </Link>
            <Link href="/regional-insights" className="text-white hover:text-blue-200 cursor-pointer">
              Regional Insights
            </Link>
            <Link href="/early-warnings" className="text-white hover:text-blue-200 cursor-pointer">
              Early Warnings
            </Link>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-300"
            >
              Login
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-white hover:bg-blue-500 transition-colors duration-300"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
            {heroSections.map((section, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-500 ${
                  index === activeHeroSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  {section.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6">
                  {section.description}
                </p>
              </div>
            ))}
            <div className="mt-32">
              <Link href="/data-analysis" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                Explore Data
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Current Weather</h3>
              <div className="flex justify-around">
                <div className="text-center">
                  <Thermometer className="h-8 w-8 mx-auto text-red-500" />
                  <p className="mt-2">{currentWeather.temp}°C</p>
                </div>
                <div className="text-center">
                  <Droplet className="h-8 w-8 mx-auto text-blue-500" />
                  <p className="mt-2">{currentWeather.humidity}%</p>
                </div>
                <div className="text-center">
                  <Wind className="h-8 w-8 mx-auto text-green-500" />
                  <p className="mt-2">{currentWeather.windSpeed} m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Data Visualization */}
    
<section className={`container mx-auto px-6 py-12 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-md transition-all duration-300`}>
  <h2 className="text-2xl font-bold mb-4">Global Climate Trends</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-300`}>
      <h3 className="text-xl font-semibold mb-4">Temperature and CO2 Levels</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={climateData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#ccc'} />
          <XAxis dataKey="year" stroke={darkMode ? '#9CA3AF' : '#333'} />
          <YAxis yAxisId="left" stroke={darkMode ? '#9CA3AF' : '#333'} />
          <YAxis yAxisId="right" orientation="right" stroke={darkMode ? '#9CA3AF' : '#333'} />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : '#fff', color: darkMode ? '#fff' : '#333' }} />
          <Legend wrapperStyle={{ color: darkMode ? '#fff' : '#333' }} />
          <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
          <Line yAxisId="right" type="monotone" dataKey="co2" stroke="#82ca9d" name="CO2 (ppm)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-300`}>
      <h3 className="text-xl font-semibold mb-4">Sea Level Rise</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={seaLevelData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#ccc'} />
          <XAxis dataKey="year" stroke={darkMode ? '#9CA3AF' : '#333'} />
          <YAxis stroke={darkMode ? '#9CA3AF' : '#333'} />
          <Tooltip contentStyle={{ backgroundColor: darkMode ? '#1F2937' : '#fff', color: darkMode ? '#fff' : '#333' }} />
          <Area type="monotone" dataKey="level" stroke="#8884d8" fill="#8884d8" name="Sea Level Rise (cm)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
</section>




      {/* Features Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <BarChart2 className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Explore historical climate data and uncover trends using our interactive charts and AI-powered insights.
            </p>
            <Link href="/data-analysis" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
              Analyze Data <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Map className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Regional Insights</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get localized climate predictions, risk assessments, and adaptation strategies for your specific area.
            </p>
            <Link href="/regional-insights" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300">
              View Insights <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Early Warnings</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Receive timely alerts about potential climate-related risks and extreme weather events in your region.
            </p>
            <Link href="/early-warnings" className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300">
              Set Alerts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Climate Map */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Explore Climate Data by Region</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <ClimateMap darkMode={darkMode} />
        </div>
      </section>

      {/* News & Insights */}
      <NewsSection darkMode={darkMode} />

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded-md">
          <div className="flex">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-4" />
            <div>
              <h3 className="font-bold">Stay Informed</h3>
              <p>Climate change affects us all. Sign up for personalized alerts and contribute to a sustainable future.</p>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
            Sign Up for Alerts
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 mt-12">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2024 ClimateInsight. All rights reserved.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} darkMode={darkMode} />
      )}
    </div>
  );
};

export default Home;
