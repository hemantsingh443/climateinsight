
// components/ClimateMap.tsx
import { useState } from 'react';

interface ClimateMapProps {
  darkMode: boolean; // Specify the type for darkMode
}

export default function ClimateMap({ darkMode }: ClimateMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<null | { id: number; name: string; temperature: number; co2: number }>(null);

  const regions = [
    { id: 1, name: 'North America', temperature: 15.2, co2: 410 },
    { id: 2, name: 'Europe', temperature: 14.8, co2: 405 },
    { id: 3, name: 'Asia', temperature: 16.5, co2: 415 },
    { id: 4, name: 'Africa', temperature: 18.2, co2: 400 },
  ];

  return (
    <div className="relative h-96">
      <div className="absolute inset-0 bg-blue-100 rounded-lg overflow-hidden">
        {regions.map((region) => (
          <button
            key={region.id}
            className="absolute w-1/4 h-1/4 bg-blue-200 hover:bg-blue-300 transition-colors"
            style={{ left: `${(region.id - 1) * 25}%`, top: region.id % 2 === 0 ? '25%' : '50%' }}
            onClick={() => setSelectedRegion(region)}
          >
            {region.name}
          </button>
        ))}
      </div>
      {selectedRegion && (
        <div className={`absolute bottom-4 left-4 right-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
          <h3 className="text-lg font-semibold mb-2">{selectedRegion.name}</h3>
          <p>Temperature: {selectedRegion.temperature}°C</p>
          <p>CO2 Levels: {selectedRegion.co2} ppm</p>
        </div>
      )}
    </div>
  );
}

