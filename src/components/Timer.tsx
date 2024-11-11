import React, { useState, useEffect } from 'react';
import { Play, Square, Clock } from 'lucide-react';
import { Task } from '../types';

interface TimerProps {
  activeTask: Task | null;
  onStart: (taskName: string) => void;
  onStop: () => void;
}

export default function Timer({ activeTask, onStart, onStop }: TimerProps) {
  const [taskName, setTaskName] = useState('');
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: number;
    if (activeTask) {
      interval = setInterval(() => {
        setElapsed(Date.now() - activeTask.startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTask]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {!activeTask ? (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="What are you working on?"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button
            onClick={() => taskName.trim() && onStart(taskName)}
            disabled={!taskName.trim()}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Timer
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {activeTask.name}
            </h3>
            <div className="flex items-center justify-center text-3xl font-bold text-indigo-600 mb-4">
              <Clock className="w-6 h-6 mr-2" />
              {formatTime(elapsed)}
            </div>
            <button
              onClick={onStop}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Square className="w-5 h-5" />
              Stop Timer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}