# 🎯 Bài tập 5: Complex Event Systems & Real-world Projects

## **Mục tiêu:**
- Xây dựng complete applications với complex event handling
- Tích hợp multiple event systems
- State management với events
- Real-world performance considerations

## **Yêu cầu:**

### **1. Code Editor với Events**
Tạo component `CodeEditor`:
- Text area với syntax highlighting
- Keyboard shortcuts: Ctrl+S (save), Ctrl+Z (undo), Ctrl+Y (redo)
- Auto-complete dropdown khi typing
- Line numbers với click to go to line
- Find & replace functionality (Ctrl+F, Ctrl+H)
- Multiple tabs với close buttons
- Drag & drop files để mở

### **2. Interactive Dashboard**
Tạo component `InteractiveDashboard`:
- Drag & drop widgets để reorder
- Resizable widgets với drag handles
- Real-time data updates (WebSocket simulation)
- Chart interactions (hover, click, zoom)
- Keyboard shortcuts cho navigation
- Full-screen mode cho widgets
- Export dashboard as image

### **3. Collaborative Whiteboard**
Tạo component `Whiteboard`:
- Drawing với mouse/touch events
- Multiple tools: pen, eraser, shapes, text
- Undo/redo system
- Real-time collaboration simulation
- Zoom & pan functionality
- Color picker và brush size
- Save/load drawings từ localStorage

### **4. Game: Tetris-style Block Game**
Tạo component `BlockGame`:
- Keyboard controls: ←→↓ (move), ↑ (rotate), Space (drop)
- Touch controls cho mobile
- Game loop với requestAnimationFrame
- Collision detection
- Line clearing animation
- Score system với high scores
- Pause/resume functionality

## **UI Mockup:**
```
💻 Code Editor
[📁 file1.js] [📁 file2.css] [❌]
┌─────────────────────────────────────┐
│1  function handleClick() {          │
│2    console.log('clicked');         │
│3  }                                 │
│4                                    │
└─────────────────────────────────────┘
[💾 Save] [↶ Undo] [↷ Redo] [🔍 Find]

📊 Interactive Dashboard
┌─────────────┬─────────────┐
│ Sales Chart │ User Stats  │
│ 📈          │ 👥 1,234    │
│             │             │
└─────────────┴─────────────┘
┌─────────────────────────────┐
│ Recent Activity             │
│ • User A logged in          │
│ • Sale completed           │
└─────────────────────────────┘

🎨 Collaborative Whiteboard
[✏️ Pen] [🧽 Eraser] [🔵 Circle] [📝 Text]
[🎨 Colors] [📏 Size: 3px] [↶ Undo] [↷ Redo]
┌─────────────────────────────────────┐
│                                     │
│     🎨 Drawing Area                 │
│                                     │
└─────────────────────────────────────┘

🎮 Block Game
Score: 1,200    Level: 3    Lines: 12
┌─────────────┐
│ ▓▓░░░░░░▓▓ │
│ ▓▓░░░░░░▓▓ │
│ ▓▓░░▓▓░░▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓ │
└─────────────┘
[⏸️ Pause]    Next: ▓▓
```

## **Gợi ý Technical:**
- Canvas API cho drawing/game graphics
- requestAnimationFrame cho smooth animations
- Web Workers cho heavy calculations
- IndexedDB cho complex data storage
- WebSocket hoặc Socket.io cho real-time features
- Throttling/debouncing cho performance
- Error boundaries cho error handling
- State machines cho complex state logic

## **Performance Requirements:**
- 60 FPS animation
- < 16ms event handler execution
- Memory leak prevention
- Efficient re-renders
- Lazy loading cho large datasets

## **Advanced Features:**
1. **Undo/Redo System**: Command pattern implementation
2. **Real-time Collaboration**: Conflict resolution
3. **Offline Support**: Service worker, sync khi online
4. **Mobile Optimization**: Touch gestures, responsive
5. **Internationalization**: Multiple languages
6. **Themes**: Dark/light mode
7. **Plugins**: Extensible architecture

## **Bonus Challenges:**
1. Implement WebRTC cho real-time collaboration
2. Add AI features (auto-complete, suggestions)
3. Create mobile app version với React Native
4. Add analytics tracking
5. Implement advanced graphics với WebGL
6. Create desktop app với Electron
7. Add voice commands integration

**Tạo files:** `EventsExercise5.js`, `EventsExercise5.css`, `hooks/`, `utils/`, `components/`
