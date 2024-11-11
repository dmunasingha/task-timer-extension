// Background service worker for TaskTimer Pro
const activeTimers = new Map();

chrome.runtime.onInstalled.addListener(() => {
  console.log('TaskTimer Pro installed');
});

// Handle messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'START_TIMER') {
    const { task } = message;
    activeTimers.set(task.id, task);
    updateBadge('⏱️');
    return true;
  }
  
  if (message.type === 'STOP_TIMER') {
    const { taskId } = message;
    activeTimers.delete(taskId);
    updateBadge('');
    return true;
  }
});

// Keep service worker alive
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') {
    if (activeTimers.size > 0) {
      updateBadge('⏱️');
    }
  }
});

function updateBadge(text) {
  chrome.action.setBadgeText({ text });
  if (text) {
    chrome.action.setBadgeBackgroundColor({ color: '#4F46E5' });
  }
}