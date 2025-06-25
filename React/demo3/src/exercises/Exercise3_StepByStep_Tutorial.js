// 🎯 BÀI TẬP 3: SHOPPING CART - HƯỚNG DẪN TỪNG BƯỚC
// =======================================================

/* 
📚 MỤC TIÊU BÀI HỌC:
- Hiểu về Local Mutation trong React
- Tạo Shopping Cart với tính toán tổng tiền
- Sử dụng for loop và array/object manipulation
- Áp dụng Pure Component principles
*/

import './Exercise3_LocalMutation.css';

// =======================================================
// BƯỚC 1: TẠO COMPONENT CON - ProductItem
// =======================================================

/* 
🎯 Mục đích: Component hiển thị thông tin 1 sản phẩm
📝 Input: name, price, quantity
📊 Output: JSX hiển thị thông tin sản phẩm + tổng tiền của sản phẩm đó
*/

function ProductItem({ name, price, quantity }) {
  console.log('🔍 ProductItem render:', { name, price, quantity });
  
  // BƯỚC 1.1: Tính tổng tiền của sản phẩm này (price × quantity)
  const itemTotal = price * quantity;
  console.log(`💰 ${name}: ${price} × ${quantity} = ${itemTotal}`);
  
  // BƯỚC 1.2: Return JSX để hiển thị
  return (
    <li className="product-item">
      <div className="product-info">
        {/* Tên sản phẩm */}
        <span className="product-name">{name}</span>
        
        {/* Thông tin giá × số lượng */}
        <span className="product-details">
          ${price} × {quantity}
        </span>
      </div>
      
      {/* Tổng tiền của sản phẩm này */}
      <span className="product-total">${itemTotal}</span>
    </li>
  );
}

// =======================================================
// BƯỚC 2: TẠO COMPONENT CHÍNH - ShoppingCart
// =======================================================

function ShoppingCart({ items }) {
  console.log('🛒 ShoppingCart render với items:', items);
  
  // =======================================================
  // BƯỚC 2.1: KHỞI TẠO LOCAL VARIABLES (LOCAL MUTATION)
  // =======================================================
  
  /* 
  🎯 Tại sao dùng Local Mutation?
  - Tạo data mới TRONG component (không thay đổi props)
  - Pure Component: cùng input → cùng output
  - Performance tốt hơn map() cho trường hợp phức tạp
  */
  
  // Tạo array rỗng để chứa JSX elements
  const productElements = [];
  console.log('📦 Khởi tạo productElements:', productElements);
  
  // Tạo object để lưu các tổng số
  const totals = {
    totalAmount: 0,    // Tổng tiền toàn bộ giỏ hàng
    totalItems: 0,     // Tổng số loại sản phẩm
    totalQuantity: 0   // Tổng số lượng sản phẩm
  };
  console.log('📊 Khởi tạo totals:', totals);
  
  // =======================================================
  // BƯỚC 2.2: LOOP QUA TỪNG ITEM VÀ XỬ LÝ
  // =======================================================
  
  console.log('🔄 Bắt đầu loop qua', items.length, 'items');
  
  for (let i = 0; i < items.length; i++) {
    console.log(`--- Xử lý item ${i + 1}/${items.length} ---`);
    
    // Lấy item hiện tại
    const item = items[i];
    console.log('📋 Item hiện tại:', item);
    
    // =======================================================
    // BƯỚC 2.2.1: TẠO JSX ELEMENT VÀ PUSH VÀO ARRAY
    // =======================================================
    
    // Tạo ProductItem component
    const productElement = (
      <ProductItem 
        key={item.id}        // Key để React track
        name={item.name}     // Tên sản phẩm
        price={item.price}   // Giá
        quantity={item.quantity} // Số lượng
      />
    );
    
    // 🔧 LOCAL MUTATION: Push element vào array
    productElements.push(productElement);
    console.log(`✅ Đã push ${item.name} vào productElements. Length hiện tại: ${productElements.length}`);
    
    // =======================================================
    // BƯỚC 2.2.2: CẬP NHẬT TOTALS (LOCAL MUTATION)
    // =======================================================
    
    // Tính tổng tiền của item này
    const itemTotal = item.price * item.quantity;
    console.log(`💰 Tổng tiền ${item.name}: ${item.price} × ${item.quantity} = ${itemTotal}`);
    
    // 🔧 LOCAL MUTATION: Cập nhật totals object
    totals.totalAmount += itemTotal;      // Cộng vào tổng tiền
    totals.totalItems += 1;               // Tăng số loại sản phẩm
    totals.totalQuantity += item.quantity; // Cộng vào tổng số lượng
    
    console.log('📊 Totals sau khi cập nhật:', {
      totalAmount: totals.totalAmount,
      totalItems: totals.totalItems,
      totalQuantity: totals.totalQuantity
    });
  }
  
  console.log('🏁 Hoàn thành loop. Kết quả cuối cùng:');
  console.log('📦 ProductElements count:', productElements.length);
  console.log('📊 Final totals:', totals);
  
  // =======================================================
  // BƯỚC 2.3: RENDER JSX
  // =======================================================
  
  return (
    <div className="shopping-cart-container">
      {/* Header */}
      <div className="shopping-cart-header">
        <h2>🛒 Shopping Cart</h2>
        <p><small>📊 Debug info: {items.length} items loaded</small></p>
      </div>
      
      {/* Danh sách sản phẩm - Render array đã tạo */}
      <ul className="products-list">
        {/* 🎯 Ở đây chúng ta render array đã được tạo bằng local mutation */}
        {productElements}
      </ul>
      
      {/* Thông tin tổng kết */}
      <div className="cart-summary">
        <h3>📊 Cart Summary</h3>
        <div className="summary-grid">
          
          {/* Tổng số loại sản phẩm */}
          <div className="summary-item">
            <span className="summary-label">Total Items (types)</span>
            <span className="summary-value">{totals.totalItems}</span>
          </div>
          
          {/* Tổng số lượng */}
          <div className="summary-item">
            <span className="summary-label">Total Quantity</span>
            <span className="summary-value">{totals.totalQuantity}</span>
          </div>
          
          {/* Tổng tiền */}
          <div className="summary-item total-amount">
            <span className="summary-label">Total Amount</span>
            <span className="summary-value">${totals.totalAmount}</span>
          </div>
        </div>
        
        {/* Debug info */}
        <div className="debug-info" style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <p>🔧 Debug: productElements.length = {productElements.length}</p>
          <p>🔧 Debug: items.length = {items.length}</p>
        </div>
      </div>
    </div>
  );
}

// =======================================================
// BƯỚC 3: COMPONENT CHÍNH - ShoppingApp
// =======================================================

export default function ShoppingApp() {
  console.log('🚀 ShoppingApp render');
  
  // =======================================================
  // BƯỚC 3.1: CHUẨN BỊ DỮ LIỆU MẪU
  // =======================================================
  
  const cartItems = [
    { id: 1, name: "💻 Laptop", price: 999, quantity: 1 },
    { id: 2, name: "🖱️ Wireless Mouse", price: 25, quantity: 2 },
    { id: 3, name: "⌨️ Mechanical Keyboard", price: 75, quantity: 1 },
    { id: 4, name: "🖥️ 4K Monitor", price: 300, quantity: 2 },
    { id: 5, name: "🎧 Headphones", price: 150, quantity: 1 }
  ];
  
  console.log('📋 Cart items loaded:', cartItems);
  
  // Tính tổng để kiểm tra
  const expectedTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  console.log('🔍 Expected total (verification):', expectedTotal);
  
  // =======================================================
  // BƯỚC 3.2: RENDER APP
  // =======================================================
  
  return (
    <div className="shopping-app-container">
      <h1>🛍️ E-commerce App - Step by Step Tutorial</h1>
      
      {/* Shopping Cart Component */}
      <ShoppingCart items={cartItems} />
      
      {/* Thông tin giải thích */}
      <div className="demo-info">
        <h3>🎯 Local Mutation Explained:</h3>
        <ul>
          <li>✅ <strong>productElements = []</strong> - Tạo array mới trong component</li>
          <li>✅ <strong>totals = {'{}'}</strong> - Tạo object mới trong component</li>
          <li>✅ <strong>for loop</strong> - Loop qua items và mutate local data</li>
          <li>✅ <strong>array.push()</strong> - Thêm JSX elements vào array</li>
          <li>✅ <strong>object mutation</strong> - Cập nhật totals object</li>
          <li>🎯 <strong>Pure Component</strong> - Same props → Same result</li>
        </ul>
        
        <h3>🔧 Kỹ thuật sử dụng:</h3>
        <ul>
          <li>for loop thay vì map() để dễ debug</li>
          <li>Local mutation cho performance</li>
          <li>Console.log để theo dõi quá trình</li>
          <li>Tách component nhỏ (ProductItem)</li>
        </ul>
        
        <h3>📊 Verification:</h3>
        <p>Expected total: ${expectedTotal}</p>
      </div>
    </div>
  );
}

/* 
🎓 TỔNG KẾT STEP-BY-STEP:

1️⃣ BƯỚC 1: Tạo ProductItem component
   - Nhận props: name, price, quantity
   - Tính itemTotal = price × quantity
   - Return JSX hiển thị thông tin

2️⃣ BƯỚC 2: Tạo ShoppingCart component
   - Khởi tạo productElements = []
   - Khởi tạo totals = { totalAmount: 0, totalItems: 0, totalQuantity: 0 }
   - Loop qua items:
     + Tạo ProductItem JSX
     + Push vào productElements (local mutation)
     + Cập nhật totals (local mutation)
   - Render productElements và totals

3️⃣ BƯỚC 3: Tạo ShoppingApp component
   - Chuẩn bị cartItems data
   - Render ShoppingCart với items props
   - Thêm thông tin giải thích

🔑 KEY CONCEPTS:
- Local Mutation: Thay đổi data được tạo TRONG component
- Pure Component: Cùng props → Cùng output
- Performance: for loop + mutation thay vì map()
- Debugging: Console.log để theo dõi
*/
