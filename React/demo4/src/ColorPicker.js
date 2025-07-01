import React, { useState } from 'react';
import './ColorPicker.css';

function ColorPicker() {
    // State để lưu trữ màu hiện tại và màu đang hover
    const [currentColor, setCurrentColor] = useState('#ffffff');
    const [hoveredColor, setHoveredColor] = useState('');
    const [currentColorName, setCurrentColorName] = useState('White');

    const colors = [
        { value: '#ff6b6b', name: 'Red' },
        { value: '#4ecdc4', name: 'Teal' },
        { value: '#45b7d1', name: 'Blue' },
        { value: '#96ceb4', name: 'Green' },
        { value: '#ffeaa7', name: 'Yellow' },
        { value: '#fd79a8', name: 'Pink' },
        { value: '#fdcb6e', name: 'Orange' },
        { value: '#6c5ce7', name: 'Purple' }
    ];

    // Event handlers:

    // 1. handleColorClick - Cập nhật màu khi click
    const handleColorClick = (color) => {
        setCurrentColor(color);
        // Tìm tên màu từ mảng colors
        const colorObj = colors.find(c => c.value === color);
        setCurrentColorName(colorObj ? colorObj.name : 'Unknown');
        console.log('Color clicked:', color);
    };

    // 2. handleMouseEnter - Hiển thị tên màu khi hover
    const handleMouseEnter = (colorName) => {
        setHoveredColor(colorName);
        console.log('Mouse entered:', colorName);
    };

    // 3. handleMouseLeave - Xóa hover state
    const handleMouseLeave = () => {
        setHoveredColor('');
        console.log('Mouse left');
    };

    // 4. handleDoubleClick - Reset về màu trắng
    const handleDoubleClick = () => {
        setCurrentColor('#ffffff');
        setCurrentColorName('White');
        console.log('Double clicked - reset to white');
    };

    // 5. handleKeyPress - Random màu khi nhấn Space
    const handleKeyPress = (event) => {
        if (event.key === ' ' || event.code === 'Space') {
            event.preventDefault(); // Ngăn scroll trang
            const randomColor = getRandomColor();
            setCurrentColor(randomColor.value);
            setCurrentColorName(randomColor.name);
            console.log('Space pressed - random color:', randomColor);
        }
    };

    // 6. getRandomColor - Lấy màu ngẫu nhiên
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    return (
        <div className="color-picker-container"
            tabIndex={0}
            onKeyPress={handleKeyPress}>

            <h2>🎨 Color Picker Interactive</h2>

            {/* Hướng dẫn sử dụng */}
            <div className="instructions">
                <p>📖 <strong>Hướng dẫn:</strong></p>
                <ul>
                    <li>Click vào màu để thay đổi background</li>
                    <li>Hover để xem tên màu</li>
                    <li>Double-click vào vùng màu để reset</li>
                    <li>Nhấn phím Space để random màu</li>
                </ul>
            </div>

            {/* Div hiển thị màu đã chọn */}
            <div
                className="color-display"
                style={{ backgroundColor: currentColor }}
                onDoubleClick={handleDoubleClick}
            >
                <span className="color-name">Màu hiện tại: {currentColorName}</span>
            </div>

            {/* Hiển thị tên màu khi hover */}
            <div className="hover-info">
                <p>Hover vào màu để xem tên: <strong>{hoveredColor || 'None'}</strong></p>
            </div>

            {/* Grid các nút màu */}
            <div className="color-grid">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        className={`color-button ${currentColor === color.value ? 'selected' : ''}`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorClick(color.value)}
                        onMouseEnter={() => handleMouseEnter(color.name)}
                        onMouseLeave={handleMouseLeave}
                        title={color.name}
                    >
                        {/* Hiển thị checkmark cho màu được chọn */}
                        {currentColor === color.value && <span>✓</span>}
                    </button>
                ))}
            </div>

            {/* Thông tin debug */}
            <div className="debug-info">
                <p><strong>Debug Info:</strong></p>
                <p>Current Color: {currentColor}</p>
                <p>Current Color Name: {currentColorName}</p>
                <p>Hovered Color: {hoveredColor || 'None'}</p>
            </div>
        </div>
    );
}

export default ColorPicker;
