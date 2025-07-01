import { useState, useEffect, useRef } from 'react';

export default function RenderLifecycleDemo() {
  // ✅ States để track quá trình render
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  const [logs, setLogs] = useState([]);
  const renderCount = useRef(0);

  // ✅ Helper function để log các phases
  const addLog = (phase, message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { 
      id: Date.now() + Math.random(), 
      phase, 
      message, 
      timestamp 
    }]);
  };

  // ✅ Track render phase
  renderCount.current++;
  console.log(`🔄 RENDER PHASE: Component được gọi lần ${renderCount.current}`);

  // ✅ useEffect để track commit phase
  useEffect(() => {
    console.log('💾 COMMIT PHASE: DOM đã được cập nhật');
    addLog('COMMIT', `Component đã render ${renderCount.current} lần, DOM updated`);
  });

  // ✅ Track specific state changes
  useEffect(() => {
    if (count > 0) {
      addLog('STATE_CHANGE', `Count thay đổi thành ${count} → Trigger re-render`);
    }
  }, [count]);

  useEffect(() => {
    if (name !== 'React') {
      addLog('STATE_CHANGE', `Name thay đổi thành "${name}" → Trigger re-render`);
    }
  }, [name]);

  // ✅ Event handlers (trigger phase)
  const handleIncrement = () => {
    addLog('TRIGGER', 'Button click → setState(count + 1)');
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    addLog('TRIGGER', 'Button click → setState(count - 1)');
    setCount(prev => prev - 1);
  };

  const handleNameChange = (e) => {
    addLog('TRIGGER', `Input change → setState("${e.target.value}")`);
    setName(e.target.value);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const forceRerender = () => {
    addLog('TRIGGER', 'Force re-render với cùng giá trị state');
    setCount(count); // Same value → render nhưng không commit
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔄 Example 1: Render Lifecycle Visualizer</h1>
      
      {/* Current State Display */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>📊 Current State</h3>
          <p><strong>Count:</strong> {count}</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Render:</strong> #{renderCount.current}</p>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>⚙️ Render Phase</h3>
          <p>Function được gọi</p>
          <p>JSX được tính toán</p>
          <p>Virtual DOM tạo ra</p>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>💾 Commit Phase</h3>
          <p>So sánh với lần trước</p>
          <p>Cập nhật DOM</p>
          <p>Effects chạy</p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleDecrement}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          -1 (Trigger Render)
        </button>

        <button
          onClick={handleIncrement}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          +1 (Trigger Render)
        </button>

        <button
          onClick={forceRerender}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Force Re-render
        </button>

        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Thay đổi tên..."
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            minWidth: '150px'
          }}
        />
      </div>

      {/* Render Logs */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        borderRadius: '10px',
        padding: '20px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3>📝 Render & Commit Logs</h3>
          <button
            onClick={clearLogs}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Clear Logs
          </button>
        </div>

        <div style={{ 
          maxHeight: '300px', 
          overflowY: 'auto',
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '10px'
        }}>
          {logs.length === 0 ? (
            <p style={{ color: '#6c757d', textAlign: 'center' }}>
              Thực hiện các action để xem quá trình render...
            </p>
          ) : (
            logs.map(log => (
              <div 
                key={log.id}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  marginBottom: '5px',
                  borderRadius: '3px',
                  backgroundColor: getLogColor(log.phase)
                }}
              >
                <span style={{ 
                  fontWeight: 'bold',
                  minWidth: '120px',
                  color: getLogTextColor(log.phase)
                }}>
                  {getLogIcon(log.phase)} {log.phase}
                </span>
                <span style={{ flex: 1, marginLeft: '10px' }}>
                  {log.message}
                </span>
                <span style={{ 
                  fontSize: '12px', 
                  color: '#6c757d',
                  minWidth: '80px',
                  textAlign: 'right'
                }}>
                  {log.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Explanation */}
      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '10px'
      }}>
        <h3>🎯 Giải thích quá trình:</h3>
        <ol>
          <li><strong>🚀 TRIGGER:</strong> User click button hoặc type → setState được gọi</li>
          <li><strong>⚙️ RENDER:</strong> React gọi component function → tính toán JSX mới</li>
          <li><strong>💾 COMMIT:</strong> React so sánh và update DOM → useEffect chạy</li>
          <li><strong>🎨 PAINT:</strong> Browser vẽ lại màn hình (không thể track)</li>
        </ol>
        
        <p><strong>💡 Chú ý:</strong></p>
        <ul>
          <li>Force re-render với cùng giá trị → Render chạy nhưng DOM không thay đổi</li>
          <li>Mỗi setState → Một render cycle mới</li>
          <li>useEffect chạy SAU khi DOM đã commit</li>
        </ul>
      </div>
    </div>
  );
}

// Helper functions
function getLogColor(phase) {
  switch(phase) {
    case 'TRIGGER': return '#ffebee';
    case 'STATE_CHANGE': return '#e3f2fd';
    case 'COMMIT': return '#e8f5e8';
    default: return '#f5f5f5';
  }
}

function getLogTextColor(phase) {
  switch(phase) {
    case 'TRIGGER': return '#c62828';
    case 'STATE_CHANGE': return '#1565c0';
    case 'COMMIT': return '#2e7d32';
    default: return '#424242';
  }
}

function getLogIcon(phase) {
  switch(phase) {
    case 'TRIGGER': return '🚀';
    case 'STATE_CHANGE': return '🔄';
    case 'COMMIT': return '💾';
    default: return '📝';
  }
}
