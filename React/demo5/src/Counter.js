import { useState } from 'react';

export default function Counter() {
    // ✅ Multiple state variables
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // ✅ Hàm tăng counter
    function handleIncrement() {
        const newCount = count + step;
        setCount(newCount);
        // Cập nhật lịch sử
        setHistory([...history, `+${step} = ${newCount}`]);
    }

    // ✅ Hàm giảm counter
    function handleDecrement() {
        const newCount = count - step;
        setCount(newCount);
        // Cập nhật lịch sử
        setHistory([...history, `-${step} = ${newCount}`]);
    }

    // ✅ Reset counter
    function handleReset() {
        setCount(0);
        setHistory([...history, 'Reset = 0']);
    }

    // ✅ Clear history
    function handleClearHistory() {
        setHistory([]);
    }

    // ✅ Toggle history display
    function handleToggleHistory() {
        setShowHistory(!showHistory);
    }

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>🔢 React State Demo: Counter</h1>

            {/* Current count display */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                border: '3px solid #007bff'
            }}>
                <h2 style={{
                    fontSize: '3rem',
                    margin: '0',
                    color: count > 0 ? '#28a745' : count < 0 ? '#dc3545' : '#6c757d'
                }}>
                    {count}
                </h2>
                <p style={{ margin: '5px 0', color: '#6c757d' }}>Giá trị hiện tại</p>
            </div>

            {/* Step control */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>
                    Bước nhảy:
                </label>
                <input
                    type="number"
                    value={step}
                    onChange={(e) => setStep(parseInt(e.target.value) || 1)}
                    style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        width: '80px'
                    }}
                />
            </div>

            {/* Action buttons */}
            <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginBottom: '20px'
            }}>
                <button
                    onClick={handleDecrement}
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
                    -{step}
                </button>

                <button
                    onClick={handleReset}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Reset
                </button>

                <button
                    onClick={handleIncrement}
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
                    +{step}
                </button>
            </div>

            {/* History section */}
            <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        onClick={handleToggleHistory}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {showHistory ? 'Ẩn' : 'Hiện'} lịch sử ({history.length})
                    </button>

                    {history.length > 0 && (
                        <button
                            onClick={handleClearHistory}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#ffc107',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Xóa lịch sử
                        </button>
                    )}
                </div>

                {/* History list */}
                {showHistory && history.length > 0 && (
                    <div style={{
                        marginTop: '15px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        padding: '10px'
                    }}>
                        <h4>📝 Lịch sử thay đổi:</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {history.map((item, index) => (
                                <li key={index} style={{ marginBottom: '5px' }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* State explanation */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px'
            }}>
                <h3>🔍 Giải thích Multiple States:</h3>
                <ul>
                    <li><strong>count:</strong> {count} (giá trị counter chính)</li>
                    <li><strong>step:</strong> {step} (bước nhảy mỗi lần thay đổi)</li>
                    <li><strong>history:</strong> Array với {history.length} phần tử (lưu lịch sử)</li>
                    <li><strong>showHistory:</strong> {showHistory.toString()} (hiển thị/ẩn lịch sử)</li>
                    <li><strong>Tại sao tách nhiều state?</strong> Mỗi state có mục đích riêng, dễ quản lý</li>
                </ul>
            </div>
        </div>
    );
}
