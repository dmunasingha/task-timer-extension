// Chrome API mock for development environment
const isExtensionEnvironment = typeof chrome !== 'undefined' && chrome.storage;

const mockStorage = {
  tasks: [],
  activeTask: null,
};

export const chromeApi = {
  storage: {
    local: {
      get: (keys: string[], callback: (result: any) => void) => {
        if (isExtensionEnvironment) {
          return chrome.storage.local.get(keys, callback);
        }
        // Mock implementation
        const result = {};
        keys.forEach(key => {
          result[key] = mockStorage[key];
        });
        callback(result);
      },
      set: (items: object) => {
        if (isExtensionEnvironment) {
          return chrome.storage.local.set(items);
        }
        // Mock implementation
        Object.assign(mockStorage, items);
        return Promise.resolve();
      },
      remove: (keys: string[]) => {
        if (isExtensionEnvironment) {
          return chrome.storage.local.remove(keys);
        }
        // Mock implementation
        keys.forEach(key => {
          delete mockStorage[key];
        });
        return Promise.resolve();
      }
    }
  },
  runtime: {
    sendMessage: (message: any) => {
      if (isExtensionEnvironment) {
        return chrome.runtime.sendMessage(message);
      }
      // Mock implementation
      console.log('Chrome message sent:', message);
      return Promise.resolve();
    }
  },
  action: {
    setBadgeText: ({ text }: { text: string }) => {
      if (isExtensionEnvironment) {
        return chrome.action.setBadgeText({ text });
      }
      return Promise.resolve();
    },
    setBadgeBackgroundColor: ({ color }: { color: string }) => {
      if (isExtensionEnvironment) {
        return chrome.action.setBadgeBackgroundColor({ color });
      }
      return Promise.resolve();
    }
  }
};