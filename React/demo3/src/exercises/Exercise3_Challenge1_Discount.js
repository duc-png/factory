// 🚀 BÀI TẬP THỰC HÀNH NÂNG CAO - LOCAL MUTATION
// Thực hành thêm về Pure Components và Local Mutation

/* 
🎯 THÁCH THỨC 1: SHOPPING CART VỚI DISCOUNT
- Thêm tính năng giảm giá cho từng sản phẩm
- Tính tổng tiền trước và sau giảm giá
- Hiển thị số tiền tiết kiệm được
*/

function ProductItemWithDiscount({ name, price, quantity, discount = 0 }) {
  // TODO: Tính giá gốc
  const originalTotal = price * quantity;
  
  // TODO: Tính giá sau giảm giá
  const discountAmount = originalTotal * (discount / 100);
  const finalTotal = originalTotal - discountAmount;
  
  return (
    <li style={{ padding: "10px", border: "1px solid #ddd", margin: "5px" }}>
      <div>
        <strong>{name}</strong>
      </div>
      <div>
        ${price} × {quantity} = ${originalTotal}
        {discount > 0 && (
          <>
            <br />
            <span style={{ color: "red" }}>
              Discount {discount}%: -${discountAmount.toFixed(2)}
            </span>
            <br />
            <span style={{ color: "green", fontWeight: "bold" }}>
              Final: ${finalTotal.toFixed(2)}
            </span>
          </>
        )}
      </div>
    </li>
  );
}

function AdvancedShoppingCart({ items }) {
  // TODO: THỰC HÀNH LOCAL MUTATION
  const productElements = [];
  const totals = {
    originalAmount: 0,
    finalAmount: 0,
    totalSavings: 0,
    totalItems: 0,
    totalQuantity: 0
  };
  
  // TODO: Loop và tính toán
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Tính cho từng sản phẩm
    const originalTotal = item.price * item.quantity;
    const discountAmount = originalTotal * (item.discount / 100);
    const finalTotal = originalTotal - discountAmount;
    
    // Push JSX element
    productElements.push(
      <ProductItemWithDiscount 
        key={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        discount={item.discount}
      />
    );
    
    // Cộng dồn totals (local mutation)
    totals.originalAmount += originalTotal;
    totals.finalAmount += finalTotal;
    totals.totalSavings += discountAmount;
    totals.totalItems += 1;
    totals.totalQuantity += item.quantity;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>🛒 Advanced Shopping Cart</h2>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {productElements}
      </ul>
      
      <div style={{ backgroundColor: "#f5f5f5", padding: "15px", marginTop: "20px" }}>
        <h3>📊 Order Summary</h3>
        <p>Total Items: {totals.totalItems}</p>
        <p>Total Quantity: {totals.totalQuantity}</p>
        <p>Original Amount: ${totals.originalAmount.toFixed(2)}</p>
        <p style={{ color: "red" }}>Total Savings: ${totals.totalSavings.toFixed(2)}</p>
        <p style={{ color: "green", fontSize: "18px", fontWeight: "bold" }}>
          Final Amount: ${totals.finalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

// THÁCH THỨC 1: Component chính
export default function ShoppingCartChallenge1() {
  const cartItems = [
    { id: 1, name: "💻 Gaming Laptop", price: 1299, quantity: 1, discount: 10 },
    { id: 2, name: "🖱️ Gaming Mouse", price: 79, quantity: 2, discount: 15 },
    { id: 3, name: "⌨️ Mechanical Keyboard", price: 159, quantity: 1, discount: 0 },
    { id: 4, name: "🖥️ 4K Monitor", price: 399, quantity: 2, discount: 5 },
    { id: 5, name: "🎧 Noise Cancelling Headphones", price: 249, quantity: 1, discount: 20 }
  ];

  return (
    <div>
      <h1>🎯 Challenge 1: Shopping Cart with Discount</h1>
      <AdvancedShoppingCart items={cartItems} />
      
      <div style={{ margin: "20px", padding: "15px", backgroundColor: "#e8f4fd" }}>
        <h4>🔧 Kỹ thuật Local Mutation sử dụng:</h4>
        <ul>
          <li>✅ for loop với array.push()</li>
          <li>✅ Object mutation cho multiple totals</li>
          <li>✅ Tính toán phức tạp trong loop</li>
          <li>✅ Conditional rendering trong JSX</li>
          <li>✅ Number.toFixed() cho formatting</li>
        </ul>
      </div>
    </div>
  );
}

/* 
📝 HƯỚNG DẪN THỰC HÀNH:

1. Chạy code này để xem kết quả
2. Thử thay đổi discount values
3. Thêm sản phẩm mới với discount khác nhau
4. Quan sát cách local mutation hoạt động với data phức tạp

🎯 KẾT QUẢ MONG MUỐN:
- Gaming Laptop: $1299 × 1 = $1299, Discount 10%: -$129.90, Final: $1169.10
- Gaming Mouse: $79 × 2 = $158, Discount 15%: -$23.70, Final: $134.30
- Mechanical Keyboard: $159 × 1 = $159 (no discount)
- 4K Monitor: $399 × 2 = $798, Discount 5%: -$39.90, Final: $758.10
- Headphones: $249 × 1 = $249, Discount 20%: -$49.80, Final: $199.20

Total: Original $2663, Savings $243.30, Final $2419.70
*/
