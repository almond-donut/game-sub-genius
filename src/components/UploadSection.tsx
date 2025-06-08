
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileVideo, AlertCircle } from 'lucide-react';

interface UploadSectionProps {
  darkMode: boolean;
  file: File | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProcessing: () => void;
  isUploading: boolean;
  error: string;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  darkMode,
  file,
  fileInputRef,
  handleFileUpload,
  handleProcessing,
  isUploading,
  error
}) => {
  return (
    <Card className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm p-8 shadow-xl animate-scale-in`}>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FileVideo className="w-10 h-10 text-white" />
        </div>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Upload Your Gaming VOD ✨
        </h2>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          We'll create context-aware subtitles that capture the gaming vibes!
        </p>
      </div>

      <div className="space-y-6">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            darkMode
              ? 'border-gray-600 hover:border-purple-400 bg-gray-700/30'
              : 'border-gray-300 hover:border-purple-400 bg-gray-50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            {file ? file.name : 'Drop your video file here'}
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            MP4, MOV, AVI, MKV • Max 2GB • Korean audio
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {error && (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'} border flex items-center space-x-3`}>
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-700'}`}>
              {error}
            </p>
          </div>
        )}

        <Button
          onClick={handleProcessing}
          disabled={!file || isUploading}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
              Processing Magic...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 mr-3" />
              Create Context-Aware Subtitles! 🚀
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default UploadSection;
