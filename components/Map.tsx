import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
    Thermometer,
    Wind,
    Droplet,
    CloudRain,
    Eye,
    Gauge,
} from 'lucide-react';

// Fix for default marker icon in production build
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPosition {
    lat: number;
    lng: number;
}


interface WeatherPoint {
    location: {
        name: string;
        region: string;
        lat: number;
        lon: number;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
        wind_kph: number;
        humidity: number;
        vis_km: number;
        pressure_mb: number;
    };
}

interface MapProps {
    center: [number, number];
    zoom: number;
    darkMode: boolean;
    weatherPoints: WeatherPoint[];
    onMapClick: (position: MapPosition) => void;
}


interface MapClickHandlerProps {
    onMapClick: (position: MapPosition) => void;
}

const MapClickEvents: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
    useMapEvents({
        click: (e) => {
            onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
};

const Map: React.FC<MapProps> = ({ center, zoom, darkMode, weatherPoints, onMapClick }) => {
    // Ensure center is valid
    const validCenter: [number, number] = Array.isArray(center) && center.length === 2
        ? center
        : [28.6139, 77.2090];

    return (
        <MapContainer
            center={validCenter}
            zoom={zoom}
            style={{ height: '500px', width: '100%' }}
            className="z-0"
        >
            <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={darkMode
                    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
            />
            <MapClickEvents onMapClick={onMapClick} />

            {weatherPoints.map((point, index) => (
                <Marker
                    key={`${point.location.name}-${index}`}
                    position={[point.location.lat, point.location.lon]}
                >
                    <Popup>
                        <div className={`p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                            <h3 className="font-bold mb-2">{point.location.name}, {point.location.region}</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center">
                                    <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                                    {point.current.temp_c}°C
                                </div>
                                <div className="flex items-center">
                                    <CloudRain className="h-4 w-4 mr-1 text-blue-500" />
                                    {point.current.condition.text}
                                </div>
                                <div className="flex items-center">
                                    <Wind className="h-4 w-4 mr-1 text-green-500" />
                                    {point.current.wind_kph} km/h
                                </div>
                                <div className="flex items-center">
                                    <Droplet className="h-4 w-4 mr-1 text-blue-500" />
                                    {point.current.humidity}%
                                </div>
                                 <div className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1 text-purple-500" />
                                    {point.current.vis_km} km
                                </div>
                                <div className="flex items-center">
                                    <Gauge className="h-4 w-4 mr-1 text-yellow-500" />
                                    {point.current.pressure_mb} mb
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
