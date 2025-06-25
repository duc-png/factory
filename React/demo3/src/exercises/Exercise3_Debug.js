// 🐛 DEBUG GUIDE CHO BÀI 3: SHOPPING CART - LOCAL MUTATION

/* 
🎯 CÁC LỖI THƯỜNG GẶP VÀ CÁCH SỬA:

1️⃣ LỖI: Component không render
❌ Lỗi: Quên import CSS
✅ Sửa: import './Exercise3_LocalMutation.css';

2️⃣ LỖI: Tổng tiền bị sai
❌ Lỗi: totals.totalAmount += item.price; // Quên nhân quantity
✅ Sửa: totals.totalAmount += item.price * item.quantity;

3️⃣ LỖI: Key prop warning
❌ Lỗi: <ProductItem name={item.name} .../>
✅ Sửa: <ProductItem key={item.id} name={item.name} .../>

4️⃣ LỖI: Mutation props trực tiếp  
❌ Lỗi: items.push(newItem); // Mutate props
✅ Sửa: const localArray = []; // Tạo biến local

5️⃣ LỗI: Naming convention
❌ Lỗi: function exercise3_localMutation() 
✅ Sửa: function LocalMutationDemo()
*/

/* 
🔍 DEBUGGING STEP-BY-STEP:

BƯỚC 1: Kiểm tra import
- Có import CSS không?
- Đường dẫn file đúng không?

BƯỚC 2: Kiểm tra data
- Array items có data không?
- Mỗi item có đủ: id, name, price, quantity?

BƯỚC 3: Kiểm tra calculation  
- itemTotal = price * quantity (ĐÚNG)
- totalAmount += itemTotal (ĐÚNG)

BƯỚC 4: Kiểm tra JSX
- Key prop có đặt không?
- Component name đúng PascalCase?
*/

// 🧪 COMPONENT ĐỂ TEST VÀ DEBUG
import React from 'react';

function DebugShoppingCart() {
  const testItems = [
    { id: 1, name: "Test Item 1", price: 10, quantity: 2 },
    { id: 2, name: "Test Item 2", price: 20, quantity: 1 }
  ];

  // Debug: In ra console để xem data
  console.log("🔍 Debug - Test Items:", testItems);

  const elements = [];
  const totals = { totalAmount: 0, totalItems: 0, totalQuantity: 0 };

  for (let i = 0; i < testItems.length; i++) {
    const item = testItems[i];
    
    // Debug: In từng bước tính toán
    const itemTotal = item.price * item.quantity;
    console.log(`🔍 Item ${item.name}: ${item.price} × ${item.quantity} = ${itemTotal}`);
    
    elements.push(
      <div key={item.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
        <strong>{item.name}</strong><br/>
        ${item.price} × {item.quantity} = ${itemTotal}
      </div>
    );
    
    totals.totalAmount += itemTotal;
    totals.totalItems += 1;
    totals.totalQuantity += item.quantity;
    
    // Debug: In totals sau mỗi lần cộng
    console.log(`🔍 Running totals:`, { ...totals });
  }

  // Debug: In kết quả cuối
  console.log("🔍 Final totals:", totals);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🐛 Debug Shopping Cart</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>📦 Items:</h3>
        {elements}
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
        <h3>📊 Debug Totals:</h3>
        <p><strong>Total Items:</strong> {totals.totalItems}</p>
        <p><strong>Total Quantity:</strong> {totals.totalQuantity}</p>
        <p><strong>Total Amount:</strong> ${totals.totalAmount}</p>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>💡 <strong>Mở Developer Tools (F12) để xem console logs</strong></p>
        <p>🔍 Kiểm tra từng bước tính toán trong console</p>
      </div>
    </div>
  );
}

export default DebugShoppingCart;

/* 
🎯 CÁCH SỬ DỤNG FILE DEBUG NÀY:

1. Import component này vào App.js:
   import DebugShoppingCart from './exercises/Exercise3_Debug';

2. Render thay vì component chính:
   <DebugShoppingCart />

3. Mở Developer Tools (F12) và xem Console tab

4. So sánh kết quả với component chính để tìm lỗi

5. Sau khi debug xong, quay lại component chính
*/

/* 
📚 GIẢI THÍCH CHI TIẾT VỀ LOCAL MUTATION:

🟢 LOCAL MUTATION AN TOÀN:
- Tạo biến MỚI trong component: const arr = [];
- Thay đổi biến đó: arr.push(item);
- Không ảnh hưởng props hay external state

🔴 MUTATION KHÔNG AN TOÀN:  
- Thay đổi props trực tiếp: props.items.push(newItem);
- Thay đổi external state: globalArray.push(item);
- Gây side effects không mong muốn

🎯 TẠI SAO COMPONENT VẪN LÀ PURE?
- Input giống → Output giống
- Không thay đổi external state  
- Local mutation không ảnh hưởng bên ngoài
- Mỗi lần render tạo biến mới

💡 BEST PRACTICES:
- Luôn tạo biến local mới
- Không mutate props
- Sử dụng meaningful variable names
- Comment code để dễ hiểu
*/
