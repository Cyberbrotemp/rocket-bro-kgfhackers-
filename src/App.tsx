import React, { useState } from 'react';
import { User } from './types';
import { AuthForm } from './components/AuthForm';
import { DeveloperProfile } from './components/DeveloperProfile';
import { LaunchTracker } from './components/LaunchTracker';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'launches'>('profile');

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-black/50 backdrop-blur-sm py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {user ? (
            <>
              <nav className="flex space-x-4 bg-gray-900/50 p-2 rounded-lg backdrop-blur-sm">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Developer Profile
                </button>
                <button
                  onClick={() => setActiveTab('launches')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'launches'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Mission Control
                </button>
              </nav>
              
              {activeTab === 'profile' ? (
                <DeveloperProfile />
              ) : (
                <LaunchTracker user={user} />
              )}
            </>
          ) : (
            <div className="flex items-center justify-center">
              <AuthForm onAuth={setUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;