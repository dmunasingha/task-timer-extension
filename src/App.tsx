import React, { useState, useEffect } from 'react';
import { Timer, History } from 'lucide-react';
import TaskList from './components/TaskList';
import TimerComponent from './components/Timer';
import { Task } from './types';
import { chromeApi } from './utils/chrome';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [view, setView] = useState<'timer' | 'history'>('timer');

  useEffect(() => {
    chromeApi.storage.local.get(['tasks', 'activeTask'], (result) => {
      if (result.tasks) setTasks(result.tasks);
      if (result.activeTask) setActiveTask(result.activeTask);
    });
  }, []);

  const saveTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    chromeApi.storage.local.set({ tasks: updatedTasks });
  };

  const startTimer = (taskName: string) => {
    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      startTime: Date.now(),
      duration: 0,
      status: 'running',
      totalPausedTime: 0
    };
    setActiveTask(newTask);
    chromeApi.storage.local.set({ activeTask: newTask });
    chromeApi.runtime.sendMessage({ type: 'START_TIMER', task: newTask });
  };

  const pauseTimer = () => {
    if (activeTask && activeTask.status === 'running') {
      const pausedTask: Task = {
        ...activeTask,
        status: 'paused',
        pausedAt: Date.now()
      };
      setActiveTask(pausedTask);
      chromeApi.storage.local.set({ activeTask: pausedTask });
      chromeApi.runtime.sendMessage({ type: 'PAUSE_TIMER', task: pausedTask });
    }
  };

  const resumeTimer = () => {
    if (activeTask && activeTask.status === 'paused' && activeTask.pausedAt) {
      const pauseDuration = Date.now() - activeTask.pausedAt;
      const resumedTask: Task = {
        ...activeTask,
        status: 'running',
        totalPausedTime: (activeTask.totalPausedTime || 0) + pauseDuration,
        pausedAt: undefined
      };
      setActiveTask(resumedTask);
      chromeApi.storage.local.set({ activeTask: resumedTask });
      chromeApi.runtime.sendMessage({ type: 'RESUME_TIMER', task: resumedTask });
    }
  };

  const stopTimer = () => {
    if (activeTask) {
      const totalPaused = activeTask.totalPausedTime || 0;
      const duration = Date.now() - activeTask.startTime - totalPaused;
      const completedTask: Task = {
        ...activeTask,
        duration,
        status: 'completed'
      };
      saveTask(completedTask);
      setActiveTask(null);
      chromeApi.storage.local.remove(['activeTask']);
      chromeApi.runtime.sendMessage({ type: 'STOP_TIMER' });
    }
  };

  return (
    <div className="min-w-[350px] min-h-[400px] bg-gray-50">
      <header className="bg-indigo-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6" />
            <h1 className="text-xl font-semibold">TaskTimer Pro</h1>
          </div>
          <button
            onClick={() => setView(view === 'timer' ? 'history' : 'timer')}
            className="p-2 hover:bg-indigo-500 rounded-full transition-colors"
          >
            {view === 'timer' ? <History className="w-5 h-5" /> : <Timer className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="p-4">
        {view === 'timer' ? (
          <div className="space-y-4">
            <TimerComponent
              activeTask={activeTask}
              onStart={startTimer}
              onStop={stopTimer}
              onPause={pauseTimer}
              onResume={resumeTimer}
            />
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </main>

      <footer className="fixed bottom-0 w-full border-t bg-white border-gray-200">
        <div className="flex justify-around p-3">
          <button
            onClick={() => setView('timer')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${view === 'timer' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <Timer className="w-5 h-5" />
            Timer
          </button>
          <button
            onClick={() => setView('history')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${view === 'history' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <History className="w-5 h-5" />
            History
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;