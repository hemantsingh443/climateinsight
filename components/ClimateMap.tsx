

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

// Dynamically import MapContainer and other react-leaflet components
const DynamicMapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

// Define marker icons (this should only run on the client-side)
const initializeLeaflet = async () => {
  const L = await import('leaflet'); // Use dynamic import
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png', // Update paths for your public directory
    iconUrl: '/leaflet/images/marker-icon.png', // Update paths for your public directory
    shadowUrl: '/leaflet/images/marker-shadow.png', // Update paths for your public directory
  });
};

interface RegionData {
  id: number;
  name: string;
  temperature: number;
  co2: number;
  coordinates: LatLngExpression; // Use LatLngExpression for better typing
}

const regions: RegionData[] = [
  { id: 1, name: 'North America', temperature: 15.2, co2: 410, coordinates: [40, -100] },
  { id: 2, name: 'Europe', temperature: 14.8, co2: 405, coordinates: [50, 15] },
  { id: 3, name: 'Asia', temperature: 16.5, co2: 415, coordinates: [30, 100] },
  { id: 4, name: 'Africa', temperature: 18.2, co2: 400, coordinates: [0, 20] },
  { id: 5, name: 'South America', temperature: 22.5, co2: 395, coordinates: [-20, -60] },
  { id: 6, name: 'Australia', temperature: 20.1, co2: 402, coordinates: [-25, 135] },
  // ... add more regions
];

interface ClimateMapProps {
  darkMode: boolean;
}

const ClimateMap: React.FC<ClimateMapProps> = ({ darkMode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set flag for client-side rendering
    setIsClient(true);

    // Initialize Leaflet only in the client
    if (typeof window !== 'undefined') {
      initializeLeaflet();
    }
  }, []);

  const mapStyle = darkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  if (!isClient) return null; // Prevent rendering on the server

  return (
    <DynamicMapContainer center={[20, 0]} zoom={2} scrollWheelZoom={true} className="h-96 rounded-lg">
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={mapStyle}
      />
      {regions.map((region) => (
        <Marker key={region.id} position={region.coordinates}>
          <Popup>
            <div>
              <h3 className="font-bold">{region.name}</h3>
              <p>Temperature: {region.temperature}°C</p>
              <p>CO2 Levels: {region.co2} ppm</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </DynamicMapContainer>
  );
};

export default ClimateMap;

