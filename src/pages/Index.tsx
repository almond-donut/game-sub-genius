
import React, { useState, useCallback } from 'react';
import { Moon, Sun, Upload, Download, FileText, Globe, Zap, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import ContextSettings from '@/components/ContextSettings';
import PlayfulProcessing from '@/components/PlayfulProcessing';
import EnhancedResults from '@/components/EnhancedResults';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Enhanced context settings
  const [language, setLanguage] = useState('korean');
  const [context, setContext] = useState('playful-gaming');
  const [gameType, setGameType] = useState('');
  const [streamerMood, setStreamerMood] = useState('excited');
  const [audienceType, setAudienceType] = useState('gaming');
  const [customContext, setCustomContext] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      toast.success('File uploaded! Ready to create magic ✨');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success('File selected! Looking good 🔥');
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);
    
    const playfulSteps = [
      { text: '🚀 Uploading your awesome VOD...', duration: 1000 },
      { text: '🎵 Extracting those sweet audio vibes...', duration: 2000 },
      { text: '👂 Listening to every word (AI ears activated)...', duration: 4000 },
      { text: '🧠 Understanding the gaming context...', duration: 3000 },
      { text: '🌍 Translating with cultural awareness...', duration: 3000 },
      { text: '📝 Crafting perfect subtitles...', duration: 1500 },
      { text: '✨ Adding final touches of awesomeness...', duration: 500 }
    ];

    let totalProgress = 0;
    const totalDuration = playfulSteps.reduce((sum, step) => sum + step.duration, 0);

    for (let i = 0; i < playfulSteps.length; i++) {
      setCurrentStep(playfulSteps[i].text);
      
      const stepProgress = (playfulSteps[i].duration / totalDuration) * 100;
      const startProgress = totalProgress;
      
      await new Promise<void>(resolve => {
        const interval = setInterval(() => {
          totalProgress += 2;
          if (totalProgress >= startProgress + stepProgress) {
            totalProgress = startProgress + stepProgress;
            setProgress(totalProgress);
            clearInterval(interval);
            resolve();
          } else {
            setProgress(totalProgress);
          }
        }, 50);
      });
    }

    // Simulate enhanced result with context
    setResult({
      filename: file.name.replace(/\.[^/.]+$/, "") + ".srt",
      duration: "25:34",
      lines: 127,
      context: context,
      preview: [
        { time: "00:00:15", korean: "아 진짜 개빡쳐!", english: "Ah seriously, so freaking tilting! 😤" },
        { time: "00:00:18", korean: "이거 왜 이렇게 어려워?", english: "Why is this so damn hard?! 😩" },
        { time: "00:00:22", korean: "다시 해보자", english: "Let's run it back! 🔄" },
        { time: "00:00:25", korean: "이번엔 될 것 같은데", english: "This time we got this! 💪" }
      ]
    });
    
    setProcessing(false);
    setProgress(100);
    toast.success('Context-aware subtitles ready! 🎉');
  };

  const resetState = () => {
    setFile(null);
    setProcessing(false);
    setProgress(0);
    setResult(null);
    setCurrentStep('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadSubtitles = () => {
    if (!result) return;
    
    // Create mock SRT content with context-aware translations
    const srtContent = result.preview.map((line: any, index: number) => 
      `${index + 1}\n${line.time},000 --> ${line.time.replace(/(\d{2}:\d{2}:\d{2})/, '$1')},000\n${line.english}\n\n`
    ).join('');
    
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Context-aware subtitle file downloaded! 🚀');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} border-b backdrop-blur-xl bg-opacity-80 sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>VOD Subtitle Generator</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Context-Aware • Gaming-Smart • Actually Fun</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sun className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${darkMode ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <Moon className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Context-Aware AI • No Boring Translations!</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 animate-fade-in`}>
            Turn VODs into 
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Perfect Subtitles</span>
          </h2>
          
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto animate-fade-in`}>
            Upload Korean, Japanese, or Chinese gaming streams and get context-aware English subtitles that actually understand gaming culture and slang!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Context-aware translations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Gaming slang mastery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actually fun to use</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {!result ? (
          <Card className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm p-8 shadow-xl animate-scale-in`}>
            {!processing && (
              <>
                {/* Enhanced Context Settings */}
                <ContextSettings
                  darkMode={darkMode}
                  language={language}
                  context={context}
                  setContext={setContext}
                  gameType={gameType}
                  setGameType={setGameType}
                  streamerMood={streamerMood}
                  setStreamerMood={setStreamerMood}
                  audienceType={audienceType}
                  setAudienceType={setAudienceType}
                  customContext={customContext}
                  setCustomContext={setCustomContext}
                />

                <div className="mt-8 mb-8">
                  <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                </div>

                {/* Enhanced Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 hover:scale-[1.02] ${
                    dragActive 
                      ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20 scale-105' 
                      : file 
                        ? 'border-green-400 bg-green-50 dark:bg-green-900/20'
                        : darkMode 
                          ? 'border-gray-600 hover:border-gray-500' 
                          : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept=".mp3,.mp4,.wav,.m4a"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={processing}
                  />
                  
                  {!file ? (
                    <>
                      <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${dragActive ? 'text-purple-400' : darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                        Drop your awesome VOD here! 🎮
                      </h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        or click to browse files
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>MP3</span>
                        <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>MP4</span>
                        <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>WAV</span>
                        <span className={`px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>M4A</span>
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                        Max file size: 100MB • Max duration: 30 minutes for free tier
                      </p>
                    </>
                  ) : (
                    <>
                      <FileText className="w-16 h-16 mx-auto mb-4 text-green-400" />
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                        {file.name} ✨
                      </h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        {formatFileSize(file.size)} • Ready for context magic!
                      </p>
                      <button
                        onClick={resetState}
                        className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`}
                      >
                        Choose different file
                      </button>
                    </>
                  )}
                </div>

                {/* Enhanced Process Button */}
                {file && (
                  <div className="mt-8 text-center">
                    <Button
                      onClick={processFile}
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Zap className="w-5 h-5 mr-3" />
                      Create Context-Aware Subtitles ✨
                    </Button>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-3`}>
                      Processing with gaming context awareness • Typically 1-2 minutes per 10 minutes
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Enhanced Processing */}
            {processing && (
              <PlayfulProcessing
                darkMode={darkMode}
                progress={progress}
                currentStep={currentStep}
                language={language}
                context={context}
              />
            )}
          </Card>
        ) : (
          /* Enhanced Results */
          <EnhancedResults
            darkMode={darkMode}
            result={result}
            showPreview={showPreview}
            setShowPreview={setShowPreview}
            downloadSubtitles={downloadSubtitles}
            resetState={resetState}
            context={context}
          />
        )}

        {/* Enhanced Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Context-Aware AI</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Understands gaming context, not just words. "개빡쳐" becomes "so freaking tilting!" not "angry"</p>
          </div>
          
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Gaming Culture Master</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>From casual memes to competitive callouts - we get the culture and translate the vibe</p>
          </div>
          
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Actually Fun to Use</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>No more boring corporate tools. Playful UI, smart suggestions, and subtitles that capture the energy</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} border-t mt-16 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Made with ❤️ for the Asian streaming community • Context-aware • Actually understands gaming culture 🎮
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
