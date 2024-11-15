import React from 'react';
import { Clock } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks recorded yet
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{task.name}</h3>
                <span className="text-sm text-gray-500">
                  {formatDate(task.startTime)}
                </span>
              </div>
              <div className="flex items-center text-indigo-600">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{formatTime(task.duration)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}