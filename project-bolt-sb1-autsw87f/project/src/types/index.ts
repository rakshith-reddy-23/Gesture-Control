export interface Gesture {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface Function {
  id: string;
  name: string;
  description: string;
  icon: string;
  assignedGesture?: string;
}

export interface GestureDetection {
  gestureId: string | null;
  confidence: number;
  timestamp: number;
}