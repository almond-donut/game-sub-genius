
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Gamepad2, Sparkles } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="relative z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shadow-lg">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              GameSubs
            </h1>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
              <Sparkles className="w-3 h-3 mr-1" />
              Context-aware subtitles
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className={`${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
