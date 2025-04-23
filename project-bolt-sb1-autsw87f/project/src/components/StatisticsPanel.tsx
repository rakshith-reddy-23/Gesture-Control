import React from 'react';
import { BarChart3, PieChart, Clock, Activity } from 'lucide-react';
import type { GestureDetection } from '../types';

interface StatisticsPanelProps {
  gestureHistory: GestureDetection[];
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ gestureHistory }) => {
  const getGestureCount = (gestureId: string | null) => {
    return gestureHistory.filter(g => g.gestureId === gestureId).length;
  };
  
  const getUniqueGestures = () => {
    const uniqueGestureIds = Array.from(
      new Set(gestureHistory.map(g => g.gestureId).filter(Boolean))
    );
    
    return uniqueGestureIds.map(gestureId => ({
      id: gestureId,
      count: getGestureCount(gestureId),
      name: gestureId?.replace('_', ' ') || ''
    }));
  };
  
  const uniqueGestures = getUniqueGestures();
  const recentGestures = gestureHistory.slice(0, 5);
  
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  return (
    <div className="rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-lg border border-gray-700 shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-medium text-white">Statistics & Activity</h3>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-4 w-4 text-blue-400" />
              <h4 className="font-medium text-gray-300">Recent Activity</h4>
            </div>
            
            {recentGestures.length > 0 ? (
              <div className="space-y-2">
                {recentGestures.map((gesture, index) => (
                  <div 
                    key={index} 
                    className="p-2 rounded-lg bg-gray-700/30 border border-gray-700 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <Activity className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {gesture.gestureId 
                            ? gesture.gestureId.replace('_', ' ') 
                            : 'No gesture'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Confidence: {Math.round(gesture.confidence * 100)}%
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(gesture.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-800/30 rounded-lg border border-gray-700">
                <p className="text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
          
          {/* Usage Statistics */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="h-4 w-4 text-purple-400" />
              <h4 className="font-medium text-gray-300">Gesture Usage</h4>
            </div>
            
            {uniqueGestures.length > 0 ? (
              <div className="space-y-3">
                {uniqueGestures.map((gesture) => (
                  <div key={gesture.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-300">{gesture.name}</p>
                      <p className="text-xs text-gray-500">{gesture.count} times</p>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ 
                          width: `${(gesture.count / Math.max(...uniqueGestures.map(g => g.count))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-800/30 rounded-lg border border-gray-700">
                <p className="text-gray-500">No usage data available</p>
              </div>
            )}
            
            {/* Summary stats */}
            {gestureHistory.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-3 rounded-lg bg-gray-700/30 border border-gray-700 text-center">
                  <p className="text-xs text-gray-500">Total Gestures</p>
                  <p className="text-xl font-bold text-white mt-1">{gestureHistory.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-700/30 border border-gray-700 text-center">
                  <p className="text-xs text-gray-500">Unique Gestures</p>
                  <p className="text-xl font-bold text-white mt-1">{uniqueGestures.length}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;