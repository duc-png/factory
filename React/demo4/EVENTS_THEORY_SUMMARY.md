# 🎯 React Events - Tổng hợp Lý thuyết

## **📚 1. Adding Event Handlers**

### **Cách viết Event Handlers:**
```javascript
// ✅ Cách 1: Function riêng biệt (Recommended)
function Button() {
  function handleClick() {
    alert('Clicked!');
  }
  return <button onClick={handleClick}>Click me</button>;
}

// ✅ Cách 2: Arrow function inline
<button onClick={() => alert('Clicked!')}>Click me</button>

// ✅ Cách 3: Function expression inline
<button onClick={function() { alert('Clicked!'); }}>Click me</button>
```

### **⚠️ Common Pitfalls:**
```javascript
// ❌ SAI: Gọi function ngay lập tức
<button onClick={handleClick()}>  // Chạy khi render!

// ✅ ĐÚNG: Pass function reference
<button onClick={handleClick}>    // Chạy khi click!

// ❌ SAI: Inline code không wrap
<button onClick={alert('Hi')}>    // Chạy khi render!

// ✅ ĐÚNG: Wrap trong function
<button onClick={() => alert('Hi')}> // Chạy khi click!
```

### **Reading Props trong Event Handlers:**
```javascript
function AlertButton({ message, children }) {
  // Event handler có thể access props
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

// Usage
<AlertButton message="Hello!">Say Hello</AlertButton>
```

### **Passing Event Handlers as Props:**
```javascript
// Child component nhận event handler từ parent
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Parent component truyền handler xuống
function Toolbar() {
  function handlePlay() {
    alert('Playing movie!');
  }
  
  return <Button onClick={handlePlay}>Play Movie</Button>;
}
```

### **Naming Convention:**
```javascript
// Event handler props: on + Capital
function CustomButton({ onClick, onSubmit, onHover }) {
  return <button onClick={onClick}>Button</button>;
}

// Event handler functions: handle + EventName
function MyComponent() {
  function handleClick() { }
  function handleSubmit() { }
  function handleMouseEnter() { }
}
```

---

## **📚 2. Event Propagation**

### **Event Bubbling:**
```javascript
// Events "nổi bọt" từ child lên parent
function Toolbar() {
  return (
    <div onClick={() => alert('Toolbar!')}>      {/* Thứ 2 */}
      <button onClick={() => alert('Button!')}>  {/* Thứ 1 */}
        Click me
      </button>
    </div>
  );
}
// Khi click button: "Button!" rồi "Toolbar!"
```

### **Stopping Propagation:**
```javascript
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation(); // Dừng event bubbling
      onClick();
    }}>
      {children}
    </button>
  );
}
```

### **Preventing Default Behavior:**
```javascript
// Ngăn form submit reload page
function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault(); // Ngăn default behavior
      alert('Submitting!');
    }}>
      <input />
      <button>Submit</button>
    </form>
  );
}
```

### **Event Object Properties:**
```javascript
function handleClick(e) {
  console.log(e.target);        // Element được click
  console.log(e.currentTarget); // Element có event handler
  console.log(e.type);          // 'click'
  console.log(e.clientX);       // Mouse X position
  console.log(e.clientY);       // Mouse Y position
  
  e.preventDefault();    // Ngăn default behavior
  e.stopPropagation();  // Dừng event bubbling
}
```

---

## **📚 3. Common Event Types**

### **Mouse Events:**
```javascript
function MouseEvents() {
  return (
    <div
      onClick={e => console.log('Click')}
      onMouseDown={e => console.log('Mouse Down')}
      onMouseUp={e => console.log('Mouse Up')}
      onMouseEnter={e => console.log('Mouse Enter')}
      onMouseLeave={e => console.log('Mouse Leave')}
      onMouseMove={e => console.log('Mouse Move')}
      onContextMenu={e => console.log('Right Click')}
    >
      Mouse Event Area
    </div>
  );
}
```

### **Keyboard Events:**
```javascript
function KeyboardEvents() {
  return (
    <input
      onKeyDown={e => {
        console.log(`Key Down: ${e.key}`);
        if (e.key === 'Enter') {
          console.log('Enter pressed!');
        }
      }}
      onKeyUp={e => console.log(`Key Up: ${e.key}`)}
      onKeyPress={e => console.log(`Key Press: ${e.key}`)} // Deprecated
    />
  );
}
```

### **Form Events:**
```javascript
function FormEvents() {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log('Form submitted');
      }}
    >
      <input
        onChange={e => console.log('Input changed:', e.target.value)}
        onFocus={e => console.log('Input focused')}
        onBlur={e => console.log('Input blurred')}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## **📚 4. Best Practices**

### **1. Performance Optimization:**
```javascript
// ✅ Use useCallback for expensive handlers
const handleClick = useCallback(() => {
  // Expensive operation
}, [dependency]);

// ✅ Debounce frequent events
const debouncedSearch = useMemo(
  () => debounce((query) => search(query), 300),
  []
);
```

### **2. Accessibility:**
```javascript
function AccessibleButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      onKeyDown={e => {
        // Support keyboard navigation
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label="Descriptive label"
      role="button"
    >
      {children}
    </button>
  );
}
```

### **3. Error Handling:**
```javascript
function SafeEventHandler() {
  const handleClick = (e) => {
    try {
      // Risky operation
      dangerousOperation();
    } catch (error) {
      console.error('Event handler error:', error);
      // Show user-friendly message
    }
  };
  
  return <button onClick={handleClick}>Safe Click</button>;
}
```

---

## **📚 5. Advanced Patterns**

### **Custom Event Hooks:**
```javascript
// Custom hook for click outside
function useClickOutside(ref, handler) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, handler]);
}

// Usage
function Modal() {
  const modalRef = useRef();
  useClickOutside(modalRef, () => closeModal());
  
  return <div ref={modalRef}>Modal content</div>;
}
```

### **Event Delegation:**
```javascript
function EventDelegation() {
  const handleListClick = (e) => {
    // Xử lý click cho toàn bộ list
    if (e.target.matches('.item')) {
      console.log('Item clicked:', e.target.textContent);
    }
  };
  
  return (
    <ul onClick={handleListClick}>
      {items.map(item => (
        <li key={item.id} className="item">
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

---

## **🎯 Key Takeaways**

1. **Event handlers must be passed, not called** (`onClick={handler}` not `onClick={handler()}`)
2. **Events bubble up from child to parent** - use `e.stopPropagation()` to prevent
3. **Use `e.preventDefault()`** to prevent default browser behavior
4. **Event handlers are perfect place for side effects** (unlike render functions)
5. **Name handlers with `handle` prefix and props with `on` prefix**
6. **Use event delegation for performance** with large dynamic lists
7. **Always consider accessibility** in event handling
8. **Handle errors gracefully** in event handlers

Chúc bạn thực hành tốt với các bài tập! 🚀
