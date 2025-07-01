# 🎯 Button Click Counter - Hướng dẫn chi tiết

## **📋 Yêu cầu:**
Tạo component `ClickCounter` với:
- Hiển thị số lần click
- Button "Click me" để tăng counter  
- Button "Reset" để reset về 0
- Button có prop `variant` (primary/secondary) để thay đổi màu

## **🔥 Hướng dẫn từng bước:**

### **Bước 1: ClickCounter Component**
```javascript
function ClickCounter() {
  // 1. Tạo state để lưu số lần click
  const [count, setCount] = useState(0);

  // 2. Tạo function handleClick để tăng counter
  function handleClick() {
    setCount(count + 1);
    // Hoặc: setCount(prev => prev + 1);
  }

  // 3. Tạo function handleReset để reset counter
  function handleReset() {
    setCount(0);
  }

  // 4. Render UI với event handlers
}
```

### **Bước 2: CustomButton Component**
```javascript
function CustomButton({ children, onClick, variant = 'primary' }) {
  // 1. Tạo className dựa trên variant
  const buttonClass = `btn btn-${variant}`;
  
  // 2. Return button với props
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}
```

### **Bước 3: EnhancedClickCounter**
```javascript
function EnhancedClickCounter() {
  // 1. Copy logic từ ClickCounter
  // 2. Sử dụng CustomButton thay vì <button>
  // 3. Truyền variant props khác nhau
}
```

## **✅ Checklist:**
- [ ] ClickCounter hiển thị count
- [ ] Click button tăng count
- [ ] Reset button đặt count về 0
- [ ] CustomButton nhận variant prop
- [ ] EnhancedClickCounter sử dụng CustomButton
- [ ] CSS styling hoạt động
- [ ] Uncomment components để test

## **🎨 UI Expected:**
```
🎯 Button Click Counter
┌─────────────────┐
│    Count: 5     │
└─────────────────┘
[Click me] [Reset]

✨ Enhanced Click Counter  
┌─────────────────┐
│    Count: 3     │
└─────────────────┘
[Click me] [Reset]
```

## **🐛 Common Pitfalls:**
- ❌ `onClick={handleClick()}` - calls immediately
- ✅ `onClick={handleClick}` - passes function reference
- ❌ Forgot to import `useState`
- ❌ Forgot to pass `onClick` prop to CustomButton

## **🚀 Testing:**
1. Click "Click me" → count should increase
2. Click "Reset" → count should become 0
3. Both buttons should have different colors (variant)
4. Hover effects should work

**Good luck coding! 🎉**
