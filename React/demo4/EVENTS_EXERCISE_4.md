# 🎯 Bài tập 4: Event Patterns & Best Practices

## **Mục tiêu:**
- Học advanced event patterns
- Custom hooks cho event handling
- Performance optimization
- Testing event handlers
- Accessibility (a11y) considerations

## **Yêu cầu:**

### **1. Custom Event Hooks**
Tạo các custom hooks:
- `useKeyPress(targetKey)` - detect key press
- `useClickOutside(ref, handler)` - detect click outside element
- `useDoubleClick(handler, delay)` - detect double click vs single click
- `useHover(ref)` - detect hover state
- `useLongPress(handler, delay)` - detect long press

Sau đó sử dụng các hooks này trong component demo.

### **2. Event Delegation System**
Tạo component `EventDelegationDemo`:
- Dynamic list với hàng nghìn items
- Chỉ dùng 1 event listener cho toàn bộ list (event delegation)
- Add/remove items dynamically
- So sánh performance với cách attach individual listeners

### **3. Gesture Recognition System**
Tạo component `GestureRecognizer`:
- Detect swipe directions (up, down, left, right)
- Pinch to zoom gesture
- Pan/drag gesture với momentum
- Rotation gesture
- Multi-touch support
- Visual feedback cho gestures

### **4. Accessibility-First Components**
Tạo các components với full accessibility:
- `AccessibleModal` - keyboard navigation, focus management, ARIA
- `AccessibleDropdown` - keyboard navigation, screen reader support
- `AccessibleTabs` - arrow key navigation, proper ARIA attributes
- `AccessibleCarousel` - keyboard controls, announcements

## **UI Mockup:**
```
🎣 Custom Hooks Demo
Key Press: [Current: 'A']
Click Outside: [Inside Box] Status: Inside
Double Click: [Button] Count: 5 (single: 3, double: 1)
Hover: [Hover Area] Status: Hovering
Long Press: [Button] Duration: 1.2s

⚡ Event Delegation
[Add 1000 Items] [Remove All] [Performance: 0.5ms]
┌─────────────────────────────────────┐
│ Item 1    [Edit] [Delete]           │
│ Item 2    [Edit] [Delete]           │
│ Item 3    [Edit] [Delete]           │
│ ... (1000 items)                    │
└─────────────────────────────────────┘

👆 Gesture Recognition
[Gesture Area]
┌─────────────────────────────────────┐
│     Swipe, Pinch, Rotate here       │
│                                     │
│     Last Gesture: Swipe Right       │
│     Zoom: 150%                      │
│     Rotation: 45°                   │
└─────────────────────────────────────┘

♿ Accessible Components
[Open Modal] [Open Dropdown] [Tab Navigation]

Modal: Full keyboard navigation, focus trap
Dropdown: Arrow keys, Enter, Escape
Tabs: Arrow keys, Home, End
```

## **Gợi ý Technical:**
- useCallback để memoize event handlers
- useRef cho DOM references
- Custom hooks với cleanup functions
- Performance monitoring với Performance API
- ARIA attributes: role, aria-label, aria-expanded, etc.
- Focus management với tabIndex, focus(), blur()
- Screen reader testing với NVDA/JAWS

## **Testing Requirements:**
Viết tests cho:
- Event handler được call với đúng parameters
- Keyboard shortcuts hoạt động
- Click outside behavior
- Gesture recognition accuracy
- Accessibility compliance

## **Bonus Challenges:**
1. Implement complex gestures (draw shapes, handwriting)
2. Voice control integration
3. Eye tracking support
4. Gamepad/controller support
5. Implement command palette (Cmd+K pattern)
6. Advanced focus management system
7. Internationalization cho keyboard shortcuts

**Tạo file:** `EventsExercise4.js`, `EventsExercise4.css`, và `EventsExercise4.test.js`
