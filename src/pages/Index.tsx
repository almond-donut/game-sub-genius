
import React, { useState, useCallback } from 'react';
import { Moon, Sun, Upload, Download, Play, Pause, FileText, Globe, Zap, Star, Check, X, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [language, setLanguage] = useState('korean');
  const [context, setContext] = useState('gaming');

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
      toast.success('File uploaded successfully!');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success('File selected successfully!');
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);
    
    const steps = [
      { text: 'Uploading file...', duration: 1000 },
      { text: 'Extracting audio...', duration: 2000 },
      { text: 'Transcribing speech...', duration: 4000 },
      { text: 'Translating to English...', duration: 3000 },
      { text: 'Generating subtitles...', duration: 1500 },
      { text: 'Finishing up...', duration: 500 }
    ];

    let totalProgress = 0;
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].text);
      
      const stepProgress = (steps[i].duration / totalDuration) * 100;
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

    // Simulate result
    setResult({
      filename: file.name.replace(/\.[^/.]+$/, "") + ".srt",
      duration: "25:34",
      lines: 127,
      preview: [
        { time: "00:00:15", korean: "아 진짜 개빡쳐!", english: "Ah seriously, so freaking annoying!" },
        { time: "00:00:18", korean: "이거 왜 이렇게 어려워?", english: "Why is this so difficult?" },
        { time: "00:00:22", korean: "다시 해보자", english: "Let's try again" },
        { time: "00:00:25", korean: "이번엔 될 것 같은데", english: "I think it'll work this time" }
      ]
    });
    
    setProcessing(false);
    setProgress(100);
    toast.success('Subtitles generated successfully!');
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
    
    // Create mock SRT content
    const srtContent = result.preview.map((line: any, index: number) => 
      `${index + 1}\n${line.time} --> ${line.time.replace(/(\d{2}:\d{2}:\d{2})/, '$1,000')}\n${line.english}\n\n`
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
    
    toast.success('Subtitle file downloaded!');
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
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Korean • Japanese • Chinese → English</p>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Try First - No Signup Required!</span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 animate-fade-in`}>
            Turn VODs into Perfect
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Subtitles</span>
          </h2>
          
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto animate-fade-in`}>
            Upload Korean, Japanese, or Chinese gaming streams and get English subtitles in minutes. 
            Gaming context-aware translation included.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>30 minutes free processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Gaming slang aware</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-400" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>High accuracy AI</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {!result ? (
          <Card className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm p-8 shadow-xl animate-scale-in`}>
            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Source Language</label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${darkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="korean">🇰🇷 Korean</option>
                  <option value="japanese">🇯🇵 Japanese</option>
                  <option value="chinese">🇨🇳 Chinese</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Context</label>
                <select 
                  value={context} 
                  onChange={(e) => setContext(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${darkMode ? 'bg-gray-700/50 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  <option value="gaming">🎮 Gaming/Streaming</option>
                  <option value="casual">💬 Casual Chat</option>
                  <option value="formal">📝 Formal</option>
                  <option value="anime">🎌 Anime/Drama</option>
                </select>
              </div>
            </div>

            {/* Upload Area */}
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
                    Drop your VOD file here
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
                    {file.name}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {formatFileSize(file.size)}
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

            {/* Process Button */}
            {file && !processing && (
              <div className="mt-8 text-center">
                <Button
                  onClick={processFile}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-3" />
                  Generate Subtitles
                </Button>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-3`}>
                  Processing typically takes 1-2 minutes per 10 minutes of audio
                </p>
              </div>
            )}

            {/* Processing */}
            {processing && (
              <div className="mt-8">
                <div className="text-center mb-6">
                  <RefreshCw className="w-8 h-8 mx-auto mb-4 text-purple-400 animate-spin" />
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    Processing Your VOD...
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentStep}</p>
                </div>
                
                <div className="space-y-4">
                  <Progress value={progress} className="h-2" />
                  <div className="text-center">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {Math.round(progress)}% Complete
                    </span>
                  </div>
                </div>

                <Card className={`mt-6 p-4 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                    💡 <strong>Pro tip:</strong> While you wait, did you know Korean streamers use 2.3x more gaming slang than English streamers?
                  </p>
                </Card>
              </div>
            )}
          </Card>
        ) : (
          /* Results */
          <Card className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm p-8 shadow-xl animate-scale-in`}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Your Subtitles Are Ready! 🎉
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {result.lines} subtitle lines • {result.duration} duration
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
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
            </div>

            {/* Preview Toggle */}
            <div className="flex justify-center mb-6">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center space-x-2"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>
                  {showPreview ? 'Hide' : 'Show'} Preview
                </span>
              </Button>
            </div>

            {/* Preview */}
            {showPreview && (
              <Card className={`mb-8 p-6 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Subtitle Preview:</h4>
                <div className="space-y-3">
                  {result.preview.map((line: any, index: number) => (
                    <div key={index} className="space-y-1">
                      <div className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        [{line.time}]
                      </div>
                      <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {line.korean}
                      </div>
                      <div className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>
                        {line.english}
                      </div>
                      {index < result.preview.length - 1 && <hr className={`${darkMode ? 'border-gray-600' : 'border-gray-200'}`} />}
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
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 mr-3" />
                Download SRT File
              </Button>
              
              <Card className={`p-4 ${darkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-yellow-900">!</span>
                  </div>
                  <div>
                    <p className={`font-medium ${darkMode ? 'text-yellow-200' : 'text-yellow-800'} mb-2`}>
                      File will be deleted in 24 hours
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-700'} mb-4`}>
                      Want to save forever and get 5 more files per month?
                    </p>
                    <Button 
                      size="sm"
                      className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Create Free Account
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* New File Button */}
            <div className="mt-8 text-center">
              <button
                onClick={resetState}
                className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} transition-colors`}
              >
                Process another file
              </button>
            </div>
          </Card>
        )}

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Multi-Language Support</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Korean, Japanese, and Chinese to English translation with cultural context</p>
          </div>
          
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Gaming Context Aware</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Understands gaming slang, streamer language, and cultural references</p>
          </div>
          
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Perfect SRT Format</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Industry-standard subtitle files compatible with all video players</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} border-t mt-16 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Made with ❤️ for the Asian streaming community • Privacy-first • No tracking
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
