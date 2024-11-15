export interface Task {
  id: number;
  name: string;
  startTime: number;
  duration: number;
  status: 'running' | 'paused' | 'completed';
  pausedAt?: number;
  totalPausedTime?: number;
}