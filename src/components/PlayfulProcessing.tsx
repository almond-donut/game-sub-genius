
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { RefreshCw, Sparkles, Brain, Globe, Zap } from 'lucide-react';

interface PlayfulProcessingProps {
  darkMode: boolean;
  progress: number;
  currentStep: string;
  language: string;
  context: string;
}

const PlayfulProcessing: React.FC<PlayfulProcessingProps> = ({
  darkMode,
  progress,
  currentStep,
  language,
  context
}) => {
  const playfulSteps = [
    { 
      text: '🚀 Uploading your awesome VOD...', 
      icon: <Zap className="w-5 h-5" />,
      description: 'Getting that content ready!'
    },
    { 
      text: '🎵 Extracting those sweet audio vibes...', 
      icon: <RefreshCw className="w-5 h-5" />,
      description: 'Separating audio from video magic'
    },
    { 
      text: '👂 Listening to every word (AI ears activated)...', 
      icon: <Brain className="w-5 h-5" />,
      description: 'Whisper AI is doing its thing!'
    },
    { 
      text: '🧠 Understanding the gaming context...', 
      icon: <Sparkles className="w-5 h-5" />,
      description: 'This is where the magic happens!'
    },
    { 
      text: '🌍 Translating with cultural awareness...', 
      icon: <Globe className="w-5 h-5" />,
      description: 'Not just words, but vibes too!'
    },
    { 
      text: '📝 Crafting perfect subtitles...', 
      icon: <RefreshCw className="w-5 h-5" />,
      description: 'Almost ready to blow your mind!'
    },
    { 
      text: '✨ Adding final touches of awesomeness...', 
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Perfection takes time!'
    }
  ];

  const getCurrentStepInfo = () => {
    return playfulSteps.find(step => 
      currentStep.toLowerCase().includes(step.text.toLowerCase().split(' ')[1]) ||
      currentStep.toLowerCase().includes('upload') && step.text.includes('Uploading') ||
      currentStep.toLowerCase().includes('extract') && step.text.includes('Extracting') ||
      currentStep.toLowerCase().includes('transcrib') && step.text.includes('Listening') ||
      currentStep.toLowerCase().includes('translat') && step.text.includes('Translating') ||
      currentStep.toLowerCase().includes('generat') && step.text.includes('Crafting') ||
      currentStep.toLowerCase().includes('finish') && step.text.includes('Adding')
    ) || playfulSteps[0];
  };

  const currentStepInfo = getCurrentStepInfo();

  const tips = [
    "💡 Korean streamers use 2.3x more gaming slang than English streamers!",
    "🎮 Did you know? Our AI understands over 500+ gaming terms in Korean!",
    "🔥 Fun fact: The word '개빡쳐' has 7 different gaming translations depending on context!",
    "✨ Our context-aware engine catches cultural nuances that Google Translate misses!",
    "🎯 Pro tip: Playful gaming context makes subtitles 40% more engaging!",
    "🚀 We're processing with the same AI that powers top gaming streamers!",
    "💫 Your subtitles will capture the true essence of gaming culture!"
  ];

  const randomTip = tips[Math.floor(progress / 15) % tips.length];

  const getContextDescription = () => {
    switch(context) {
      case 'playful-gaming':
        return '🎮 Making it fun with gaming slang & emojis!';
      case 'competitive':
        return '⚔️ Intense gaming language mode activated!';
      case 'casual':
        return '😊 Keeping it chill and friendly!';
      case 'formal':
        return '📝 Professional tone engaged!';
      default:
        return '🎯 Smart context detection in progress!';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 text-purple-400 animate-spin" />
          <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400 animate-pulse" />
        </div>
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Creating Magic ✨
        </h3>
        <div className="flex items-center justify-center space-x-2 mb-2">
          {currentStepInfo.icon}
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
            {currentStepInfo.text}
          </p>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {currentStepInfo.description}
        </p>
      </div>
      
      <div className="space-y-4">
        <Progress value={progress} className="h-3" />
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {Math.round(progress)}% Complete
          </span>
          <div className="flex items-center space-x-2 text-sm">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Context:</span>
            <span className={`${darkMode ? 'text-purple-300' : 'text-purple-600'} font-medium`}>
              {getContextDescription()}
            </span>
          </div>
        </div>
      </div>

      <Card className={`p-4 ${darkMode ? 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/50' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'}`}>
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className={`font-medium ${darkMode ? 'text-purple-200' : 'text-purple-800'} mb-1`}>
              While you wait...
            </p>
            <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              {randomTip}
            </p>
          </div>
        </div>
      </Card>

      {/* Context Preview */}
      <Card className={`p-4 ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-3 flex items-center`}>
          <Brain className="w-4 h-4 mr-2 text-purple-400" />
          How Context Makes It Better
        </h4>
        <div className="space-y-3">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-white'} border-l-4 border-red-400`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>❌ Generic Translation:</p>
            <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>"I am really angry!"</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-white'} border-l-4 border-green-400`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>✅ Our Context-Aware:</p>
            <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              {context === 'playful-gaming' ? '"Ah seriously, so freaking tilting! 😤"' :
               context === 'competitive' ? '"This is incredibly frustrating."' :
               context === 'casual' ? '"Ugh, that\'s so annoying!"' :
               '"This presents a significant challenge."'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlayfulProcessing;
