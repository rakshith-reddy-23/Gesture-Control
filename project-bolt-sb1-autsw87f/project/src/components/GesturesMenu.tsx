import React, { useState } from 'react';
import { Sparkles, Plus, Info, EyeOff, Eye } from 'lucide-react';
import type { Gesture } from '../types';

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

const GesturesMenu: React.FC = () => {
  const [gestures, setGestures] = useState<Gesture[]>(defaultGestures);
  const [showInactive, setShowInactive] = useState(false);
  
  const toggleGestureStatus = (id: string) => {
    setGestures(prev => 
      prev.map(gesture => 
        gesture.id === id 
          ? { ...gesture, isActive: !gesture.isActive } 
          : gesture
      )
    );
  };

  const filteredGestures = showInactive 
    ? gestures 
    : gestures.filter(gesture => gesture.isActive);
  
  return (
    <div className="rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-blue-500/10">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Gestures</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowInactive(!showInactive)}
              className="p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
              title={showInactive ? "Hide inactive gestures" : "Show inactive gestures"}
            >
              {showInactive ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            <button className="p-1.5 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors">
              <Plus className="h-4 w-4 text-blue-400" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <div className="p-2">
          {filteredGestures.map((gesture) => (
            <div
              key={gesture.id}
              className={`mb-2 p-3 rounded-lg flex items-center justify-between ${
                gesture.isActive 
                  ? 'bg-gradient-to-r from-gray-700/50 to-gray-800/50 border border-gray-700' 
                  : 'bg-gray-800/30 border border-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-xl ${
                  gesture.isActive 
                    ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white' 
                    : 'bg-gray-800 text-gray-500'
                }`}>
                  {gesture.icon}
                </div>
                
                <div>
                  <h4 className={`font-medium ${gesture.isActive ? 'text-white' : 'text-gray-400'}`}>
                    {gesture.name}
                  </h4>
                  <p className="text-xs text-gray-500">{gesture.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-1.5 rounded-full hover:bg-gray-700/50 transition-colors">
                  <Info className="h-4 w-4 text-gray-500" />
                </button>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={gesture.isActive}
                    onChange={() => toggleGestureStatus(gesture.id)}
                  />
                  <div className="w-9 h-5 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 peer-checked:after:bg-white"></div>
                </label>
              </div>
            </div>
          ))}
          
          {filteredGestures.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500">No gestures available</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-700 bg-gray-800/30">
        <p className="text-xs text-gray-500 text-center">
          {gestures.filter(g => g.isActive).length} active of {gestures.length} available gestures
        </p>
      </div>
    </div>
  );
};

export default GesturesMenu;