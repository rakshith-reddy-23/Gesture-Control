import React, { useState } from 'react';
import { Zap, Settings, X, Edit3, Check } from 'lucide-react';
import type { Function, Gesture } from '../types';

interface FunctionMappingProps {
  gestures: Gesture[];
}

const defaultFunctions: Function[] = [
  {
    id: 'volume_up',
    name: 'Volume Up',
    description: 'Increase system volume',
    icon: '🔊',
    assignedGesture: 'swipe_up'
  },
  {
    id: 'volume_down',
    name: 'Volume Down',
    description: 'Decrease system volume',
    icon: '🔉',
    assignedGesture: 'swipe_down'
  },
  {
    id: 'next_track',
    name: 'Next Track',
    description: 'Play next music track',
    icon: '⏭️',
    assignedGesture: 'swipe_right'
  },
  {
    id: 'prev_track',
    name: 'Previous Track',
    description: 'Play previous music track',
    icon: '⏮️',
    assignedGesture: 'swipe_left'
  },
  {
    id: 'play_pause',
    name: 'Play/Pause',
    description: 'Toggle media playback',
    icon: '⏯️',
    assignedGesture: 'fist'
  },
  {
    id: 'zoom_in',
    name: 'Zoom In',
    description: 'Increase zoom level',
    icon: '🔍',
    assignedGesture: 'zoom'
  },
  {
    id: 'zoom_out',
    name: 'Zoom Out',
    description: 'Decrease zoom level',
    icon: '🔎',
    assignedGesture: 'pinch'
  }
];

const FunctionMapping: React.FC<FunctionMappingProps> = ({ gestures }) => {
  const [functions, setFunctions] = useState<Function[]>(defaultFunctions);
  const [editingFunction, setEditingFunction] = useState<string | null>(null);
  const [selectedGesture, setSelectedGesture] = useState<string | undefined>(undefined);
  
  const handleSaveMapping = (functionId: string) => {
    setFunctions(prev => 
      prev.map(func => 
        func.id === functionId 
          ? { ...func, assignedGesture: selectedGesture } 
          : func
      )
    );
    setEditingFunction(null);
  };
  
  const handleCancelEdit = () => {
    setEditingFunction(null);
    setSelectedGesture(undefined);
  };
  
  const handleEdit = (func: Function) => {
    setEditingFunction(func.id);
    setSelectedGesture(func.assignedGesture);
  };
  
  const getGestureName = (gestureId?: string) => {
    if (!gestureId) return 'None';
    const gesture = gestures.find(g => g.id === gestureId);
    return gesture ? gesture.name : 'Unknown';
  };

  return (
    <div className="rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-lg transition-all duration-300 hover:shadow-blue-500/10">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-medium text-white">Function Mapping</h3>
          </div>
          
          <button className="p-1.5 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        <div className="p-2">
          {functions.map((func) => (
            <div
              key={func.id}
              className={`mb-2 p-3 rounded-lg flex items-center justify-between ${
                editingFunction === func.id
                  ? 'bg-blue-900/20 border border-blue-800/50'
                  : 'bg-gray-700/30 border border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-gray-700/50 flex items-center justify-center text-xl">
                  {func.icon}
                </div>
                
                <div>
                  <h4 className="font-medium text-white">{func.name}</h4>
                  <p className="text-xs text-gray-500">{func.description}</p>
                </div>
              </div>
              
              {editingFunction === func.id ? (
                <div className="flex items-center">
                  <select
                    value={selectedGesture}
                    onChange={(e) => setSelectedGesture(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg py-1 px-2 text-sm text-gray-300 mr-2"
                  >
                    <option value="">None</option>
                    {gestures.map((gesture) => (
                      <option key={gesture.id} value={gesture.id}>
                        {gesture.name}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={handleCancelEdit}
                      className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                    
                    <button 
                      onClick={() => handleSaveMapping(func.id)}
                      className="p-1.5 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors"
                    >
                      <Check className="h-4 w-4 text-green-400" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="px-2.5 py-1 bg-gray-800 rounded-md text-xs font-medium text-gray-300">
                    {getGestureName(func.assignedGesture)}
                  </div>
                  
                  <button 
                    onClick={() => handleEdit(func)}
                    className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-700 bg-gray-800/30">
        <p className="text-xs text-gray-500 text-center">
          {functions.filter(f => f.assignedGesture).length} of {functions.length} functions mapped to gestures
        </p>
      </div>
    </div>
  );
};

export default FunctionMapping;