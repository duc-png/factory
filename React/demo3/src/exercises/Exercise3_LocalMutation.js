// Bài tập 3: Local Mutation - Shopping Cart
// Tạo component hiển thị giỏ hàng với tính toán tổng tiền

import './Exercise3_LocalMutation.css';

function ProductItem({ name, price, quantity }) {
  const itemTotal = price * quantity;
  
  return (
    <li className="product-item">
      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-details">
          ${price} × {quantity}
        </span>
      </div>
      <span className="product-total">${itemTotal}</span>
    </li>
  );
}

function ShoppingCart({ items }) {
  // ✅ LOCAL MUTATION - Tạo array mới trong component
  const productElements = [];
  
  // ✅ LOCAL MUTATION - Tạo object để tính tổng
  const totals = {
    totalAmount: 0,
    totalItems: 0,
    totalQuantity: 0
  };
  
  // ✅ LOCAL MUTATION - Loop và thay đổi local data
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Push JSX element vào array (local mutation OK)
    productElements.push(
      <ProductItem 
        key={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
      />
    );
    
    // Cập nhật totals object (local mutation OK)
    totals.totalAmount += item.price * item.quantity;
    totals.totalItems += 1;
    totals.totalQuantity += item.quantity;
  }

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-header">
        <h2>🛒 Shopping Cart</h2>
      </div>
      
      {/* Render danh sách products từ array đã tạo */}
      <ul className="products-list">
        {productElements}
      </ul>
      
      {/* Hiển thị thông tin tổng */}
      <div className="cart-summary">
        <h3>📊 Cart Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Total Items</span>
            <span className="summary-value">{totals.totalItems}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Quantity</span>
            <span className="summary-value">{totals.totalQuantity}</span>
          </div>
          <div className="summary-item total-amount">
            <span className="summary-label">Total Amount</span>
            <span className="summary-value">${totals.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShoppingApp() {
  const cartItems = [
    { id: 1, name: "💻 Laptop", price: 999, quantity: 1 },
    { id: 2, name: "🖱️ Wireless Mouse", price: 25, quantity: 2 },
    { id: 3, name: "⌨️ Mechanical Keyboard", price: 75, quantity: 1 },
    { id: 4, name: "🖥️ 4K Monitor", price: 300, quantity: 2 },
    { id: 5, name: "🎧 Headphones", price: 150, quantity: 1 }
  ];

  return (
    <div className="shopping-app-container">
      <h1>🛍️ E-commerce App</h1>
      <ShoppingCart items={cartItems} />
      
      {/* Thông tin demo - sử dụng CSS class thay vì inline style */}
      <div className="demo-info">
        <p><strong>🎯 Local Mutation Demo:</strong> Array và Object được tạo và thay đổi TRONG component</p>
        <p>✅ Pure Component - Same props → Same result</p>
        <p>🔧 <strong>Kỹ thuật sử dụng:</strong> for loop, array.push(), object mutation</p>
      </div>
    </div>
  );
}
