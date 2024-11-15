# TaskTimer Browser Extension

A modern, beautiful browser extension for tracking time spent on tasks with pause/resume functionality. Built with React, TypeScript, and Tailwind CSS.

![TaskTimer](https://raw.githubusercontent.com/dmunasingha/task-timer-extension/main/screenshots/demo.png)

## Features

- ⏱️ Simple and intuitive task time tracking
- ⏸️ Pause and resume timer functionality
- 📊 Task history with detailed time logs
- 🎯 Background tracking even when popup is closed
- 💾 Persistent storage across browser sessions
- 🎨 Modern, responsive UI with Tailwind CSS
- 🌙 Clean, minimalist design

## Installation

### Development

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

### Loading the Extension

#### Chrome/Edge
1. Build the extension:
```bash
npm run build:extension
```
2. Open Chrome/Edge and navigate to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` folder

#### Firefox
1. Build the extension:
```bash
npm run build:extension
```
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on" and select any file from the `dist` folder

## Usage

1. Click the extension icon in your browser toolbar
2. Enter a task name and click "Start Timer"
3. Use the pause/resume button to temporarily stop/continue timing
4. Click "Stop Timer" when done to save the task
5. View your task history in the "History" tab

## Development

### Project Structure

```
├── src/
│   ├── components/        # React components
│   ├── utils/            # Utility functions
│   ├── types.ts          # TypeScript types
│   └── App.tsx           # Main application
├── public/
│   └── icons/            # Extension icons
└── background.js         # Service worker
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the extension
- `npm run build:extension` - Build extension with icon conversion
- `npm run lint` - Run ESLint

## Technical Details

- Built with React 18 and TypeScript
- Uses Chrome Extension Storage API for persistence
- Background service worker for timer management
- Tailwind CSS for styling
- Lucide React for icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)