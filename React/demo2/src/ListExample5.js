import React, { useState } from 'react';

// Ví dụ 5: Minh họa các lỗi về key và cách fix
function ListExample5() {
  const [items, setItems] = useState([
    { id: 1, category: 'fruit', name: 'Apple', color: '#ff6b6b' },
    { id: 2, category: 'fruit', name: 'Banana', color: '#feca57' },
    { id: 3, category: 'vegetable', name: 'Carrot', color: '#ff9ff3' },
    { id: 4, category: 'vegetable', name: 'Broccoli', color: '#54a0ff' }
  ]);

  const [showBadExample, setShowBadExample] = useState(false);

  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  const addItem = () => {
    const fruits = ['Orange', 'Grape', 'Mango', 'Pineapple'];
    const vegetables = ['Spinach', 'Potato', 'Onion', 'Tomato'];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    const isVegetable = Math.random() > 0.5;
    const itemList = isVegetable ? vegetables : fruits;
    const randomItem = itemList[Math.floor(Math.random() * itemList.length)];
    
    const newItem = {
      id: Date.now(),
      category: isVegetable ? 'vegetable' : 'fruit',
      name: randomItem,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // BAD EXAMPLE - Không nên làm
  const BadKeyExample = () => (
    <div style={{ 
      border: '2px solid #dc3545', 
      borderRadius: '8px', 
      padding: '15px',
      backgroundColor: '#f8d7da',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#721c24', margin: '0 0 15px 0' }}>
        ❌ VÍ DỤ SAI - Dùng index làm key
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {items.map((item, index) => (
          <div key={index} style={{ // ❌ BAD: Dùng index
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: 'white'
          }}>
            <input 
              defaultValue={item.name} 
              style={{ 
                width: '100%', 
                marginBottom: '8px',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '3px'
              }} 
            />
            <div style={{ fontSize: '12px', color: '#666' }}>
              <div>Index Key: {index}</div>
              <div>Real ID: {item.id}</div>
              <div style={{ 
                display: 'inline-block',
                width: '15px',
                height: '15px',
                backgroundColor: item.color,
                borderRadius: '3px',
                marginRight: '5px'
              }}></div>
              {item.category}
            </div>
          </div>
        ))}
      </div>
      <p style={{ 
        color: '#721c24', 
        fontSize: '14px', 
        fontStyle: 'italic',
        margin: '10px 0 0 0'
      }}>
        🚨 Thử nhập text, sau đó shuffle → Input values bị lộn xộn!
      </p>
    </div>
  );

  // GOOD EXAMPLE - Nên làm
  const GoodKeyExample = () => (
    <div style={{ 
      border: '2px solid #28a745', 
      borderRadius: '8px', 
      padding: '15px',
      backgroundColor: '#d4edda'
    }}>
      <h3 style={{ color: '#155724', margin: '0 0 15px 0' }}>
        ✅ VÍ DỤ ĐÚNG - Dùng unique ID làm key
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {items.map(item => (
          <div key={item.id} style={{ // ✅ GOOD: Dùng unique ID
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: 'white',
            position: 'relative'
          }}>
            <input 
              defaultValue={item.name} 
              style={{ 
                width: '100%', 
                marginBottom: '8px',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '3px'
              }} 
            />
            <div style={{ fontSize: '12px', color: '#666' }}>
              <div>Unique ID: {item.id}</div>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>
                  <div style={{ 
                    display: 'inline-block',
                    width: '15px',
                    height: '15px',
                    backgroundColor: item.color,
                    borderRadius: '3px',
                    marginRight: '5px'
                  }}></div>
                  {item.category}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '2px 6px',
                    fontSize: '10px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ 
        color: '#155724', 
        fontSize: '14px', 
        fontStyle: 'italic',
        margin: '10px 0 0 0'
      }}>
        ✨ Input values luôn "dính" đúng với item dù có shuffle!
      </p>
    </div>
  );

  return (
    <div>
      <h2>⚖️ 5. Key Rules Demo</h2>
      <p><strong>Lý thuyết:</strong> So sánh key đúng vs key sai để thấy rõ tầm quan trọng</p>
      
      <div style={{ 
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={shuffleItems} 
          style={{ 
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🔀 Shuffle Items
        </button>
        <button 
          onClick={addItem} 
          style={{ 
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ➕ Add Random Item
        </button>
        <button 
          onClick={() => setShowBadExample(!showBadExample)}
          style={{ 
            padding: '10px 15px',
            backgroundColor: showBadExample ? '#6c757d' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {showBadExample ? '👁️ Hide' : '👁️ Show'} Bad Example
        </button>
      </div>

      {showBadExample && <BadKeyExample />}
      <GoodKeyExample />

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <h3 style={{ color: '#1565c0' }}>📋 Key Rules Checklist</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'left' }}>
          <div>
            <h4 style={{ color: '#2e7d32' }}>✅ DO (Nên làm):</h4>
            <ul style={{ fontSize: '14px' }}>
              <li>Dùng unique, stable ID từ data</li>
              <li>Dùng database primary key</li>
              <li>Generate UUID cho local data</li>
              <li>Composite keys khi cần: <code>"user-123-post-456"</code></li>
              <li>Keys chỉ cần unique trong siblings</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#d32f2f' }}>❌ DON'T (Không nên):</h4>
            <ul style={{ fontSize: '14px' }}>
              <li>Dùng array index khi list thay đổi</li>
              <li>Generate key trong render: <code>Math.random()</code></li>
              <li>Để key undefined hoặc null</li>
              <li>Dùng key trùng nhau</li>
              <li>Thay đổi key giữa các renders</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#fff8e1', 
        borderRadius: '8px',
        textAlign: 'left' 
      }}>
        <h4>💡 Code comparison:</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <h5 style={{ color: '#d32f2f' }}>❌ Wrong way:</h5>
            <pre style={{ fontSize: '12px', backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px' }}>
{`{items.map((item, index) => (
  <div key={index}>  {/* BAD */}
    <input defaultValue={item.name} />
  </div>
))}`}
            </pre>
          </div>
          <div>
            <h5 style={{ color: '#2e7d32' }}>✅ Right way:</h5>
            <pre style={{ fontSize: '12px', backgroundColor: '#e8f5e8', padding: '10px', borderRadius: '4px' }}>
{`{items.map(item => (
  <div key={item.id}>  {/* GOOD */}
    <input defaultValue={item.name} />
  </div>
))}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListExample5;
