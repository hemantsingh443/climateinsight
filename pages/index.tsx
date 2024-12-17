import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';
import {
    Sun,
    Moon,
    BarChart2,
    Map,
    AlertTriangle,
    ArrowRight,
} from 'lucide-react';


// Import shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,

} from "@/components/ui/sheet";

import NewsSection from '../components/NewsSection';
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import WeatherDisplay from '../components/WeatherDisplay';
import WeatherMap from '../components/WeatherMap';

interface User {
    id: number;
    username: string;
    displayName: string;
}

const Home = () => {
    const [user, setUser] = useState<User | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [activeHeroSection, setActiveHeroSection] = useState(0);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHeroSection((prev) => (prev + 1) % 3);
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    // Check if user is logged in on page load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Logout handler
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Login success handler
    const handleLoginSuccess = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setShowLoginModal(false);
    };

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
            title: 'Understanding Our Climate',
            description: 'Dive deep into historical climate data and AI-powered predictions.',
        },
        {
            title: 'Predicting Our Future',
            description: 'Leverage cutting-edge AI models to forecast climate trends.',
        },
        {
            title: 'Taking Action Together',
            description: 'Join a global community working towards sustainability.',
        },
    ];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <Head>
                <title>ClimateInsight - AI-Powered Climate Monitoring</title>
                <meta
                    name="description"
                    content="Track climate change trends and get AI-powered insights and early warnings for your region."
                />
            </Head>

            <NavigationMenu className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            ClimateInsight
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={darkMode ? 'text-white' : ''}>Features</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className={`grid gap-3 p-4 w-[400px] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                <Link href="/data-analysis" className={`block p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                    Data Analysis
                                </Link>
                                <Link href="/regional-insights" className={`block p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                    Regional Insights
                                </Link>
                                <Link href="/early-warnings" className={`block p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                    Early Warnings
                                </Link>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Welcome, {user.displayName}!</span>
                                    <Button variant="outline" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => setShowSignUpModal(true)}>
                                    Sign Up
                                </Button>
                                <Button variant="outline" onClick={() => setShowLoginModal(true)}>
                                    Login
                                </Button>
                            </>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDarkMode(!darkMode)}
                            className={`rounded-full ${darkMode ? 'border-gray-700 hover:bg-gray-800' : ''}`}
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-12">
                <Card className={`bg-transparent border-none shadow-none ${darkMode ? 'text-white' : ''}`}>
                    <CardContent className="flex flex-col md:flex-row items-center p-0">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            {heroSections.map((section, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-500 ${index === activeHeroSection
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8 pointer-events-none absolute'
                                        }`}
                                >
                                    <CardTitle className="text-4xl md:text-5xl mb-4">{section.title}</CardTitle>
                                    <CardDescription className={`text-lg md:text-xl mb-6 ${darkMode ? 'text-gray-300' : ''}`}>
                                        {section.description}
                                    </CardDescription>
                                </div>
                            ))}
                            <Button className="mt-6" asChild>
                                <Link href="/data-analysis">
                                    Explore Data <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="md:w-1/2">
                            <WeatherDisplay darkMode={darkMode} />
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Climate Data Visualization */}
            <section className="container mx-auto px-6 py-12">
                <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <CardHeader>
                        <CardTitle className={darkMode ? 'text-white' : ''}>Global Climate Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="temperature">
                            <TabsList className="mb-4">
                                <TabsTrigger value="temperature">Temperature & CO2</TabsTrigger>
                                <TabsTrigger value="sealevel">Sea Level Rise</TabsTrigger>
                            </TabsList>

                            <TabsContent value="temperature">
                                <div className="h-[300px]">
                                    <ResponsiveContainer>
                                        <LineChart data={climateData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                                            <XAxis dataKey="year" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                                            <YAxis yAxisId="left" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
                                            <YAxis yAxisId="right" orientation="right" stroke={darkMode ? '#9CA3AF' : '#4B5563'} />
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
                                                name="Temperature (°C)"
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="co2"
                                                stroke="#10B981"
                                                name="CO2 (ppm)"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </TabsContent>

                            <TabsContent value="sealevel">
                                <div className="h-[300px]">
                                    <ResponsiveContainer>
                                        <AreaChart data={seaLevelData}>
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
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-12">
                <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : ''}`}>Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                        <CardHeader>
                            <BarChart2 className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className={darkMode ? 'text-white' : ''}>Data Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className={`mb-4 ${darkMode ? 'text-gray-300' : ''}`}>
                                Explore historical climate data and uncover trends using our
                                interactive charts and AI-powered insights.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild>
                                <Link href="/data-analysis">
                                    Analyze Data <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                        <CardHeader>
                            <Map className="h-12 w-12 text-green-500 mb-4" />
                            <CardTitle className={darkMode ? 'text-white' : ''}>Regional Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className={`mb-4 ${darkMode ? 'text-gray-300' : ''}`}>
                                Get localized climate predictions and risk assessments for your specific area.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" asChild>
                                <Link href="/regional-insights">
                                    View Insights <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                        <CardHeader>
                            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
                            <CardTitle className={darkMode ? 'text-white' : ''}>Early Warnings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className={`mb-4 ${darkMode ? 'text-gray-300' : ''}`}>
                                Receive timely alerts about potential climate-related risks.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="destructive" asChild>
                                <Link href="/early-warnings">
                                    Set Alerts <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>


            <section className="container mx-auto px-5 py-12">
                <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : ''}`}>
                    Current Weather Map
                </h2>
                <WeatherMap darkMode={darkMode} />
            </section>


            {/* News & Insights */}
            <section className={`container mx-auto px-6 py-12 ${darkMode ? 'text-white' : ''}`}>
                <h2 className="text-3xl font-bold mb-8">Latest News & Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <NewsSection darkMode={darkMode} />
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-6 py-12">
                <Alert className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className={darkMode ? 'text-white' : ''}>Stay Informed</AlertTitle>
                    <AlertDescription className={darkMode ? 'text-gray-300' : ''}>
                        Climate change affects us all. Sign up for personalized alerts
                        and contribute to a sustainable future.
                        <Button variant="outline" onClick={() => setShowSignUpModal(true)}>
                            Sign Up for Alerts
                        </Button>
                    </AlertDescription>
                </Alert>
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
            {/* Update your Login Modal */}
            {showLoginModal && (
                <Sheet open={showLoginModal} onOpenChange={setShowLoginModal}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Login to ClimateInsight</SheetTitle>
                            <SheetDescription>
                                Access your personalized climate monitoring dashboard
                            </SheetDescription>
                        </SheetHeader>
                        <LoginModal
                            onClose={() => setShowLoginModal(false)}
                            darkMode={darkMode}
                            onLoginSuccess={handleLoginSuccess}
                        />
                    </SheetContent>
                </Sheet>
            )}

            {/* Sign Up Modal */}
            <Sheet open={showSignUpModal} onOpenChange={setShowSignUpModal}>
                <SheetContent className={darkMode ? 'bg-gray-800 text-white' : ''}>
                    <SheetHeader>
                        <SheetTitle className={darkMode ? 'text-white' : ''}>Sign Up for ClimateInsight</SheetTitle>
                        <SheetDescription className={darkMode ? 'text-gray-300' : ''}>
                            Create an account to access personalized climate insights
                        </SheetDescription>
                    </SheetHeader>
                    <SignUpModal onClose={() => setShowSignUpModal(false)} darkMode={darkMode} />
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Home;
