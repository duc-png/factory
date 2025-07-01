// 🚀 THÁCH THỨC 3: MINI E-COMMERCE VỚI SEARCH & FILTER
// Local Mutation với search, filter, sorting

function ProductCard({ product, onAddToCart }) {
  const isOnSale = product.discount > 0;
  const finalPrice = product.price * (1 - product.discount / 100);
  
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      margin: "10px",
      backgroundColor: isOnSale ? "#fff8e1" : "white",
      position: "relative"
    }}>
      {isOnSale && (
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "#ff4444",
          color: "white",
          padding: "5px 10px",
          borderRadius: "15px",
          fontSize: "12px"
        }}>
          {product.discount}% OFF
        </div>
      )}
      
      <h4>{product.name}</h4>
      <p style={{ color: "#666", fontSize: "14px" }}>{product.category}</p>
      
      <div style={{ margin: "10px 0" }}>
        {isOnSale ? (
          <>
            <span style={{ textDecoration: "line-through", color: "#999" }}>
              ${product.price}
            </span>
            <span style={{ color: "#ff4444", fontWeight: "bold", marginLeft: "10px" }}>
              ${finalPrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span style={{ fontWeight: "bold" }}>${product.price}</span>
        )}
      </div>
      
      <button 
        onClick={() => onAddToCart(product)}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

function ProductList({ products, searchTerm, selectedCategory, onAddToCart }) {
  // TODO: LOCAL MUTATION - Filter và Search
  const filteredProducts = [];
  
  // Filter logic với local mutation
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    
    // Check search term
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check category filter
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    // Nếu pass cả 2 điều kiện thì push vào array
    if (matchesSearch && matchesCategory) {
      filteredProducts.push(product);
    }
  }
  
  // Tạo JSX elements
  const productElements = [];
  for (let i = 0; i < filteredProducts.length; i++) {
    const product = filteredProducts[i];
    productElements.push(
      <ProductCard 
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
      />
    );
  }
  
  return (
    <div>
      <p>Found {filteredProducts.length} products</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
        {productElements}
      </div>
    </div>
  );
}

function MiniCart({ cartItems }) {
  if (cartItems.length === 0) {
    return <div style={{ padding: "20px", textAlign: "center" }}>🛒 Cart is empty</div>;
  }
  
  // Local mutation để tính totals
  const cartElements = [];
  let total = 0;
  let totalItems = 0;
  
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const finalPrice = item.price * (1 - item.discount / 100);
    const itemTotal = finalPrice * item.quantity;
    
    cartElements.push(
      <div key={`cart-${item.id}`} style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        padding: "5px 0",
        borderBottom: "1px solid #eee"
      }}>
        <span>{item.name} (x{item.quantity})</span>
        <span>${itemTotal.toFixed(2)}</span>
      </div>
    );
    
    total += itemTotal;
    totalItems += item.quantity;
  }
  
  return (
    <div style={{ 
      border: "1px solid #ddd", 
      borderRadius: "8px", 
      padding: "15px",
      backgroundColor: "#f8f9fa"
    }}>
      <h3>🛒 Mini Cart ({totalItems} items)</h3>
      {cartElements}
      <div style={{ 
        fontWeight: "bold", 
        fontSize: "18px", 
        marginTop: "10px",
        paddingTop: "10px",
        borderTop: "2px solid #007bff"
      }}>
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}

export default function ShoppingCartChallenge3() {
  // State simulation với simple variables
  let searchTerm = "";
  let selectedCategory = "All";
  let cartItems = [];
  
  const products = [
    { id: 1, name: "💻 Gaming Laptop", price: 1299, category: "Electronics", discount: 15 },
    { id: 2, name: "🖱️ RGB Gaming Mouse", price: 89, category: "Gaming", discount: 0 },
    { id: 3, name: "⌨️ Mechanical Keyboard", price: 159, category: "Gaming", discount: 10 },
    { id: 4, name: "🖥️ 4K Monitor", price: 399, category: "Electronics", discount: 5 },
    { id: 5, name: "🎧 Wireless Headphones", price: 249, category: "Audio", discount: 20 },
    { id: 6, name: "📱 Smartphone", price: 799, category: "Electronics", discount: 0 },
    { id: 7, name: "🔊 Bluetooth Speaker", price: 129, category: "Audio", discount: 25 },
    { id: 8, name: "🎮 Gaming Controller", price: 69, category: "Gaming", discount: 15 }
  ];
  
  // Get unique categories
  const categories = ["All"];
  for (let i = 0; i < products.length; i++) {
    if (!categories.includes(products[i].category)) {
      categories.push(products[i].category);
    }
  }
  
  const handleAddToCart = (product) => {
    // Simulate adding to cart (trong thực tế sẽ dùng useState)
    console.log("Added to cart:", product.name);
    alert(`Added ${product.name} to cart!`);
  };
  
  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px" }}>
      <h1>🎯 Challenge 3: Mini E-commerce Store</h1>
      
      {/* Search and Filter Controls */}
      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "8px", 
        marginBottom: "20px",
        display: "flex",
        gap: "15px",
        alignItems: "center"
      }}>
        <div>
          <label>🔍 Search: </label>
          <input 
            type="text" 
            placeholder="Search products..."
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            onChange={(e) => searchTerm = e.target.value}
          />
        </div>
        
        <div>
          <label>📂 Category: </label>
          <select 
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
            onChange={(e) => selectedCategory = e.target.value}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Product List */}
        <div>
          <h2>🛍️ Products</h2>
          <ProductList 
            products={products}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onAddToCart={handleAddToCart}
          />
        </div>
        
        {/* Mini Cart */}
        <div>
          <h2>🛒 Cart</h2>
          <MiniCart cartItems={cartItems} />
        </div>
      </div>
      
      <div style={{ margin: "30px 0", padding: "15px", backgroundColor: "#d1ecf1" }}>
        <h4>🔧 Master Level Local Mutation:</h4>
        <ul>
          <li>✅ Complex filtering với multiple conditions</li>
          <li>✅ Search algorithm implementation</li>
          <li>✅ Dynamic array building</li>
          <li>✅ Nested loops với conditional logic</li>
          <li>✅ Real-world e-commerce patterns</li>
        </ul>
        <p><strong>Note:</strong> Đây là simulation - trong thực tế sẽ dùng useState cho interactivity!</p>
      </div>
    </div>
  );
}

/* 
📝 KIẾN THỨC NÂNG CAO:

🔥 COMPLEX FILTERING:
- Multiple conditions trong filter
- String.includes() cho search
- Logical operators (&&, ||)

🔥 ARRAY BUILDING PATTERNS:
- Conditional push vào array
- Nested loops cho complex data
- Dynamic content generation

🔥 REAL-WORLD APPLICATIONS:
- Search functionality
- Category filtering  
- Shopping cart logic
- Price calculations with discounts

Đây là level Expert của Local Mutation! 🏆
*/
