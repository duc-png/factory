import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
    // ✅ State để lưu index hiện tại
    const [index, setIndex] = useState(0);
    // ✅ State để lưu trạng thái hiển thị chi tiết
    const [showMore, setShowMore] = useState(false);

    // ✅ Hàm xử lý khi click Next
    function handleNextClick() {
        // Tránh vượt quá index cuối cùng
        if (index < sculptureList.length - 1) {
            setIndex(index + 1);
        }
    }

    // ✅ Hàm xử lý khi click Previous
    function handlePreviousClick() {
        // Tránh index âm
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    // ✅ Hàm toggle hiển thị chi tiết
    function handleMoreClick() {
        setShowMore(!showMore);
    }

    // ✅ Lấy sculpture hiện tại từ danh sách
    let sculpture = sculptureList[index];

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>🎨 React State Demo: Gallery</h1>

            {/* Navigation buttons */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={handlePreviousClick}
                    disabled={index === 0}
                    style={{
                        marginRight: '10px',
                        padding: '10px 20px',
                        backgroundColor: index === 0 ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: index === 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    ← Previous
                </button>

                <button
                    onClick={handleNextClick}
                    disabled={index === sculptureList.length - 1}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: index === sculptureList.length - 1 ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: index === sculptureList.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next →
                </button>
            </div>

            {/* Sculpture info */}
            <h2>
                <i>{sculpture.name}</i> bởi {sculpture.artist}
            </h2>

            <h3>
                ({index + 1} trong {sculptureList.length})
            </h3>

            {/* Toggle details button */}
            <button
                onClick={handleMoreClick}
                style={{
                    marginBottom: '20px',
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                {showMore ? 'Ẩn' : 'Hiện'} chi tiết
            </button>

            {/* Conditional rendering based on showMore state */}
            {showMore && (
                <p style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '5px',
                    marginBottom: '20px'
                }}>
                    {sculpture.description}
                </p>
            )}

            {/* Sculpture image */}
            <img
                src={sculpture.url}
                alt={sculpture.alt}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
            />

            {/* State explanation */}
            <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px'
            }}>
                <h3>🔍 Giải thích State:</h3>
                <ul>
                    <li><strong>index:</strong> {index} (lưu vị trí sculpture hiện tại)</li>
                    <li><strong>showMore:</strong> {showMore.toString()} (lưu trạng thái hiển thị chi tiết)</li>
                    <li><strong>Tại sao cần State?</strong> Biến thông thường sẽ bị reset về giá trị ban đầu mỗi lần component re-render</li>
                    <li><strong>useState Hook:</strong> Trả về [giá trị hiện tại, hàm cập nhật]</li>
                </ul>
            </div>
        </div>
    );
}
