
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Heart, Zap, Users, Sparkles, Star } from 'lucide-react';

interface ContextSettingsProps {
  darkMode: boolean;
  language: string;
  context: string;
  setContext: (context: string) => void;
  gameType: string;
  setGameType: (gameType: string) => void;
  streamerMood: string;
  setStreamerMood: (mood: string) => void;
  audienceType: string;
  setAudienceType: (type: string) => void;
  customContext: string;
  setCustomContext: (context: string) => void;
}

const ContextSettings: React.FC<ContextSettingsProps> = ({
  darkMode,
  language,
  context,
  setContext,
  gameType,
  setGameType,
  streamerMood,
  setStreamerMood,
  audienceType,
  setAudienceType,
  customContext,
  setCustomContext
}) => {
  const contextOptions = [
    { 
      value: 'playful-gaming', 
      label: '🎮 Playful Gaming', 
      description: 'Fun, casual, with gaming slang & emojis',
      icon: <Gamepad2 className="w-4 h-4" />,
      recommended: true,
      preview: '"아 진짜 개빡쳐!" → "Ah seriously, so freaking tilting! 😤"'
    },
    { 
      value: 'competitive', 
      label: '⚔️ Competitive', 
      description: 'Intense, focused gaming language',
      icon: <Zap className="w-4 h-4" />,
      preview: '"아 진짜 개빡쳐!" → "This is incredibly frustrating."'
    },
    { 
      value: 'casual', 
      label: '😊 Casual Chat', 
      description: 'Relaxed, friendly conversation',
      icon: <Heart className="w-4 h-4" />,
      preview: '"아 진짜 개빡쳐!" → "Ugh, that\'s so annoying!"'
    },
    { 
      value: 'formal', 
      label: '📝 Formal', 
      description: 'Professional, proper language',
      icon: <Users className="w-4 h-4" />,
      preview: '"아 진짜 개빡쳐!" → "This presents a significant challenge."'
    }
  ];

  const gameTypes = [
    { value: '', label: '🎯 Auto-detect', description: 'Let AI figure it out' },
    { value: 'fps', label: '🔫 FPS Games', description: 'Counter-Strike, Valorant, Overwatch' },
    { value: 'moba', label: '⚔️ MOBA', description: 'League of Legends, Dota 2' },
    { value: 'rpg', label: '🗡️ RPG', description: 'MMORPGs, Story games' },
    { value: 'battle-royale', label: '🏆 Battle Royale', description: 'PUBG, Fortnite, Apex' },
    { value: 'strategy', label: '🧠 Strategy', description: 'StarCraft, Age of Empires' },
    { value: 'indie', label: '🎨 Indie Games', description: 'Unique, creative games' }
  ];

  const moods = [
    { value: 'excited', label: '🔥 Hyped', emoji: '🔥' },
    { value: 'chill', label: '😌 Chill', emoji: '😌' },
    { value: 'frustrated', label: '😤 Tilted', emoji: '😤' },
    { value: 'focused', label: '🎯 Focused', emoji: '🎯' },
    { value: 'funny', label: '😂 Memeing', emoji: '😂' }
  ];

  const audiences = [
    { value: 'general', label: '🌍 Everyone', description: 'Family-friendly, accessible' },
    { value: 'gaming', label: '🎮 Gamers', description: 'Gaming community slang OK' },
    { value: 'international', label: '🌏 Global', description: 'Cross-cultural friendly' },
    { value: 'mature', label: '🔞 Mature', description: 'Adult language OK' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Context Selection */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Translation Style
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contextOptions.map((option) => (
            <Card
              key={option.value}
              className={`relative p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                context === option.value
                  ? darkMode
                    ? 'bg-purple-900/30 border-purple-400'
                    : 'bg-purple-50 border-purple-400'
                  : darkMode
                    ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setContext(option.value)}
            >
              {option.recommended && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Recommended!
                </Badge>
              )}
              <div className="flex items-center space-x-3 mb-2">
                {option.icon}
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {option.label}
                </span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                {option.description}
              </p>
              <div className={`text-xs p-2 rounded ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Preview: </span>
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{option.preview}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="space-y-4">
        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          🎯 Advanced Context (Optional)
        </h4>
        
        {/* Game Type */}
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Game Type
          </label>
          <select 
            value={gameType} 
            onChange={(e) => setGameType(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
          >
            {gameTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label} - {type.description}
              </option>
            ))}
          </select>
        </div>

        {/* Streamer Mood & Audience Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Streamer Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setStreamerMood(mood.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    streamerMood === mood.value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mood.emoji} {mood.label.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              Target Audience
            </label>
            <select 
              value={audienceType} 
              onChange={(e) => setAudienceType(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700/50 border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            >
              {audiences.map((audience) => (
                <option key={audience.value} value={audience.value}>
                  {audience.label} - {audience.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Context */}
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Custom Context (Pro Tip!)
          </label>
          <textarea
            value={customContext}
            onChange={(e) => setCustomContext(e.target.value)}
            placeholder="e.g., 'The streamer is doing a funny challenge with friends, very casual and memey'"
            className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 placeholder-gray-500'
            } focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
            rows={3}
          />
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            💡 The more context you give, the better the AI understands the vibe!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContextSettings;
