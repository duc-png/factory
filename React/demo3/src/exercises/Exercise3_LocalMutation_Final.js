// 🛒 SHOPPING CART - LOCAL MUTATION DEMO
// File thực tế để chạy và test

import './Exercise3_StepByStep_Guide.css';

// 📦 COMPONENT CON: Hiển thị 1 sản phẩm
function ProductItem({ name, price, quantity }) {
  // 🔢 Tính tổng tiền cho sản phẩm này
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

// 🛒 COMPONENT CHÍNH: Shopping Cart
function ShoppingCart({ items }) {
  
  // 🟢 LOCAL MUTATION: Tạo array và object MỚI
  const productElements = [];  // Array để chứa JSX
  const totals = {             // Object để tính tổng
    totalAmount: 0,
    totalItems: 0,
    totalQuantity: 0
  };
  
  // 🔄 Loop qua từng item và mutate local variables
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Mutate array: thêm JSX element
    productElements.push(
      <ProductItem 
        key={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
      />
    );
    
    // Mutate object: cập nhật totals
    totals.totalAmount += item.price * item.quantity;
    totals.totalItems += 1;
    totals.totalQuantity += item.quantity;
  }

  // 🎨 Render UI
  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-header">
        <h2>🛒 Shopping Cart</h2>
      </div>
      
      <ul className="products-list">
        {productElements}
      </ul>
      
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

// 🚀 APP COMPONENT (EXPORT DEFAULT)
export default function LocalMutationDemo() {
  
  // 📋 Dữ liệu demo
  const cartItems = [
    { id: 1, name: "💻 Laptop", price: 999, quantity: 1 },
    { id: 2, name: "🖱️ Wireless Mouse", price: 25, quantity: 2 },
    { id: 3, name: "⌨️ Mechanical Keyboard", price: 75, quantity: 1 },
    { id: 4, name: "🖥️ 4K Monitor", price: 300, quantity: 2 },
    { id: 5, name: "🎧 Headphones", price: 150, quantity: 1 }
  ];

  return (
    <div className="shopping-app-container">
      <h1>🛍️ Local Mutation Demo</h1>
      
      <ShoppingCart items={cartItems} />
      
      <div className="demo-info">
        <p><strong>🎯 Bài học:</strong> Local Mutation trong Pure Components</p>
        <p>✅ <strong>Pure:</strong> Cùng props → Cùng kết quả</p>
        <p>🔧 <strong>Technique:</strong> array.push(), object mutation trong component</p>
        <p>💡 <strong>Safe:</strong> Không thay đổi props hay external state</p>
      </div>
    </div>
  );
}
