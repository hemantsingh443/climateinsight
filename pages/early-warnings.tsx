import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AlertTriangle, ThermometerSun, Droplets, Wind, MapPin, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const warningLevels = {
  low: { light: 'bg-green-100 text-green-900', dark: 'bg-green-900/20 text-green-300' },
  moderate: { light: 'bg-yellow-100 text-yellow-900', dark: 'bg-yellow-900/20 text-yellow-300' },
  high: { light: 'bg-orange-100 text-orange-900', dark: 'bg-orange-900/20 text-orange-300' },
  severe: { light: 'bg-red-100 text-red-900', dark: 'bg-red-900/20 text-red-300' },
} as const;

type WarningLevel = keyof typeof warningLevels;

interface Warning {
  id: number;
  type: string;
  level: WarningLevel;
  region: string;
  description: string;
}

const warnings: Warning[] = [
  { id: 1, type: 'Heatwave', level: 'high', region: 'Southwest', description: 'Temperatures expected to exceed 40°C for the next 5 days.' },
  { id: 2, type: 'Drought', level: 'moderate', region: 'Midwest', description: 'Rainfall 50% below average for the past 3 months.' },
  { id: 3, type: 'Severe Storm', level: 'severe', region: 'Southeast', description: 'Category 4 hurricane approaching the coast.' },
  { id: 4, type: 'Flooding', level: 'moderate', region: 'Northeast', description: 'Heavy rainfall may cause river levels to rise significantly.' },
];

export default function EarlyWarnings() {
  const [selectedWarning, setSelectedWarning] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>Early Warnings - ClimateInsight</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-2"
          >
            <Link href="/">
              <Button 
                variant="outline" 
                className={`mb-4 ${darkMode ? 'border-gray-700 hover:bg-gray-800 text-white' : ''}`}
              >
                Back to Homepage
              </Button>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">Early Warnings</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Monitor and track climate-related alerts and predictions
            </p>
          </motion.div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-full ${darkMode ? 'border-gray-700 hover:bg-gray-800' : ''}`}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className={`md:col-span-2 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <CardHeader>
              <CardTitle className={darkMode ? 'text-white' : ''}>Active Warnings</CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : ''}>
                Current climate alerts and their severity levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {warnings.map(warning => (
                    <motion.div
                      key={warning.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: warning.id * 0.1 }}
                    >
                      <Alert
                        className={`cursor-pointer transition-colors ${
                          selectedWarning === warning.id ? 'ring-2 ring-blue-500' : ''
                        } ${darkMode ? warningLevels[warning.level].dark : warningLevels[warning.level].light}`}
                        onClick={() => setSelectedWarning(warning.id)}
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="flex items-center justify-between">
                          {warning.type}
                          <Badge 
                            variant="outline" 
                            className={darkMode ? 'border-gray-700' : ''}
                          >
                            {warning.region}
                          </Badge>
                        </AlertTitle>
                        <AlertDescription>{warning.description}</AlertDescription>
                      </Alert>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
            <CardHeader>
              <CardTitle className={darkMode ? 'text-white' : ''}>Warning Levels</CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : ''}>
                Understanding severity classifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(warningLevels).map(([level]) => (
                  <Alert 
                    key={level} 
                    className={darkMode ? warningLevels[level as WarningLevel].dark : warningLevels[level as WarningLevel].light}
                  >
                    <AlertTitle>{level.charAt(0).toUpperCase() + level.slice(1)}</AlertTitle>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="mb-6">
          <TabsList className={`grid w-full grid-cols-2 ${darkMode ? 'bg-gray-800' : ''}`}>
            <TabsTrigger 
              value="trends"
              className={darkMode ? 'data-[state=active]:bg-gray-700' : ''}
            >
              Recent Trends
            </TabsTrigger>
            <TabsTrigger 
              value="predictions"
              className={darkMode ? 'data-[state=active]:bg-gray-700' : ''}
            >
              AI Predictions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends">
            <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : ''}>Climate Trends</CardTitle>
                <CardDescription className={darkMode ? 'text-gray-400' : ''}>
                  Historical climate data and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300' : ''}`}>
                    <ThermometerSun className="h-5 w-5 text-orange-500" />
                    <span>Average temperature increased by 1.2°C in the past decade</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300' : ''}`}>
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>20% increase in extreme precipitation events since 2000</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300' : ''}`}>
                    <Wind className="h-5 w-5 text-gray-500" />
                    <span>Tropical cyclone intensity has increased by 5% globally</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="predictions">
            <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
              <CardHeader>
                <CardTitle className={darkMode ? 'text-white' : ''}>AI-Powered Predictions</CardTitle>
                <CardDescription className={darkMode ? 'text-gray-400' : ''}>
                  Future climate risk assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    '70% chance of severe drought in the Southwest within the next 5 years',
                    'Projected 30% increase in category 4-5 hurricanes by 2050',
                    'Risk of wildfires in Western regions expected to double by 2040'
                  ].map((prediction, index) => (
                    <Alert 
                      key={index}
                      className={darkMode ? 'bg-gray-700 border-gray-600' : ''}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className={darkMode ? 'text-gray-300' : ''}>
                        {prediction}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className={`mb-6 ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
          <CardHeader>
            <CardTitle className={darkMode ? 'text-white' : ''}>
              Preparedness Recommendations
            </CardTitle>
            <CardDescription className={darkMode ? 'text-gray-400' : ''}>
              Guidelines for individuals and communities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : ''}`}>
                  For Individuals:
                </h3>
                <ul className={`space-y-2 list-disc pl-5 ${darkMode ? 'text-gray-300' : ''}`}>
                  <li>Create an emergency kit with essential supplies</li>
                  <li>Stay informed about local weather conditions and warnings</li>
                  <li>Develop and practice a family emergency plan</li>
                  <li>Consider flood and storm-resistant home improvements</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : ''}`}>
                  For Communities:
                </h3>
                <ul className={`space-y-2 list-disc pl-5 ${darkMode ? 'text-gray-300' : ''}`}>
                  <li>Implement early warning systems and communication networks</li>
                  <li>Develop and maintain evacuation routes and shelters</li>
                  <li>Invest in climate-resilient infrastructure</li>
                  <li>Conduct regular emergency response drills</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={darkMode ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className={darkMode ? 'text-white' : ''}>Regional Alert Map</CardTitle>
            <CardDescription className={darkMode ? 'text-gray-400' : ''}>
              Geographic distribution of current alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`aspect-w-16 aspect-h-9 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
              <div className={`flex flex-col items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin size={48} />
                <span className="mt-2">Interactive map placeholder</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
