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
      description: "Dive deep into historical climate data and AI-powered predictions to comprehend the changing patterns of our planet.",
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
    <div className={`${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen font-sans transition-colors duration-300 ease-in-out`}>
      <Head>
        <title>ClimateInsight - AI-Powered Climate Monitoring</title>
        <meta name="description" content="Track climate change trends and get AI-powered insights and early warnings for your region." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Bar */}
      <nav className="bg-blue-600 py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-300">
            ClimateInsight
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/data-analysis" className="text-white hover:text-blue-200 transition-colors duration-300">
              Data Analysis
            </Link>
            <Link href="/regional-insights" className="text-white hover:text-blue-200 transition-colors duration-300">
              Regional Insights
            </Link>
            <Link href="/early-warnings" className="text-white hover:text-blue-200 transition-colors duration-300">
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
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 relative h-[300px]">
            {heroSections.map((section, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-500 ${
                  index === activeHeroSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  {section.title}
                </h2>
                <p className={`text-lg md:text-xl mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {section.description}
                </p>
              </div>
            ))}
            <div className="absolute bottom-0">
              <Link
                href="/data-analysis"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Explore Data <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
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
      <section className="container mx-auto px-6 py-12">
        <div className={`rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6">
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Global Climate Trends
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Temperature and CO2 Chart */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Temperature and CO2 Levels
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer>
                    <LineChart data={climateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="year" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                      <YAxis yAxisId="left" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                      <YAxis yAxisId="right" orientation="right" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1F2937' : '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                        labelStyle={{
                          color: darkMode ? '#fff' : '#000'
                        }}
                      />
                      <Legend />
                      <Line 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#8884d8" 
                        name="Temperature (°C)"
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="co2" 
                        stroke="#82ca9d" 
                        name="CO2 (ppm)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sea Level Chart */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Sea Level Rise
                </h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer>
                    <AreaChart data={seaLevelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="year" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                      <YAxis stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1F2937' : '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '4px'
                        }}
                        labelStyle={{
                          color: darkMode ? '#fff' : '#000'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="level" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                        name="Sea Level Rise (cm)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <BarChart2 className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Explore historical climate data and uncover trends using our interactive charts and AI-powered insights.
            </p>
            <Link 
              href="/data-analysis" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Analyze Data <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <Map className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Regional Insights</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Get localized climate predictions, risk assessments, and adaptation strategies for your specific area.
            </p>
            <Link 
              href="/regional-insights" 
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
              View Insights <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Early Warnings</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Receive timely alerts about potential climate-related risks and extreme weather events in your region.
            </p>
            <Link 
              href="/early-warnings" 
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Set Alerts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Climate Map */}
      <section className="container mx-auto px-6 py-12">
        <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Explore Climate Data by Region
        </h2>
        <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <ClimateMap darkMode={darkMode} />
        </div>
      </section>

      {/* News & Insights */}
      <section className={`container mx-auto px-6 py-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <h2 className="text-3xl font-bold mb-8">Latest News & Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsSection darkMode={darkMode} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 py-12">
        <div className={`
          ${darkMode ? 'bg-yellow-900/20 text-yellow-100' : 'bg-yellow-50 text-yellow-800'}
          border-l-4 border-yellow-500 p-6 rounded-lg shadow-md
        `}>
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-yellow-100' : 'text-yellow-800'}`}>
                Stay Informed
              </h3>
              <p className={`${darkMode ? 'text-yellow-100/90' : 'text-yellow-700'}`}>
                Climate change affects us all. Sign up for personalized alerts and contribute to a sustainable future.
              </p>
              <div className="mt-6">
                <button className="
                  px-6 py-3 bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 active:bg-blue-800
                  transform transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  shadow-md hover:shadow-lg
                ">
                  Sign Up for Alerts
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`
        ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-800 text-gray-300'}
        py-8 mt-12
      `}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ClimateInsight</h3>
              <p className="text-sm opacity-80">
                Providing AI-powered climate monitoring and insights for a sustainable future.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="/data-analysis" className="hover:text-white transition-colors">Data Analysis</Link></li>
                <li><Link href="/regional-insights" className="hover:text-white transition-colors">Regional Insights</Link></li>
                <li><Link href="/early-warnings" className="hover:text-white transition-colors">Early Warnings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 text-center text-sm opacity-70">
            <p>© {new Date().getFullYear()} ClimateInsight. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={() => setShowLoginModal(false)}
            />

            {/* Modal panel */}
            <div className={`
              inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
              ${darkMode ? 'bg-gray-800' : 'bg-white'}
            `}>
              <LoginModal onClose={() => setShowLoginModal(false)} darkMode={darkMode} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
