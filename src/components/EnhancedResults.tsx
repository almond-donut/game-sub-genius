
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Download, Eye, EyeOff, Star, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface EnhancedResultsProps {
  darkMode: boolean;
  result: any;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  downloadSubtitles: () => void;
  resetState: () => void;
  context: string;
}

const EnhancedResults: React.FC<EnhancedResultsProps> = ({
  darkMode,
  result,
  showPreview,
  setShowPreview,
  downloadSubtitles,
  resetState,
  context
}) => {
  const getContextBadge = () => {
    const badges = {
      'playful-gaming': { label: '🎮 Playful Gaming', color: 'from-purple-500 to-pink-500' },
      'competitive': { label: '⚔️ Competitive', color: 'from-red-500 to-orange-500' },
      'casual': { label: '😊 Casual Chat', color: 'from-blue-500 to-cyan-500' },
      'formal': { label: '📝 Formal', color: 'from-gray-500 to-slate-500' }
    };
    return badges[context as keyof typeof badges] || badges['playful-gaming'];
  };

  const contextBadge = getContextBadge();

  const enhancedPreview = [
    { 
      time: "00:00:15", 
      korean: "아 진짜 개빡쳐!", 
      translations: {
        'playful-gaming': "Ah seriously, so freaking tilting! 😤",
        'competitive': "This is incredibly frustrating.",
        'casual': "Ugh, that's so annoying!",
        'formal': "This presents a significant challenge."
      }
    },
    { 
      time: "00:00:18", 
      korean: "이거 왜 이렇게 어려워?", 
      translations: {
        'playful-gaming': "Why is this so damn hard?! 😩",
        'competitive': "Why is this so difficult to execute?",
        'casual': "Why is this so tricky?",
        'formal': "What makes this particularly challenging?"
      }
    },
    { 
      time: "00:00:22", 
      korean: "다시 해보자", 
      translations: {
        'playful-gaming': "Let's run it back! 🔄",
        'competitive': "Let's attempt this again.",
        'casual': "Let's try again!",
        'formal': "Let us make another attempt."
      }
    },
    { 
      time: "00:00:25", 
      korean: "이번엔 될 것 같은데", 
      translations: {
        'playful-gaming': "This time we got this! 💪",
        'competitive': "I believe this attempt will succeed.",
        'casual': "I think it'll work this time!",
        'formal': "This iteration appears more promising."
      }
    }
  ];

  return (
    <Card className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm p-8 shadow-xl animate-scale-in`}>
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <Sparkles className="w-6 h-6 absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
        </div>
        
        <Badge className={`bg-gradient-to-r ${contextBadge.color} text-white mb-3`}>
          {contextBadge.label}
        </Badge>
        
        <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Your Subtitles Are Ready! 🎉
        </h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
          {result.lines} subtitle lines • {result.duration} duration • Context-aware magic ✨
        </p>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{result.lines}</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subtitle Lines</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{result.duration}</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Duration</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>98%</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Accuracy</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold text-transparent bg-gradient-to-r ${contextBadge.color} bg-clip-text`}>A+</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Context Score</div>
        </div>
      </div>

      {/* Context Comparison */}
      <Card className={`mb-6 p-4 ${darkMode ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/50' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'}`}>
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-5 h-5 text-purple-400" />
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Context-Aware Is Better
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} border-l-4 border-red-400`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>❌ Generic AI:</p>
            <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} text-sm`}>"I am really angry!"</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} border-l-4 border-green-400`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>✅ Our Context Magic:</p>
            <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} text-sm`}>
              {enhancedPreview[0].translations[context as keyof typeof enhancedPreview[0].translations]}
            </p>
          </div>
        </div>
      </Card>

      {/* Preview Toggle */}
      <div className="flex justify-center mb-6">
        <Button
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center space-x-2"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>
            {showPreview ? 'Hide' : 'Show'} Context-Aware Preview
          </span>
        </Button>
      </div>

      {/* Enhanced Preview */}
      {showPreview && (
        <Card className={`mb-8 p-6 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
            <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
            Context-Aware Subtitle Preview:
          </h4>
          <div className="space-y-4">
            {enhancedPreview.map((line, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white'} border border-purple-200/50`}>
                <div className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                  [{line.time}]
                </div>
                <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">Korean</span>
                  {line.korean}
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>
                  <span className={`text-xs bg-gradient-to-r ${contextBadge.color} text-white px-2 py-1 rounded mr-2`}>
                    {contextBadge.label}
                  </span>
                  {line.translations[context as keyof typeof line.translations]}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Download Section */}
      <div className="space-y-4">
        <Button 
          onClick={downloadSubtitles}
          size="lg" 
          className={`w-full bg-gradient-to-r ${contextBadge.color} hover:opacity-90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
        >
          <Download className="w-5 h-5 mr-3" />
          Download Context-Aware SRT File
        </Button>
        
        <Card className={`p-4 ${darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-yellow-900">!</span>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? 'text-yellow-200' : 'text-yellow-800'} mb-2`}>
                Love the context-aware magic? 🪄
              </p>
              <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-700'} mb-4`}>
                Create an account to save forever, get unlimited processing, and unlock pro features!
              </p>
              <Button 
                size="sm"
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold"
              >
                <Star className="w-4 h-4 mr-2" />
                Unlock Pro Features
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* New File Button */}
      <div className="mt-8 text-center">
        <button
          onClick={resetState}
          className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors flex items-center space-x-2 mx-auto`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Create more awesome subtitles</span>
        </button>
      </div>
    </Card>
  );
};

export default EnhancedResults;
