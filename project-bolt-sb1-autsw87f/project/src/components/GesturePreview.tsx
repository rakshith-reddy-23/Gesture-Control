import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import type { GestureDetection } from '../types';

interface GesturePreviewProps {
  onGestureDetected?: (detection: GestureDetection) => void;
}

const GesturePreview: React.FC<GesturePreviewProps> = ({ onGestureDetected }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentGesture, setCurrentGesture] = useState<GestureDetection | null>(null);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  
  // Simulate gesture detection
  useEffect(() => {
    if (!isActive) return;
    
    const gestures = ['swipe_left', 'swipe_right', 'pinch', 'zoom', null];
    
    const interval = setInterval(() => {
      if (isActive) {
        const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
        const detection: GestureDetection = {
          gestureId: randomGesture,
          confidence: Math.random() * 0.5 + 0.5,
          timestamp: Date.now()
        };
        
        setCurrentGesture(detection);
        if (onGestureDetected) onGestureDetected(detection);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isActive, onGestureDetected]);

  const toggleActive = () => {
    if (!isActive) {
      setStatus('connecting');
      setTimeout(() => {
        setStatus('connected');
        setIsActive(true);
      }, 1500);
    } else {
      setIsActive(false);
      setStatus('idle');
      setCurrentGesture(null);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-blue-500/10">
      <div className="relative aspect-video bg-gray-900 overflow-hidden">
        {/* Simulated camera feed - in a real app this would be actual camera input */}
        <div className="absolute inset-0 flex items-center justify-center">
          {status === 'idle' && (
            <div className="text-center">
              <Camera className="h-12 w-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">Camera disabled</p>
            </div>
          )}
          
          {status === 'connecting' && (
            <div className="text-center">
              <RefreshCw className="h-10 w-10 text-blue-400 mx-auto mb-2 animate-spin" />
              <p className="text-blue-300">Connecting to camera...</p>
            </div>
          )}
          
          {status === 'connected' && (
            <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="relative w-24 h-24">
                  <div className="w-full h-full rounded-full border-2 border-blue-500/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-400/40 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {currentGesture && currentGesture.gestureId && (
                <div className="absolute bottom-4 left-4 right-4 bg-gray-900/70 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">
                        {currentGesture.gestureId.replace('_', ' ')}
                      </p>
                      <div className="mt-1 h-1.5 w-32 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${currentGesture.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gray-800/80 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <p className="text-red-400">Camera access denied</p>
            </div>
          )}
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-3 right-3 flex items-center space-x-2 bg-gray-900/70 backdrop-blur-sm rounded-full px-3 py-1">
          <div className={`h-2 w-2 rounded-full ${
            status === 'connected' ? 'bg-green-500 animate-pulse' : 
            status === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
            status === 'error' ? 'bg-red-500' : 'bg-gray-500'
          }`}></div>
          <span className="text-xs font-medium text-gray-300">
            {status === 'connected' ? 'Live' : 
             status === 'connecting' ? 'Connecting' : 
             status === 'error' ? 'Error' : 'Off'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Gesture Preview</h3>
          <button 
            onClick={toggleActive}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
            }`}
          >
            {isActive ? 'Stop' : 'Start'}
          </button>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-700/40 rounded-lg p-3">
            <p className="text-xs text-gray-400">Status</p>
            <p className="text-sm font-medium text-white mt-1">
              {status === 'connected' ? 'Active and tracking' : 
               status === 'connecting' ? 'Initializing camera' : 
               status === 'error' ? 'Camera error' : 'Camera off'}
            </p>
          </div>
          
          <div className="bg-gray-700/40 rounded-lg p-3">
            <p className="text-xs text-gray-400">Current Gesture</p>
            <p className="text-sm font-medium text-white mt-1">
              {currentGesture && currentGesture.gestureId 
                ? currentGesture.gestureId.replace('_', ' ') 
                : 'None detected'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GesturePreview;