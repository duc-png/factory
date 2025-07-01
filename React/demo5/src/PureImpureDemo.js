import { useState } from 'react';

// ❌ Impure component - có side effects
let globalCounter = 0;
function ImpureComponent({ multiplier }) {
    // ❌ Side effect: thay đổi biến global
    globalCounter++;

    // ❌ Side effect: console.log trong render
    console.log(`ImpureComponent rendered ${globalCounter} times`);

    // ❌ Side effect: Math.random() không deterministic
    const randomColor = `hsl(${Math.random() * 360}, 70%, 80%)`;

    return (
        <div style={{
            padding: '15px',
            backgroundColor: randomColor,
            borderRadius: '8px',
            border: '2px solid #dc3545'
        }}>
            <h4>❌ Impure Component</h4>
            <p>Multiplier: {multiplier}</p>
            <p>Global Counter: {globalCounter}</p>
            <p>Random Color: {randomColor}</p>
            <small>⚠️ Mỗi lần render có kết quả khác nhau!</small>
        </div>
    );
}

// ✅ Pure component - không có side effects
function PureComponent({ multiplier }) {
    // ✅ Pure: chỉ sử dụng props để tính toán
    const result = multiplier * 2;

    // ✅ Pure: deterministic color từ props
    const color = `hsl(${(multiplier * 30) % 360}, 70%, 80%)`;

    return (
        <div style={{
            padding: '15px',
            backgroundColor: color,
            borderRadius: '8px',
            border: '2px solid #28a745'
        }}>
            <h4>✅ Pure Component</h4>
            <p>Multiplier: {multiplier}</p>
            <p>Result: {result}</p>
            <p>Deterministic Color: {color}</p>
            <small>✅ Cùng input → cùng output!</small>
        </div>
    );
}

// Component để so sánh performance
function PerformanceComparison({ count }) {
    const heavyCalculation = (n) => {
        // Giả lập tính toán nặng
        let result = 0;
        for (let i = 0; i < n * 1000000; i++) {
            result += i;
        }
        return result;
    };

    // ❌ Tính toán nặng mỗi lần render
    const expensiveResult = heavyCalculation(count);

    return (
        <div style={{
            padding: '15px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            border: '2px solid #ffc107'
        }}>
            <h4>⚡ Performance Comparison</h4>
            <p>Count: {count}</p>
            <p>Expensive Calculation: {expensiveResult}</p>
            <small>⚠️ Tính toán nặng chạy mỗi lần render!</small>
        </div>
    );
}

// Component chính
export default function PureImpureDemo() {
    const [multiplier, setMultiplier] = useState(1);
    const [renderCount, setRenderCount] = useState(0);
    const [showComparison, setShowComparison] = useState(true);

    // Force re-render để thấy sự khác biệt
    const forceRender = () => {
        setRenderCount(prev => prev + 1);
    };

    const resetGlobalCounter = () => {
        globalCounter = 0;
        forceRender();
    };

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1>⚖️ Example 2: Pure vs Impure Components</h1>

            {/* Theory Section */}
            <div style={{
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#e7f3ff',
                borderRadius: '10px'
            }}>
                <h2>📚 Lý thuyết: Pure Functions trong React</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div>
                        <h3>✅ Pure Components:</h3>
                        <ul>
                            <li>Cùng input → cùng output</li>
                            <li>Không có side effects</li>
                            <li>Không thay đổi biến bên ngoài</li>
                            <li>Có thể optimize được</li>
                        </ul>
                    </div>
                    <div>
                        <h3>❌ Impure Components:</h3>
                        <ul>
                            <li>Kết quả không dự đoán được</li>
                            <li>Có side effects</li>
                            <li>Thay đổi state bên ngoài</li>
                            <li>Khó debug và test</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px'
            }}>
                <h3>🎮 Controls</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <label>
                        Multiplier:
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={multiplier}
                            onChange={(e) => setMultiplier(Number(e.target.value))}
                            style={{ marginLeft: '10px' }}
                        />
                        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{multiplier}</span>
                    </label>

                    <button
                        onClick={forceRender}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Force Re-render ({renderCount})
                    </button>

                    <button
                        onClick={resetGlobalCounter}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Reset Global Counter
                    </button>

                    <button
                        onClick={() => setShowComparison(!showComparison)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#ffc107',
                            color: 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {showComparison ? 'Hide' : 'Show'} Performance Demo
                    </button>
                </div>
            </div>

            {/* Component Comparison */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <PureComponent multiplier={multiplier} />
                <ImpureComponent multiplier={multiplier} />
            </div>

            {/* Performance Comparison */}
            {showComparison && (
                <div style={{ marginBottom: '30px' }}>
                    <PerformanceComparison count={multiplier} />
                </div>
            )}

            {/* Code Examples */}
            <div style={{ marginBottom: '30px' }}>
                <h3>💻 Code Examples</h3>

                <div style={{ marginBottom: '20px' }}>
                    <h4>✅ Pure Component:</h4>
                    <pre style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '5px',
                        border: '1px solid #dee2e6',
                        fontSize: '14px',
                        overflow: 'auto'
                    }}>
                        {`function PureComponent({ multiplier }) {
  // ✅ Chỉ sử dụng props để tính toán
  const result = multiplier * 2;
  const color = \`hsl(\${(multiplier * 30) % 360}, 70%, 80%)\`;
  
  return (
    <div style={{ backgroundColor: color }}>
      Result: {result}
    </div>
  );
}`}
                    </pre>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h4>❌ Impure Component:</h4>
                    <pre style={{
                        backgroundColor: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '5px',
                        border: '1px solid #dee2e6',
                        fontSize: '14px',
                        overflow: 'auto'
                    }}>
                        {`let globalCounter = 0; // ❌ Global variable

function ImpureComponent({ multiplier }) {
  globalCounter++; // ❌ Side effect
  console.log('Rendering...'); // ❌ Side effect
  const randomColor = Math.random(); // ❌ Non-deterministic
  
  return <div>Counter: {globalCounter}</div>;
}`}
                    </pre>
                </div>
            </div>

            {/* Best Practices */}
            <div style={{
                padding: '20px',
                backgroundColor: '#d4edda',
                borderRadius: '10px',
                border: '1px solid #c3e6cb'
            }}>
                <h3>🎯 Best Practices</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    <div>
                        <h4>✅ DO:</h4>
                        <ul>
                            <li>Sử dụng props và state để tính toán</li>
                            <li>Tính toán deterministic từ input</li>
                            <li>Sử dụng useEffect cho side effects</li>
                            <li>Sử dụng useMemo/useCallback cho optimization</li>
                        </ul>
                    </div>

                    <div>
                        <h4>❌ DON'T:</h4>
                        <ul>
                            <li>Thay đổi biến global trong render</li>
                            <li>Gọi API trong render</li>
                            <li>Sử dụng Math.random() trực tiếp</li>
                            <li>Thay đổi props/state object</li>
                        </ul>
                    </div>
                </div>

                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '5px' }}>
                    <h4>💡 Tại sao Pure Components quan trọng?</h4>
                    <ul>
                        <li><strong>Predictable:</strong> Dễ dự đoán kết quả</li>
                        <li><strong>Testable:</strong> Dễ viết unit test</li>
                        <li><strong>Optimizable:</strong> React có thể skip render</li>
                        <li><strong>Debuggable:</strong> Dễ debug khi có bug</li>
                        <li><strong>Concurrent Safe:</strong> An toàn với Concurrent Mode</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
