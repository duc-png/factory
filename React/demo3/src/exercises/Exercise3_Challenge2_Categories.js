// 🚀 THÁCH THỨC 2: SHOPPING CART VỚI CATEGORY VÀ TAX
// Local Mutation với data phức tạp hơn

function ProductItemWithCategory({ name, price, quantity, category, taxRate }) {
  const subtotal = price * quantity;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  
  // Màu sắc theo category
  const categoryColors = {
    'Electronics': '#007bff',
    'Accessories': '#28a745', 
    'Gaming': '#dc3545',
    'Audio': '#6f42c1'
  };
  
  return (
    <li style={{ 
      padding: "15px", 
      border: "1px solid #ddd", 
      margin: "10px 0",
      borderLeft: `5px solid ${categoryColors[category] || '#6c757d'}`
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong>{name}</strong>
          <br />
          <span style={{ 
            backgroundColor: categoryColors[category] || '#6c757d', 
            color: 'white', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '12px' 
          }}>
            {category}
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div>${price} × {quantity} = ${subtotal.toFixed(2)}</div>
          <div style={{ color: "#666", fontSize: "14px" }}>
            Tax ({taxRate}%): +${tax.toFixed(2)}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>
            Total: ${total.toFixed(2)}
          </div>
        </div>
      </div>
    </li>
  );
}

function CategoryShoppingCart({ items }) {
  // TODO: THỰC HÀNH LOCAL MUTATION NÂNG CAO
  const productElements = [];
  const categoryTotals = {}; // Object để group theo category
  const overallTotals = {
    subtotal: 0,
    totalTax: 0,
    grandTotal: 0,
    totalItems: 0,
    totalQuantity: 0
  };
  
  // TODO: Loop phức tạp với grouping
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    // Tính toán cho từng item
    const subtotal = item.price * item.quantity;
    const tax = subtotal * (item.taxRate / 100);
    const total = subtotal + tax;
    
    // Push JSX element
    productElements.push(
      <ProductItemWithCategory 
        key={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        category={item.category}
        taxRate={item.taxRate}
      />
    );
    
    // Group by category (local mutation of nested object)
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = {
        count: 0,
        subtotal: 0,
        tax: 0,
        total: 0
      };
    }
    
    categoryTotals[item.category].count += 1;
    categoryTotals[item.category].subtotal += subtotal;
    categoryTotals[item.category].tax += tax;
    categoryTotals[item.category].total += total;
    
    // Overall totals (local mutation)
    overallTotals.subtotal += subtotal;
    overallTotals.totalTax += tax;
    overallTotals.grandTotal += total;
    overallTotals.totalItems += 1;
    overallTotals.totalQuantity += item.quantity;
  }
  
  // Tạo JSX cho category summary (thêm local mutation)
  const categoryElements = [];
  for (const categoryName in categoryTotals) {
    const catData = categoryTotals[categoryName];
    categoryElements.push(
      <div key={categoryName} style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "10px", 
        margin: "5px 0",
        borderRadius: "5px"
      }}>
        <strong>{categoryName}</strong>: {catData.count} items, 
        Subtotal: ${catData.subtotal.toFixed(2)}, 
        Tax: ${catData.tax.toFixed(2)}, 
        Total: ${catData.total.toFixed(2)}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>🏪 Category-based Shopping Cart</h2>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {productElements}
      </ul>
      
      <div style={{ backgroundColor: "#e9ecef", padding: "15px", marginTop: "20px" }}>
        <h3>📋 Category Breakdown</h3>
        {categoryElements}
      </div>
      
      <div style={{ backgroundColor: "#d4edda", padding: "15px", marginTop: "20px" }}>
        <h3>💰 Grand Total</h3>
        <p>Total Items: {overallTotals.totalItems}</p>
        <p>Total Quantity: {overallTotals.totalQuantity}</p>
        <p>Subtotal: ${overallTotals.subtotal.toFixed(2)}</p>
        <p>Total Tax: ${overallTotals.totalTax.toFixed(2)}</p>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          Grand Total: ${overallTotals.grandTotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

// THÁCH THỨC 2: Component chính
export default function ShoppingCartChallenge2() {
  const cartItems = [
    { id: 1, name: "💻 MacBook Pro", price: 2499, quantity: 1, category: "Electronics", taxRate: 8.5 },
    { id: 2, name: "🖱️ Magic Mouse", price: 99, quantity: 2, category: "Accessories", taxRate: 8.5 },
    { id: 3, name: "🎮 Gaming Controller", price: 69, quantity: 3, category: "Gaming", taxRate: 10 },
    { id: 4, name: "⌨️ Wireless Keyboard", price: 129, quantity: 1, category: "Accessories", taxRate: 8.5 },
    { id: 5, name: "🎧 AirPods Pro", price: 249, quantity: 2, category: "Audio", taxRate: 8.5 },
    { id: 6, name: "🖥️ Studio Display", price: 1599, quantity: 1, category: "Electronics", taxRate: 8.5 },
    { id: 7, name: "🔊 HomePod Mini", price: 99, quantity: 2, category: "Audio", taxRate: 8.5 }
  ];

  return (
    <div>
      <h1>🎯 Challenge 2: Categories & Tax Calculation</h1>
      <CategoryShoppingCart items={cartItems} />
      
      <div style={{ margin: "20px", padding: "15px", backgroundColor: "#fff3cd" }}>
        <h4>🔧 Advanced Local Mutation Techniques:</h4>
        <ul>
          <li>✅ Nested object mutation (categoryTotals)</li>
          <li>✅ Dynamic object property creation</li>
          <li>✅ Multiple arrays manipulation</li>
          <li>✅ Complex calculations in loops</li>
          <li>✅ for...in loop for object iteration</li>
        </ul>
      </div>
    </div>
  );
}

/* 
📝 KIẾN THỨC HỌC ĐƯỢC:

🔥 NESTED OBJECT MUTATION:
- Tạo object trong object: categoryTotals[category] = {}
- Kiểm tra tồn tại: if (!categoryTotals[category])
- Cộng dồn nested properties

🔥 MULTIPLE ARRAYS:
- productElements: Array chứa JSX products
- categoryElements: Array chứa JSX category summary
- Cả 2 đều dùng local mutation

🔥 DYNAMIC OBJECT PROPERTIES:
- Tạo property động: categoryTotals[item.category]
- Loop qua object: for (const key in object)

🔥 COMPLEX CALCULATIONS:
- Multiple tax rates
- Category grouping
- Nested totals

Đây là level nâng cao của Local Mutation! 🚀
*/
