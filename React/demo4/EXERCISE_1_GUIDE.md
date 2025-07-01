# 🎨 Bài Tập 1: Color Picker Interactive

## 📋 Mục tiêu
Hoàn thành component ColorPicker với các tính năng:
1. Click vào màu để thay đổi background
2. Hover vào màu để hiển thị tên 
3. Double-click để reset về màu trắng
4. Phím Space để random màu

## 🚀 Cách bắt đầu

### 1. Chạy project
```bash
npm start
```

### 2. Mở file ColorPicker.js
Bạn sẽ thấy các TODO comments, hãy làm theo từng bước:

## 📝 Các bước thực hiện

### Step 1: Tạo State
```javascript
// Thêm vào đầu component (sau dòng comments)
const [currentColor, setCurrentColor] = useState('#ffffff');
const [hoveredColor, setHoveredColor] = useState('');
```

### Step 2: Hoàn thành Event Handlers

#### 2.1 handleColorClick
```javascript
const handleColorClick = (color) => {
  setCurrentColor(color);
  console.log('Color clicked:', color);
};
```

#### 2.2 handleMouseEnter  
```javascript
const handleMouseEnter = (colorName) => {
  setHoveredColor(colorName);
  console.log('Mouse entered:', colorName);
};
```

#### 2.3 handleMouseLeave
```javascript
const handleMouseLeave = () => {
  setHoveredColor('');
  console.log('Mouse left');
};
```

#### 2.4 handleDoubleClick
```javascript
const handleDoubleClick = () => {
  setCurrentColor('#ffffff');
  console.log('Double clicked - reset to white');
};
```

#### 2.5 getRandomColor helper
```javascript
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex].value;
};
```

#### 2.6 handleKeyPress
```javascript
const handleKeyPress = (event) => {
  if (event.key === ' ' || event.code === 'Space') {
    event.preventDefault(); // Ngăn page scroll
    const randomColor = getRandomColor();
    setCurrentColor(randomColor);
    console.log('Space pressed - random color:', randomColor);
  }
};
```

### Step 3: Cập nhật JSX

#### 3.1 Color Display
Tìm div với className="color-display" và cập nhật:
```javascript
<div 
  className="color-display"
  style={{ backgroundColor: currentColor }}
  onDoubleClick={handleDoubleClick}
>
  <span className="color-name">
    Màu hiện tại: {getCurrentColorName()}
  </span>
</div>
```

#### 3.2 Thêm helper function getCurrentColorName
```javascript
const getCurrentColorName = () => {
  const colorObj = colors.find(color => color.value === currentColor);
  return colorObj ? colorObj.name : 'White';
};
```

#### 3.3 Hover Info
```javascript
<div className="hover-info">
  <p>Hover vào màu để xem tên: <strong>{hoveredColor || 'None'}</strong></p>
</div>
```

#### 3.4 Debug Info (tuỳ chọn)
```javascript
<div className="debug-info">
  <p><strong>Debug Info:</strong></p>
  <p>Current Color: {currentColor}</p>
  <p>Hovered Color: {hoveredColor || 'None'}</p>
</div>
```

### Step 4: Bonus Features (Tuỳ chọn)

#### 4.1 Thêm checkmark cho màu đang chọn
Trong color button:
```javascript
<button
  key={index}
  className={`color-button ${currentColor === color.value ? 'selected' : ''}`}
  style={{ backgroundColor: color.value }}
  onClick={() => handleColorClick(color.value)}
  onMouseEnter={() => handleMouseEnter(color.name)}
  onMouseLeave={handleMouseLeave}
  title={color.name}
>
  {currentColor === color.value && '✓'}
</button>
```

#### 4.2 Animation khi thay đổi màu
Thêm className conditional:
```javascript
<div 
  className={`color-display ${isChanging ? 'changing' : ''}`}
  style={{ backgroundColor: currentColor }}
  onDoubleClick={handleDoubleClick}
>
```

Và thêm state + logic:
```javascript
const [isChanging, setIsChanging] = useState(false);

// Trong handleColorClick:
const handleColorClick = (color) => {
  setCurrentColor(color);
  setIsChanging(true);
  setTimeout(() => setIsChanging(false), 300);
};
```

## 🎯 Kiểm tra kết quả

### Các tính năng phải hoạt động:
- ✅ Click màu → Background thay đổi
- ✅ Hover → Hiển thị tên màu  
- ✅ Double-click → Reset về trắng
- ✅ Space → Random màu
- ✅ Hiển thị tên màu hiện tại
- ✅ Animation mượt mà

### Debug:
- Mở Console (F12) để xem logs
- Kiểm tra state thay đổi trong React DevTools

## 🏆 Thử thách thêm (Optional)

1. **Lưu màu yêu thích**: Thêm button "Save" để lưu màu vào localStorage
2. **History**: Hiển thị 5 màu gần nhất đã chọn  
3. **Color picker**: Thêm input color để chọn màu tuỳ ý
4. **Copy hex code**: Click vào hex code để copy
5. **Sound effects**: Thêm âm thanh khi click màu

## 📖 Kiến thức áp dụng

- ✅ **useState Hook**: Quản lý state
- ✅ **Event Handlers**: onClick, onMouseEnter, onKeyPress
- ✅ **Conditional Rendering**: Hiển thị theo điều kiện
- ✅ **Array Methods**: find(), map()
- ✅ **CSS Integration**: Dynamic styles
- ✅ **Keyboard Events**: Space key handling

Chúc bạn code vui vẻ! 🚀
