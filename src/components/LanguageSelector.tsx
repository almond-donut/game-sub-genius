
import React from 'react';
import { Card } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  darkMode: boolean;
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  darkMode,
  language,
  setLanguage
}) => {
  const languages = [
    { code: 'ko', name: 'Korean', flag: '🇰🇷', popular: true },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', popular: true },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', popular: false },
    { code: 'th', name: 'Thai', flag: '🇹🇭', popular: false }
  ];

  return (
    <Card className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm p-6 shadow-xl animate-scale-in`}>
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="w-5 h-5 text-purple-400" />
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Source Language
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              language === lang.code
                ? darkMode
                  ? 'bg-purple-900/30 border-purple-400 border'
                  : 'bg-purple-50 border-purple-400 border'
                : darkMode
                  ? 'bg-gray-700/50 hover:bg-gray-600/50'
                  : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{lang.flag}</span>
              <div>
                <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {lang.name}
                </div>
                {lang.popular && (
                  <div className="text-xs text-purple-400">Popular</div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default LanguageSelector;
