import React, { useState } from 'react';
import './ListExample3.css';

// Ví dụ 3: Sử dụng key để quản lý state đúng cách
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

function ListExample3() {
  const [artists] = useState(initialArtists);
  const [reverse, setReverse] = useState(false);

  const handleClick = () => {
    setReverse(!reverse);
  };

  const displayedArtists = reverse ? [...artists].reverse() : artists;

  return (
    <div>
      <h2>🔑 3. Keys for Order</h2>
      <p><strong>Lý thuyết:</strong> Keys giúp React nhận biết và duy trì state của từng component khi thứ tự thay đổi</p>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleClick}
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px',
            backgroundColor: reverse ? '#dc3545' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {reverse ? '🔄 Hiển thị theo thứ tự ban đầu' : '🔄 Đảo ngược thứ tự'}
        </button>
      </div>

      <div style={{ 
        border: '2px solid #007bff', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f8f9ff'
      }}>
        <h3>Danh sách nghệ sĩ (với key đúng cách):</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {displayedArtists.map(artist => (
            <li key={artist.id} style={{ 
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="text" 
                  defaultValue={artist.name}
                  placeholder="Nhập tên nghệ sĩ..."
                  style={{ 
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <span style={{ 
                  fontSize: '12px', 
                  color: '#666',
                  backgroundColor: '#e9ecef',
                  padding: '4px 8px',
                  borderRadius: '3px'
                }}>
                  ID: {artist.id}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#d1ecf1', 
        borderRadius: '8px' 
      }}>
        <h4>🧪 Thử nghiệm:</h4>
        <ol style={{ textAlign: 'left' }}>
          <li>Nhập text khác nhau vào các ô input</li>
          <li>Click nút đảo ngược thứ tự</li>
          <li>Quan sát: Giá trị input vẫn "dính" với đúng ID của artist</li>
          <li>Đây chính là lý do tại sao cần key!</li>
        </ol>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f8d7da', 
        borderRadius: '8px',
        textAlign: 'left' 
      }}>
        <h4>💡 Code giải thích:</h4>
        <pre style={{ fontSize: '14px', overflow: 'auto' }}>
{`{displayedArtists.map(artist => (
  <li key={artist.id}>  {/* Key giúp React track */}
    <input defaultValue={artist.name} />
    <span>ID: {artist.id}</span>
  </li>
))}`}
        </pre>
      </div>
    </div>
  );
}

export default ListExample3;
