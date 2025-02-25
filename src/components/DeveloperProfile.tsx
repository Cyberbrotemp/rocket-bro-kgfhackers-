import React from 'react';
import { Github, Instagram, Globe, Send } from 'lucide-react';

const socialLinks = {
  instagram: 'https://instagram.com/yourusername',
  telegram: 'https://t.me/yourusername',
  github: 'https://github.com/yourusername',
  website: 'https://yourwebsite.com'
};

export const DeveloperProfile: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-xl">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-20"></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-6">
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
            alt="Developer"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">John Doe</h1>
            <p className="text-blue-400 text-xl">Space Technology Developer</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            Passionate space technology developer with expertise in rocket systems and Mars exploration.
            Currently working on advanced propulsion systems and mission planning for Mars colonization.
          </p>
        </div>

        <div className="mt-8 flex space-x-4">
          <a
            href={socialLinks.github}
            className="transform hover:scale-110 transition-transform duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-8 h-8 text-white hover:text-blue-400" />
          </a>
          <a
            href={socialLinks.instagram}
            className="transform hover:scale-110 transition-transform duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-8 h-8 text-white hover:text-blue-400" />
          </a>
          <a
            href={socialLinks.telegram}
            className="transform hover:scale-110 transition-transform duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send className="w-8 h-8 text-white hover:text-blue-400" />
          </a>
          <a
            href={socialLinks.website}
            className="transform hover:scale-110 transition-transform duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="w-8 h-8 text-white hover:text-blue-400" />
          </a>
        </div>
      </div>
    </div>
  );
};