import React, { useState } from 'react';
import { User, Launch } from '../types';
import { saveLaunch, getLaunches } from '../utils/storage';
import { RocketIcon, Download, Gauge, Thermometer, Navigation } from 'lucide-react';
import { RocketSimulation } from './RocketSimulation';

interface LaunchTrackerProps {
  user: User;
}

export const LaunchTracker: React.FC<LaunchTrackerProps> = ({ user }) => {
  const [launches, setLaunches] = useState<Launch[]>(getLaunches().filter(l => l.userId === user.id));
  const [isLaunching, setIsLaunching] = useState(false);
  const [telemetry, setTelemetry] = useState({
    altitude: 0,
    speed: 0,
    temperature: 0,
    distance: 0,
  });

  const handleNewLaunch = async (success: boolean) => {
    setIsLaunching(true);
    
    // Simulate launch sequence with three phases
    // 1. Launch phase
    for (let i = 0; i < 40; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setTelemetry({
        altitude: Math.min(400, i * 10),
        speed: Math.min(28000, i * 700),
        temperature: Math.min(3000, i * 75),
        distance: i * 1000,
      });
    }

    // 2. Cruise phase
    for (let i = 40; i < 80; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setTelemetry({
        altitude: 400,
        speed: 28000,
        temperature: 1500,
        distance: i * 50000,
      });
    }

    // 3. Landing phase
    for (let i = 80; i < 100; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setTelemetry({
        altitude: Math.max(0, 400 - (i - 80) * 20),
        speed: Math.max(0, 28000 - (i - 80) * 1400),
        temperature: Math.max(20, 1500 - (i - 80) * 74),
        distance: 54600000,
      });
    }

    const launch: Launch = {
      id: Date.now().toString(),
      userId: user.id,
      date: new Date().toISOString(),
      success,
      destination: 'Mars'
    };
    
    saveLaunch(launch);
    setLaunches([...launches, launch]);
    
    setTimeout(() => {
      setIsLaunching(false);
      setTelemetry({ altitude: 0, speed: 0, temperature: 0, distance: 0 });
    }, 6000);
  };

  const generatePDF = () => {
    alert('PDF generation would be implemented here');
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Mission Control</h2>
        <RocketSimulation isLaunching={isLaunching} />
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-400 mb-2">
              <Gauge className="w-5 h-5" />
              <span>Altitude</span>
            </div>
            <p className="text-2xl font-bold text-white">{telemetry.altitude.toFixed(1)} km</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-green-400 mb-2">
              <RocketIcon className="w-5 h-5" />
              <span>Speed</span>
            </div>
            <p className="text-2xl font-bold text-white">{telemetry.speed.toFixed(1)} km/h</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-red-400 mb-2">
              <Thermometer className="w-5 h-5" />
              <span>Temperature</span>
            </div>
            <p className="text-2xl font-bold text-white">{telemetry.temperature.toFixed(1)} °C</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-purple-400 mb-2">
              <Navigation className="w-5 h-5" />
              <span>Distance</span>
            </div>
            <p className="text-2xl font-bold text-white">{(telemetry.distance / 1000000).toFixed(1)}M km</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => handleNewLaunch(true)}
            disabled={isLaunching}
            className="flex items-center justify-center space-x-2 p-4 bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <RocketIcon className="w-6 h-6" />
            <span>Launch to Mars</span>
          </button>
          <button
            onClick={() => handleNewLaunch(false)}
            disabled={isLaunching}
            className="flex items-center justify-center space-x-2 p-4 bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            <RocketIcon className="w-6 h-6" />
            <span>Simulate Failure</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Launch History</h2>
          <button
            onClick={generatePDF}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export PDF</span>
          </button>
        </div>

        <div className="space-y-4">
          {launches.map((launch) => (
            <div
              key={launch.id}
              className={`p-4 rounded-lg ${
                launch.success ? 'bg-green-900/50' : 'bg-red-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RocketIcon className="w-5 h-5" />
                  <span className="font-medium">
                    {launch.success ? 'Successful Launch' : 'Failed Launch'}
                  </span>
                </div>
                <span className="text-sm opacity-75">
                  {new Date(launch.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};