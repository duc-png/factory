import React, { useState } from 'react';
import './EventsExercise1.css';

// 🎯 TODO 1: Button Click Counter Component
function ClickCounter() {
  // Tạo state để lưu số lần click
  const [count, setCount] = useState(0);

  // Tạo function handleClick để tăng counter
  function handleClick() {
    setCount(count + 1);
    // Hoặc có thể dùng: setCount(prev => prev + 1);
  }

  // Tạo function handleReset để reset counter về 0
  function handleReset() {
    setCount(0);
  }

  return (
    <div className="click-counter">
      <h3>🎯 Button Click Counter</h3>
      
      {/* Hiển thị số lần click */}
      <div className="counter-display">
        Count: {count}
      </div>
      
      {/* Button "Click me" với event handler */}
      <button 
        className="btn btn-primary"
        onClick={handleClick}
      >
        Click me
      </button>
      
      {/* Button "Reset" với event handler */}
      <button 
        className="btn btn-secondary"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

// 🎯 TODO 2: Reusable Button Component với variant prop
function CustomButton({ children, onClick, variant = 'primary' }) {
  // Xử lý className dựa trên variant prop
  const buttonClass = `btn btn-${variant}`;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// 🎯 TODO 3: Enhanced Click Counter với Custom Button
function EnhancedClickCounter() {
  // State và handlers giống như ClickCounter
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
  }
  
  function handleReset() {
    setCount(0);
  }
  
  return (
    <div className="enhanced-click-counter">
      <h3>✨ Enhanced Click Counter</h3>
      
      <div className="counter-display">
        Count: {count}
      </div>
      
      {/* Sử dụng CustomButton với variant="primary" */}
      <CustomButton variant="primary" onClick={handleClick}>
        Click me
      </CustomButton>
      
      {/* Sử dụng CustomButton với variant="secondary" */}
      <CustomButton variant="secondary" onClick={handleReset}>
        Reset
      </CustomButton>
    </div>
  );
}

// Main Exercise Component
function EventsExercise1() {
  return (
    <div className="events-exercise-1">
      <h2>🎯 Events Exercise 1: Event Handlers Cơ bản</h2>
      
      {/* Hiển thị các components đã hoàn thành */}
      <ClickCounter />
      <EnhancedClickCounter />
      
      <div className="instructions">
        <h4>📝 Hoàn thành:</h4>
        <ol>
          <li>✅ <code>ClickCounter</code> component với state và event handlers</li>
          <li>✅ <code>CustomButton</code> với variant prop</li>
          <li>✅ <code>EnhancedClickCounter</code> sử dụng CustomButton</li>
          <li>✅ Tất cả components đã được hiển thị và hoạt động</li>
        </ol>
        
        <h4>🎯 Tính năng:</h4>
        <ul>
          <li>Click "Click me" để tăng counter</li>
          <li>Click "Reset" để reset về 0</li>
          <li>Button có màu sắc khác nhau (primary/secondary)</li>
          <li>Hover effects và animations</li>
        </ul>
      </div>
    </div>
  );
}

export default EventsExercise1;
