# 🎯 Bài tập 3: Side Effects & Real-world Applications

## **Mục tiêu:**
- Thực hành side effects trong event handlers
- Tích hợp APIs, localStorage, DOM manipulation
- Xây dựng interactive applications
- Combine events với state management

## **Yêu cầu:**

### **1. Photo Gallery với Keyboard Navigation**
Tạo component `PhotoGallery`:
- Hiển thị grid photos (dùng fake data hoặc API)
- Click photo để xem fullscreen modal
- Keyboard navigation: ← → để chuyển photos, ESC để đóng
- Lazy loading images khi scroll
- Download photo khi click download button

### **2. Real-time Search với Debouncing**
Tạo component `SmartSearch`:
- Search input với real-time suggestions
- Debounce 300ms để tránh spam API calls
- Highlight matching text trong results
- Keyboard navigation: ↑↓ để chọn suggestion, Enter để select
- Recent searches history
- Clear search history button

### **3. Shopping Cart với Local Storage**
Tạo component `ShoppingCart`:
- Product list với Add to Cart buttons
- Cart sidebar với quantity controls
- Persist cart data trong localStorage
- Calculate total price real-time
- Checkout simulation với loading states
- Undo/Redo functionality

### **4. Music Player Controls**
Tạo component `MusicPlayer`:
- Play/Pause/Stop/Next/Previous buttons
- Volume slider và progress bar
- Keyboard shortcuts (Space, →, ←, ↑, ↓)
- Shuffle và repeat modes
- Now playing animation
- Media session API integration

## **UI Mockup:**
```
🖼️ Photo Gallery
┌─────┬─────┬─────┐
│ 📷  │ 📷  │ 📷  │
│ Img1│ Img2│ Img3│
└─────┴─────┴─────┘

Fullscreen Modal:
[← Previous] [📷 Large Image] [Next →]
[💾 Download] [❌ Close]

🔍 Smart Search
Search: [react hooks____] 
┌─────────────────────┐
│ 🔍 React Hooks      │
│ 📖 React Hook Form  │
│ ⚡ React Hook State │
└─────────────────────┘

Recent: [react, javascript, html]
[🗑️ Clear History]

🛒 Shopping Cart
Products:                    Cart (3 items)
[iPhone] [$999] [+Add]      ┌─────────────────┐
[iPad]   [$599] [+Add]      │ iPhone    [-][2][+] │
[Mac]    [$1299] [+Add]     │ iPad      [-][1][+] │
                            │ Total: $2597     │
                            │ [🛒 Checkout]   │
                            └─────────────────┘

🎵 Music Player
♪ Now Playing: Song Title ♪
[⏮️] [⏯️] [⏭️] [🔀] [🔁]
[▰▰▰▰▰▱▱▱▱▱] 2:30 / 4:15
🔊 [▰▰▰▰▰▱▱▱▱▱] 50%
```

## **Gợi ý Technical:**
- localStorage.setItem(), localStorage.getItem()
- setTimeout(), clearTimeout() cho debouncing
- document.addEventListener() cho keyboard events
- Intersection Observer cho lazy loading
- Web Audio API hoặc HTML5 Audio
- Fetch API cho data loading
- CSS transitions/animations

## **Bonus Challenges:**
1. Implement virtual scrolling cho large lists
2. Add PWA features (offline support)
3. WebSocket integration cho real-time updates
4. Implement infinite scroll
5. Add gesture support (swipe, pinch)
6. Dark/Light theme toggle với system preference
7. Export/Import functionality

**Tạo file:** `EventsExercise3.js` và `EventsExercise3.css`
