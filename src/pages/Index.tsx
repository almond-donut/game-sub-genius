
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import LanguageSelector from '@/components/LanguageSelector';
import ContextSettings from '@/components/ContextSettings';
import UploadSection from '@/components/UploadSection';
import PlayfulProcessing from '@/components/PlayfulProcessing';
import EnhancedResults from '@/components/EnhancedResults';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('ko');
  const [context, setContext] = useState('playful-gaming');
  const [gameType, setGameType] = useState('');
  const [streamerMood, setStreamerMood] = useState('excited');
  const [audienceType, setAudienceType] = useState('gaming');
  const [customContext, setCustomContext] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [result] = useState({
    lines: 143,
    duration: '12:45',
    accuracy: 98
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024 * 1024) {
        setError('File size must be less than 2GB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const resetState = () => {
    setStep('upload');
    setFile(null);
    setProgress(0);
    setError('');
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadSubtitles = () => {
    const srtContent = `1
00:00:15,000 --> 00:00:17,000
Ah seriously, so freaking tilting! 😤

2
00:00:18,000 --> 00:00:21,000
Why is this so damn hard?! 😩`;

    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name || 'subtitle'}_context_aware.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started! 🎉",
      description: "Your context-aware subtitles are downloading now.",
    });
  };

  const handleProcessing = () => {
    if (!file) return;
    
    setIsUploading(true);
    setStep('processing');
    setProgress(0);
    setError('');
    
    const steps = [
      'Uploading your awesome VOD...',
      'Extracting those sweet audio vibes...',
      'Listening to every word (AI ears activated)...',
      'Understanding the gaming context...',
      'Translating with cultural awareness...',
      'Crafting perfect subtitles...',
      'Adding final touches of awesomeness...'
    ];
    
    let currentStepIndex = 0;
    setCurrentStep(steps[0]);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / steps.length);
        if (newProgress >= 100) {
          clearInterval(interval);
          setStep('results');
          setIsUploading(false);
          toast({
            title: "Subtitles Ready! 🎉",
            description: "Your context-aware subtitles have been generated successfully!",
          });
          return 100;
        }
        
        const stepIndex = Math.floor(newProgress / (100 / steps.length));
        if (stepIndex !== currentStepIndex && stepIndex < steps.length) {
          currentStepIndex = stepIndex;
          setCurrentStep(steps[stepIndex]);
        }
        
        return newProgress;
      });
    }, 800);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-800' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="px-6 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {step === 'upload' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <UploadSection
                    darkMode={darkMode}
                    file={file}
                    fileInputRef={fileInputRef}
                    handleFileUpload={handleFileUpload}
                    handleProcessing={handleProcessing}
                    isUploading={isUploading}
                    error={error}
                  />
                </div>
                
                <div className="space-y-6">
                  <LanguageSelector
                    darkMode={darkMode}
                    language={language}
                    setLanguage={setLanguage}
                  />
                </div>
              </div>
              
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
            </>
          )}
          
          {step === 'processing' && (
            <div className="max-w-2xl mx-auto">
              <PlayfulProcessing
                darkMode={darkMode}
                progress={progress}
                currentStep={currentStep}
                language={language}
                context={context}
              />
            </div>
          )}
          
          {step === 'results' && (
            <div className="max-w-3xl mx-auto">
              <EnhancedResults
                darkMode={darkMode}
                result={result}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                downloadSubtitles={downloadSubtitles}
                resetState={resetState}
                context={context}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
