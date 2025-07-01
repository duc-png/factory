import { useState } from 'react';
import './App.css';
import Gallery from './Gallery';
import Counter from './Counter';
import UserForm from './UserForm';
import RenderLifecycleDemo from './RenderLifecycleDemo';
import PureImpureDemo from './PureImpureDemo';
import StateSnapshotDemo from './StateSnapshotDemo';

function App() {
  // ✅ State để quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState('theory');

  const tabs = [
    { id: 'theory', label: '📚 Lý thuyết State', component: <TheorySection /> },
    { id: 'render-theory', label: '🔄 Lý thuyết Render', component: <RenderTheorySection /> },
    { id: 'snapshot', label: '📸 State as Snapshot', component: <StateSnapshotDemo /> },
    { id: 'lifecycle', label: '🔄 Render Lifecycle', component: <RenderLifecycleDemo /> },
    { id: 'pure-impure', label: '⚖️ Pure vs Impure', component: <PureImpureDemo /> },
    { id: 'gallery', label: '🎨 Gallery Demo', component: <Gallery /> },
    { id: 'counter', label: '🔢 Counter Demo', component: <Counter /> },
    { id: 'form', label: '📝 Form Demo', component: <UserForm /> }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#282c34',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <h1>🚀 React Core Concepts: State & Render</h1>
        <p>Học về State và Render trong React thông qua lý thuyết và thực hành</p>
      </header>

      {/* Tab Navigation */}
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '0'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '15px 20px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#007bff' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#666',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '3px solid #0056b3' : '3px solid transparent',
                fontSize: '16px',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#282c34',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        marginTop: '40px'
      }}>
        <p>Tài liệu dựa trên: <a href="https://react.dev/learn/state-a-components-memory" style={{ color: '#61dafb' }}>React.dev - State: A Component's Memory</a></p>
      </footer>
    </div>
  );
}

// ✅ Component lý thuyết
function TheorySection() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 REACT STATE - LÝ THUYẾT CHI TIẾT</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2>🎯 State là gì?</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>State</strong> là "bộ nhớ" của component trong React. Nó cho phép component:</p>
          <ul>
            <li>🧠 <strong>Nhớ thông tin</strong> giữa các lần render</li>
            <li>🔄 <strong>Tự động re-render</strong> khi dữ liệu thay đổi</li>
            <li>🔒 <strong>Riêng tư và cục bộ</strong> cho từng component instance</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>❌ Tại sao biến thông thường không đủ?</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#ffebee',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p>Biến thông thường có 2 vấn đề:</p>
          <ol>
            <li><strong>Không bền vững:</strong> Bị reset về giá trị ban đầu mỗi lần component re-render</li>
            <li><strong>Không trigger re-render:</strong> React không biết cần render lại khi biến thay đổi</li>
          </ol>
          <pre style={{
            backgroundColor: '#fff',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}>
            {`// ❌ Sai - biến thông thường
let count = 0;
function handleClick() {
  count = count + 1; // Không hoạt động!
}`}</pre>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>✅ useState Hook</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3>Cú pháp cơ bản:</h3>
          <pre style={{
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}>
            {`import { useState } from 'react';

const [state, setState] = useState(initialValue);`}</pre>

          <h3>Giải thích:</h3>
          <ul>
            <li><strong>state:</strong> Giá trị hiện tại của state</li>
            <li><strong>setState:</strong> Hàm để cập nhật state</li>
            <li><strong>initialValue:</strong> Giá trị khởi tạo ban đầu</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>🔄 Quy trình hoạt động</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#fff3e0',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <ol>
            <li><strong>Render lần đầu:</strong> useState(0) trả về [0, setCount]</li>
            <li><strong>User tương tác:</strong> Gọi setCount(1)</li>
            <li><strong>React re-render:</strong> useState(0) giờ trả về [1, setCount]</li>
            <li><strong>Lặp lại:</strong> Chu trình tiếp tục...</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>🎭 Multiple State Variables</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#f3e5f5',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p>Bạn có thể có nhiều state trong một component:</p>
          <pre style={{
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '5px',
            border: '1px solid #ddd'
          }}>
            {`const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [hobbies, setHobbies] = useState([]);`}</pre>

          <p><strong>Lời khuyên:</strong></p>
          <ul>
            <li>✅ Tách state nếu chúng không liên quan</li>
            <li>✅ Nhóm state nếu chúng thường thay đổi cùng nhau</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>🔒 State là Private và Isolated</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#e1f5fe',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <ul>
            <li><strong>Private:</strong> Component cha không thể trực tiếp thay đổi state của con</li>
            <li><strong>Isolated:</strong> Mỗi instance của component có state riêng biệt</li>
            <li><strong>Local:</strong> State chỉ tồn tại trong component khai báo nó</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>📝 Các quy tắc quan trọng</h2>
        <div style={{
          padding: '20px',
          backgroundColor: '#fff8e1',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3>🚨 Hooks Rules:</h3>
          <ul>
            <li>Chỉ gọi Hooks ở <strong>top level</strong> của component</li>
            <li>Không gọi Hooks trong conditions, loops, hay nested functions</li>
            <li>Hooks phải được gọi theo <strong>thứ tự nhất quán</strong> mỗi lần render</li>
          </ul>

          <h3>💡 Best Practices:</h3>
          <ul>
            <li>Đặt tên state theo convention: <code>[something, setSomething]</code></li>
            <li>Sử dụng functional updates khi state mới phụ thuộc vào state cũ</li>
            <li>Tránh mutate state trực tiếp, luôn tạo copy mới</li>
          </ul>
        </div>
      </section>

      <div style={{
        padding: '20px',
        backgroundColor: '#e8f5e8',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3>🎉 Bây giờ hãy khám phá các Demo để thực hành!</h3>
        <p>Sử dụng các tab ở trên để xem các ví dụ thực tế về State</p>
      </div>
    </div>
  );
}

// ✅ Component lý thuyết Render and Commit
function RenderTheorySection() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🔄 RENDER AND COMMIT - LÝ THUYẾT CHI TIẾT</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>🎯 Tổng quan quy trình</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>React render components qua 3 bước:</strong></p>
          <ol style={{ fontSize: '18px', lineHeight: '1.6' }}>
            <li>🚀 <strong>TRIGGER</strong> - Kích hoạt render (setState hoặc initial render)</li>
            <li>⚙️ <strong>RENDER</strong> - Gọi component functions, tính toán JSX</li>
            <li>💾 <strong>COMMIT</strong> - So sánh và cập nhật DOM</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>🚀 Bước 1: Trigger a Render</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#ffebee', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h3>Có 2 cách trigger render:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>1️⃣ Initial Render</h4>
              <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', fontSize: '14px' }}>
{`const root = createRoot(document.getElementById('root'));
root.render(<App />);`}
              </pre>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>2️⃣ State Update</h4>
              <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', fontSize: '14px' }}>
{`const [count, setCount] = useState(0);
setCount(count + 1); // Trigger!`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>⚙️ Bước 2: React Renders Components</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>"Rendering" = React gọi component function</strong></p>
          <ul>
            <li><strong>Initial render:</strong> Gọi root component</li>
            <li><strong>Re-render:</strong> Gọi component có state thay đổi</li>
            <li><strong>Recursive:</strong> Tiếp tục gọi các child components</li>
          </ul>
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
            <h4>⚠️ QUY TẮC QUAN TRỌNG: PURE FUNCTIONS</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '10px' }}>
              <div>
                <h5 style={{ color: '#28a745' }}>✅ Pure (Đúng):</h5>
                <ul style={{ fontSize: '14px' }}>
                  <li>Cùng input → cùng output</li>
                  <li>Không thay đổi biến ngoài</li>
                  <li>Không có side effects</li>
                </ul>
              </div>
              <div>
                <h5 style={{ color: '#dc3545' }}>❌ Impure (Sai):</h5>
                <ul style={{ fontSize: '14px' }}>
                  <li>Kết quả không dự đoán</li>
                  <li>Thay đổi global variables</li>
                  <li>API calls, console.log</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>💾 Bước 3: React Commits to DOM</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p><strong>Commit = Cập nhật DOM với những thay đổi</strong></p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>Initial Render:</h4>
              <p>Tạo toàn bộ DOM nodes mới và append vào container</p>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>Re-render:</h4>
              <p>Chỉ cập nhật những DOM nodes có thay đổi (minimal updates)</p>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '8px' }}>
            <h4>🎯 Tối ưu hóa:</h4>
            <p>React chỉ commit khi có thay đổi thực sự. Nếu render output giống nhau → skip commit!</p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>🎨 Bonus: Browser Paint</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f3e5f5', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <p>Sau khi React commit xong, browser sẽ:</p>
          <ol>
            <li>Recalculate styles (CSS)</li>
            <li>Layout (positioning)</li>
            <li>Paint (vẽ pixels lên màn hình)</li>
          </ol>
          <p><em>React docs gọi là "painting" để tránh nhầm lẫn với "rendering"</em></p>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2>🔍 So sánh Render vs Commit</h2>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e1f5fe', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>⚙️ RENDER Phase</h4>
              <ul>
                <li>Pure functions</li>
                <li>Có thể interrupt được</li>
                <li>Không có side effects</li>
                <li>Tính toán Virtual DOM</li>
              </ul>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
              <h4>💾 COMMIT Phase</h4>
              <ul>
                <li>Synchronous</li>
                <li>Không thể interrupt</li>
                <li>Có thể có side effects</li>
                <li>Cập nhật DOM thật</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h3>🎉 Hãy xem các Demo để thực hành!</h3>
        <p>Sử dụng tab "Render Lifecycle" và "Pure vs Impure" để xem examples thực tế</p>
      </div>
    </div>
  );
}

export default App;
