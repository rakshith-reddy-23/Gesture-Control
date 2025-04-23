import React, { useState } from 'react';
import { Activity, ChevronRight, LayoutDashboard, Settings } from 'lucide-react';
import Navbar from './Navbar';
import GesturePreview from './GesturePreview';
import GesturesMenu from './GesturesMenu';
import FunctionMapping from './FunctionMapping';
import StatisticsPanel from './StatisticsPanel';
import BackgroundAnimation from './BackgroundAnimation';
import type { Gesture, GestureDetection } from '../types';

const defaultGestures: Gesture[] = [
  {
    id: 'swipe_left',
    name: 'Swipe Left',
    description: 'Move hand from right to left',
    icon: '👈',
    isActive: true
  },
  {
    id: 'swipe_right',
    name: 'Swipe Right',
    description: 'Move hand from left to right',
    icon: '👉',
    isActive: true
  },
  {
    id: 'swipe_up',
    name: 'Swipe Up',
    description: 'Move hand from bottom to top',
    icon: '👆',
    isActive: false
  },
  {
    id: 'swipe_down',
    name: 'Swipe Down',
    description: 'Move hand from top to bottom',
    icon: '👇',
    isActive: false
  },
  {
    id: 'pinch',
    name: 'Pinch',
    description: 'Bring thumb and index finger together',
    icon: '🤏',
    isActive: true
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Spread thumb and index finger apart',
    icon: '👌',
    isActive: true
  },
  {
    id: 'fist',
    name: 'Fist',
    description: 'Close hand into a fist',
    icon: '✊',
    isActive: false
  },
  {
    id: 'wave',
    name: 'Wave',
    description: 'Wave hand side to side',
    icon: '👋',
    isActive: false
  }
];

const Dashboard: React.FC = () => {
  const [gestures] = useState<Gesture[]>(defaultGestures);
  const [gestureHistory, setGestureHistory] = useState<GestureDetection[]>([]);
  
  const handleGestureDetected = (detection: GestureDetection) => {
    if (detection.gestureId) {
      setGestureHistory(prev => [detection, ...prev].slice(0, 10));
    }
  };

  return (
    <div className="min-h-screen text-white">
      <BackgroundAnimation />
      <Navbar />
      
      <div className="pt-20 px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Gesture Control Dashboard
              </h1>
              <p className="text-cyan-200/70 mt-1">Manage your gesture controls and functions</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-200/70 transition-colors flex items-center space-x-2 text-sm backdrop-blur-sm border border-white/10">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 transition-colors flex items-center space-x-2 text-sm backdrop-blur-sm border border-cyan-500/30">
                <Activity className="h-4 w-4" />
                <span>Calibrate</span>
              </button>
            </div>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <LayoutDashboard className="h-5 w-5 text-cyan-400" />
                    <h2 className="text-xl font-semibold text-white">Live Preview</h2>
                  </div>
                  
                  <button className="flex items-center text-sm text-cyan-200/70 hover:text-cyan-200 transition-colors">
                    <span>Advanced Mode</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                <GesturePreview onGestureDetected={handleGestureDetected} />
              </div>
              
              <StatisticsPanel gestureHistory={gestureHistory} />
            </div>
            
            <div className="space-y-6">
              <GesturesMenu />
              <FunctionMapping gestures={gestures} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;