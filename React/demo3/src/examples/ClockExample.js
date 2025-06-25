// Ví dụ 5: Clock Challenge - Sửa broken clock

// ❌ BROKEN VERSION - Impure component
function BrokenClock({ time }) {
  const hours = time.getHours();
  
  // ❌ Side effect trong render - thay đổi DOM trực tiếp!
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}

// ✅ FIXED VERSION - Pure component
function FixedClock({ time }) {
  const hours = time.getHours();
  
  // ✅ Tính toán class name trong component (pure)
  const className = (hours >= 0 && hours <= 6) ? 'night' : 'day';
  
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}

export default function ClockExample() {
  const currentTime = new Date();
  
  return (
    <div>
      <style>
        {`
          .night { 
            background-color: black; 
            color: white; 
            padding: 20px;
            border-radius: 8px;
          }
          .day { 
            background-color: white; 
            color: black; 
            padding: 20px;
            border: 2px solid #ccc;
            border-radius: 8px;
          }
        `}
      </style>
      
      <h2>❌ Broken Clock (Impure)</h2>
      <BrokenClock time={currentTime} />
      
      <h2>✅ Fixed Clock (Pure)</h2>
      <FixedClock time={currentTime} />
    </div>
  );
}
