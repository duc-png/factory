import { useState } from 'react';

export default function StateSnapshotDemo() {
  const [activeSection, setActiveSection] = useState('theory');

  const sections = [
    { id: 'theory', label: '📚 Lý thuyết', component: <TheorySection /> },
    { id: 'counter', label: '🔢 Counter +3 Demo', component: <CounterDemo /> },
    { id: 'alert', label: '⏰ Alert Timing Demo', component: <AlertDemo /> },
    { id: 'form', label: '📝 Form Snapshot Demo', component: <FormDemo /> },
    { id: 'traffic', label: '🚦 Traffic Light Challenge', component: <TrafficLightDemo /> }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📸 State as a Snapshot - Lý thuyết và Demo</h1>
      
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '5px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              padding: '10px 16px',
              border: 'none',
              backgroundColor: activeSection === section.id ? '#007bff' : '#f8f9fa',
              color: activeSection === section.id ? 'white' : '#495057',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeSection === section.id ? 'bold' : 'normal'
            }}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {sections.find(section => section.id === activeSection)?.component}
    </div>
  );
}

// ✅ Lý thuyết Section
function TheorySection() {
  return (
    <div>
      <h2>📚 STATE AS A SNAPSHOT - LÝ THUYẾT CHI TIẾT</h2>
      
      <section style={{ marginBottom: '40px' }}>
        <h3>🎯 State là gì trong React?</h3>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>State không phải là biến thông thường</strong> - nó hoạt động như một "snapshot" (ảnh chụp)</p>
          <ul>
            <li>🔒 <strong>Immutable:</strong> Không thể thay đổi state hiện tại trực tiếp</li>
            <li>📸 <strong>Snapshot:</strong> Mỗi render có một "ảnh chụp" state riêng</li>
            <li>🔄 <strong>Triggers Re-render:</strong> setState tạo render mới với state mới</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>🔄 Quy trình Setting State Triggers Renders</h3>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>Khi bạn gọi setState:</strong></p>
          <ol>
            <li>🎯 <strong>Event handler thực thi</strong></li>
            <li>📦 <strong>setState đặt state mới vào queue</strong></li>
            <li>🔄 <strong>React schedule một render mới</strong></li>
            <li>📸 <strong>Component được gọi lại với state mới</strong></li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>📸 Rendering Takes a Snapshot in Time</h3>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>Mỗi lần render:</strong></p>
          <ul>
            <li>React gọi component function</li>
            <li>Function trả về JSX snapshot</li>
            <li>React cập nhật DOM theo snapshot</li>
            <li>Event handlers được "frozen" với state values của render đó</li>
          </ul>
          
          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h4>🔑 Điểm quan trọng:</h4>
            <p><strong>State value không bao giờ thay đổi trong cùng một render</strong></p>
            <p>Ngay cả khi event handler của bạn là async!</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>⏰ State Over Time</h3>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f3e5f5', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>Event handlers "nhớ" state từ lúc chúng được tạo</strong></p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>✅ Đúng hiểu:</h4>
              <ul>
                <li>Mỗi render có state riêng</li>
                <li>Event handlers "đông băng" state</li>
                <li>Async code giữ state cũ</li>
              </ul>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>❌ Sai hiểu:</h4>
              <ul>
                <li>State là biến thông thường</li>
                <li>setState thay đổi ngay lập tức</li>
                <li>Async code thấy state mới</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h3>🎯 Ví dụ Mental Model</h3>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e1f5fe', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>Hãy tưởng tượng state như thế này:</strong></p>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '5px',
            fontSize: '14px'
          }}>
{`// Render 1: number = 0
<button onClick={() => {
  setNumber(0 + 1); // setNumber(1)
  setNumber(0 + 1); // setNumber(1) 
  setNumber(0 + 1); // setNumber(1)
}}>+3</button>

// Render 2: number = 1  
<button onClick={() => {
  setNumber(1 + 1); // setNumber(2)
  setNumber(1 + 1); // setNumber(2)
  setNumber(1 + 1); // setNumber(2) 
}}>+3</button>`}
          </pre>
          <p><em>Thay thế state variables bằng giá trị thực để hiểu rõ hơn!</em></p>
        </div>
      </section>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#d4edda', 
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3>🎉 Hãy thử các Demo để thấy State Snapshot hoạt động!</h3>
        <p>Sử dụng các tab ở trên để xem examples thực tế</p>
      </div>
    </div>
  );
}

// ✅ Counter +3 Demo (từ React.dev)
function CounterDemo() {
  const [number, setNumber] = useState(0);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, {
      id: Date.now() + Math.random(),
      message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handlePlus3 = () => {
    addLog(`Bắt đầu: number = ${number}`);
    addLog(`Gọi setNumber(${number} + 1) = setNumber(${number + 1})`);
    setNumber(number + 1);
    addLog(`Gọi setNumber(${number} + 1) = setNumber(${number + 1})`);
    setNumber(number + 1);
    addLog(`Gọi setNumber(${number} + 1) = setNumber(${number + 1})`);
    setNumber(number + 1);
    addLog(`Kết thúc: number vẫn = ${number} (trong render này)`);
  };

  const handlePlus1 = () => {
    setNumber(number + 1);
    addLog(`+1: number = ${number} → ${number + 1}`);
  };

  const clearLogs = () => setLogs([]);

  return (
    <div>
      <h2>🔢 Counter +3 Demo</h2>
      <p>Demo từ React.dev về tại sao +3 chỉ tăng 1 thay vì 3</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Counter Display */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '4rem', 
            margin: '20px 0',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px',
            border: '3px solid #007bff'
          }}>
            {number}
          </h1>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={handlePlus1}
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              +1
            </button>
            
            <button 
              onClick={handlePlus3}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              +3 (Nhưng chỉ tăng 1!)
            </button>
          </div>
        </div>

        {/* Explanation */}
        <div style={{ 
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '10px',
          border: '1px solid #ffeaa7'
        }}>
          <h3>🤔 Tại sao +3 chỉ tăng 1?</h3>
          <p><strong>Trong cùng một render:</strong></p>
          <ul>
            <li><code>number</code> luôn là {number}</li>
            <li><code>setNumber({number} + 1)</code> → <code>setNumber({number + 1})</code></li>
            <li>Gọi 3 lần = 3 lần <code>setNumber({number + 1})</code></li>
            <li>React chỉ lấy giá trị cuối cùng</li>
          </ul>
          
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
            <strong>💡 Giải pháp:</strong>
            <p>Sử dụng functional update: <code>setNumber(n =&gt; n + 1)</code></p>
          </div>
        </div>
      </div>

      {/* Logs */}
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
          <h3>📝 Execution Logs</h3>
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
            Clear
          </button>
        </div>

        <div style={{ 
          maxHeight: '200px', 
          overflowY: 'auto',
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '10px'
        }}>
          {logs.length === 0 ? (
            <p style={{ color: '#6c757d', textAlign: 'center' }}>
              Click +3 để xem quá trình thực thi...
            </p>
          ) : (
            logs.map(log => (
              <div 
                key={log.id}
                style={{ 
                  padding: '5px 0',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span>{log.message}</span>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                  {log.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ Alert Timing Demo
function AlertDemo() {
  const [number, setNumber] = useState(0);

  const handleAlertImmediate = () => {
    setNumber(number + 5);
    alert(`Immediate alert: ${number}`); // Sẽ hiện giá trị cũ
  };

  const handleAlertDelayed = () => {
    setNumber(number + 5);
    setTimeout(() => {
      alert(`Delayed alert (3s): ${number}`); // Vẫn hiện giá trị cũ!
    }, 3000);
  };

  return (
    <div>
      <h2>⏰ Alert Timing Demo</h2>
      <p>Demo về việc event handlers "nhớ" state từ lúc chúng được tạo</p>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          margin: '20px 0',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
          border: '3px solid #007bff'
        }}>
          {number}
        </h1>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          padding: '20px',
          backgroundColor: '#ffebee',
          borderRadius: '10px'
        }}>
          <h3>🚨 Alert Ngay Lập Tức</h3>
          <p>Alert hiện giá trị <strong>trước khi</strong> setState</p>
          <button
            onClick={handleAlertImmediate}
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            +5 và Alert Ngay
          </button>
        </div>

        <div style={{ 
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '10px'
        }}>
          <h3>⏰ Alert Sau 3 Giây</h3>
          <p>Alert vẫn hiện giá trị <strong>cũ</strong> dù DOM đã update!</p>
          <button
            onClick={handleAlertDelayed}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            +5 và Alert Sau 3s
          </button>
        </div>
      </div>

      <div style={{ 
        padding: '20px',
        backgroundColor: '#fff3cd',
        borderRadius: '10px',
        border: '1px solid #ffeaa7'
      }}>
        <h3>🔍 Giải thích:</h3>
        <ul>
          <li><strong>Event handler được "đông băng"</strong> với state values từ lúc render</li>
          <li><strong>Async code (setTimeout)</strong> vẫn giữ state cũ</li>
          <li><strong>DOM có thể đã update</strong> nhưng closure vẫn giữ giá trị cũ</li>
          <li><strong>Điều này giúp tránh bugs</strong> với timing issues</li>
        </ul>
      </div>
    </div>
  );
}

// ✅ Form Demo (từ React.dev)
function FormDemo() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Sending immediately: "${message}" to ${to}`);
    
    setTimeout(() => {
      alert(`Delayed send (5s): "${message}" to ${to}`);
    }, 5000);
  }

  return (
    <div>
      <h2>📝 Form Snapshot Demo</h2>
      <p>Demo từ React.dev về form với delayed submission</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '30px'
      }}>
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} style={{ 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px'
          }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                To:
              </label>
              <select
                value={to}
                onChange={e => setTo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Charlie">Charlie</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Message:
              </label>
              <textarea
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows="4"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  resize: 'vertical'
                }}
              />
            </div>

            <button 
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Send (with 5s delay)
            </button>
          </form>
        </div>

        {/* Instructions */}
        <div style={{ 
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '10px'
        }}>
          <h3>🎯 Thử nghiệm này:</h3>
          <ol>
            <li>Nhập message "Hello" cho Alice</li>
            <li>Click <strong>Send</strong></li>
            <li>Nhanh chóng đổi recipient thành Bob</li>
            <li>Đợi 5 giây xem alert thứ 2</li>
          </ol>
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h4>❓ Kết quả dự đoán:</h4>
            <p>Alert thứ 2 sẽ hiển thị:</p>
            <ul>
              <li>✅ <strong>"Hello to Alice"</strong> (snapshot cũ)</li>
              <li>❌ <strong>"Hello to Bob"</strong> (state mới)</li>
            </ul>
          </div>

          <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '8px' }}>
            <h4>💡 Tại sao?</h4>
            <p><strong>Event handler "đông băng"</strong> state values từ lúc form được submit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Traffic Light Challenge (từ React.dev)
function TrafficLightDemo() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    // Challenge: Thêm alert trước và sau setWalk
    alert(`Current state: ${walk ? 'Walk' : 'Stop'}. Next will be: ${walk ? 'Stop' : 'Walk'}`);
    setWalk(!walk);
    alert(`After setState: Still ${walk ? 'Walk' : 'Stop'} (because snapshot!)`);
  }

  return (
    <div>
      <h2>🚦 Traffic Light Challenge</h2>
      <p>Challenge từ React.dev với alerts trước và sau setState</p>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button 
          onClick={handleClick}
          style={{
            padding: '15px 30px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}
        >
          Change to {walk ? 'Stop' : 'Walk'}
        </button>
        
        <h1 style={{
          fontSize: '4rem',
          color: walk ? 'darkgreen' : 'darkred',
          margin: '20px 0',
          padding: '30px',
          backgroundColor: '#f8f9fa',
          borderRadius: '20px',
          border: `5px solid ${walk ? 'darkgreen' : 'darkred'}`
        }}>
          {walk ? '🚶‍♂️ Walk' : '🛑 Stop'}
        </h1>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px'
      }}>
        <div style={{ 
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '10px'
        }}>
          <h3>🎯 Challenge Question:</h3>
          <p><strong>Có khác biệt gì nếu đặt alert trước hay sau setWalk?</strong></p>
          <ul>
            <li>Alert trước setState: Hiện state hiện tại</li>
            <li>Alert sau setState: Vẫn hiện state hiện tại!</li>
          </ul>
        </div>

        <div style={{ 
          padding: '20px',
          backgroundColor: '#fff3cd',
          borderRadius: '10px'
        }}>
          <h3>💡 Giải thích:</h3>
          <p><strong>Không có khác biệt!</strong></p>
          <p>Cả hai alert đều hiện state từ snapshot hiện tại</p>
          <p>setState chỉ schedule render cho lần sau</p>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#d4edda',
        borderRadius: '10px'
      }}>
        <h3>🔍 Code hiện tại:</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '5px',
          fontSize: '14px',
          overflow: 'auto'
        }}>
{`function handleClick() {
  // Alert trước setState
  alert(\`Current: \${walk ? 'Walk' : 'Stop'}\`);
  
  setWalk(!walk);
  
  // Alert sau setState - vẫn hiện state cũ!
  alert(\`After setState: Still \${walk ? 'Walk' : 'Stop'}\`);
}`}
        </pre>
      </div>
    </div>
  );
}
