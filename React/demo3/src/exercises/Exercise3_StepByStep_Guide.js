// 📚 BÀI TẬP 3: LOCAL MUTATION - SHOPPING CART
// Hướng dẫn từng bước chi tiết

/* 
🎯 MỤC TIÊU BÀI TẬP:
- Hiểu về Local Mutation trong React
- Tạo Shopping Cart với tính toán tổng tiền
- Thực hành Pure Components
- Sử dụng array, object mutation trong phạm vi local
*/

/* 
📖 BƯỚC 1: IMPORT CSS VÀ SETUP CƠ BẢN
*/
import './Exercise3_LocalMutation.css';

/* 
📖 BƯỚC 2: TẠO COMPONENT PRODUCTITEM (COMPONENT CON)
Nhiệm vụ: Hiển thị thông tin 1 sản phẩm trong giỏ hàng
*/
function ProductItem({ name, price, quantity }) {
  // Tính tổng tiền cho 1 sản phẩm (price × quantity)
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

/* 
📖 BƯỚC 3: TẠO COMPONENT SHOPPINGCART (COMPONENT CHÍNH)
Nhiệm vụ: Hiển thị toàn bộ giỏ hàng và tính tổng
*/
function ShoppingCart({ items }) {
  
  /* 
  🔧 BƯỚC 3.1: TẠO CÁC BIẾN LOCAL (LOCAL MUTATION)
  Quan trọng: Các biến này được tạo MỚI trong mỗi lần render
  */
  
  // Array để chứa các JSX elements
  const productElements = [];
  
  // Object để lưu các thông tin tổng kết
  const totals = {
    totalAmount: 0,     // Tổng tiền
    totalItems: 0,      // Tổng số loại sản phẩm
    totalQuantity: 0    // Tổng số lượng sản phẩm
  };
  
  /* 
  🔧 BƯỚC 3.2: LOOP QUA TỪNG ITEM VÀ XỬ LÝ
  Sử dụng for loop thay vì map để thực hành local mutation
  */
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // 🟢 LOCAL MUTATION: Push JSX element vào array
    productElements.push(
      <ProductItem 
        key={item.id}        // Key cho React
        name={item.name}
        price={item.price}
        quantity={item.quantity}
      />
    );
    
    // 🟢 LOCAL MUTATION: Cập nhật object totals
    totals.totalAmount += item.price * item.quantity;  // Cộng dồn tổng tiền
    totals.totalItems += 1;                            // Đếm số loại sản phẩm
    totals.totalQuantity += item.quantity;             // Cộng dồn số lượng
  }

  /* 
  🔧 BƯỚC 3.3: RENDER JSX
  Hiển thị header, danh sách sản phẩm, và summary
  */
  return (
    <div className="shopping-cart-container">
      {/* Header */}
      <div className="shopping-cart-header">
        <h2>🛒 Shopping Cart</h2>
      </div>
      
      {/* Danh sách sản phẩm từ array đã tạo */}
      <ul className="products-list">
        {productElements}
      </ul>
      
      {/* Thông tin tổng kết */}
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

/* 
📖 BƯỚC 4: TẠO COMPONENT APP CHÍNH (EXPORT DEFAULT)
Nhiệm vụ: Cung cấp dữ liệu và render ShoppingCart
*/
export default function ShoppingApp() {
  
  /* 
  🔧 BƯỚC 4.1: TẠO DỮ LIỆU DEMO
  Array chứa các object sản phẩm
  */
  const cartItems = [
    { id: 1, name: "💻 Laptop", price: 999, quantity: 1 },
    { id: 2, name: "🖱️ Wireless Mouse", price: 25, quantity: 2 },
    { id: 3, name: "⌨️ Mechanical Keyboard", price: 75, quantity: 1 },
    { id: 4, name: "🖥️ 4K Monitor", price: 300, quantity: 2 },
    { id: 5, name: "🎧 Headphones", price: 150, quantity: 1 }
  ];

  /* 
  🔧 BƯỚC 4.2: RENDER APP
  */
  return (
    <div className="shopping-app-container">
      <h1>🛍️ E-commerce App</h1>
      
      {/* Truyền data qua props */}
      <ShoppingCart items={cartItems} />
      
      {/* Thông tin giải thích */}
      <div className="demo-info">
        <p><strong>🎯 Local Mutation Demo:</strong> Array và Object được tạo và thay đổi TRONG component</p>
        <p>✅ Pure Component - Same props → Same result</p>
        <p>🔧 <strong>Kỹ thuật sử dụng:</strong> for loop, array.push(), object mutation</p>
      </div>
    </div>
  );
}

/* 
📝 GIẢI THÍCH CHI TIẾT:

🟢 LOCAL MUTATION LÀ GÌ?
- Tạo và thay đổi data TRONG component (không ảnh hưởng bên ngoài)
- Array/Object được tạo mới trong mỗi lần render
- Safe vì không mutate props hoặc external state

🟢 TẠI SAO SỬ DỤNG FOR LOOP?
- Thực hành local mutation với array.push()
- Dễ hiểu hơn cho người mới học
- Có thể làm nhiều việc trong 1 loop

🟢 CÁC BIẾN TRONG TOTALS:
- totalAmount: Tổng tiền toàn bộ giỏ hàng
- totalItems: Số loại sản phẩm khác nhau  
- totalQuantity: Tổng số lượng tất cả sản phẩm

🟢 ITEMTOTAL VS TOTALAMOUNT:
- itemTotal: Tổng tiền 1 sản phẩm (price × quantity)
- totalAmount: Tổng tiền toàn bộ giỏ hàng

🟢 TẠI SAO COMPONENT NÀY LÀ PURE?
- Cùng props → Cùng output
- Không thay đổi props
- Không gọi API hay side effects
- Local mutation không ảnh hưởng external state
*/
