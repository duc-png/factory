// 📚 ĐÁP ÁN BÀI TẬP 3: LOCAL MUTATION - SHOPPING CART (KHÔNG CSS)
// File này là đáp án, bạn hãy tự làm Exercise3_Practice_NoCSS.js trước!

/* 
🎯 ĐÂY LÀ ĐÁПÁN HOÀN CHỈNH - CHỈ XEM SAU KHI TỰ LÀM!
*/

// BƯỚC 1: Component hiển thị 1 sản phẩm
// function ProductItem({ name, price, quantity }) {
//   const itemTotal = price * quantity;

//   return (
//     <li>
//       {name} - ${price} x {quantity} = ${itemTotal}
//     </li>
//   );
// }


function ProductItem({ name, price, quantity }) {
    const itemTotal = price * quantity;

    return (
        <li>
            {name} - ${price} * {quantity} = ${itemTotal}
        </li>
    );
}


// BƯỚC 2: Component hiển thị toàn bộ giỏ hàng
// function ShoppingCart({ items }) {
//   // LOCAL MUTATION - Tạo local variables
//   const productElements = [];
//   const totals = {
//     totalAmount: 0,
//     totalItems: 0,
//     totalQuantity: 0
//   };

//   // For loop để xử lý từng item
//   for (let i = 0; i < items.length; i++) {
//     const item = items[i];

//     // Push JSX element vào array (local mutation)
//     productElements.push(
//       <ProductItem 
//         key={item.id}
//         name={item.name}
//         price={item.price}
//         quantity={item.quantity}
//       />
//     );

//     // Cập nhật totals object (local mutation)
//     totals.totalAmount += item.price * item.quantity;
//     totals.totalItems += 1;
//     totals.totalQuantity += item.quantity;
//   }

//   return (
//     <div>
//       <h2>🛒 Shopping Cart</h2>

//       {/* Render danh sách sản phẩm */}
//       <ul>
//         {productElements}
//       </ul>

//       {/* Hiển thị thông tin tổng */}
//       <div>
//         <h3>📊 Cart Summary</h3>
//         <p>Total Items: {totals.totalItems}</p>
//         <p>Total Quantity: {totals.totalQuantity}</p>
//         <p>Total Amount: ${totals.totalAmount}</p>
//       </div>
//     </div>
//   );
// }

function ShoppingCart({ items }) {
    const productElement = [];
    const totals = {
        totalAmount: 0,
        totalItem: 0,
        totalQuantity: 0
    };

    for (let i = 0; i < items.lenght; i++) {
        const item = items[i];
    }
}

// BƯỚC 3: Component chính - App
export default function ShoppingAppAnswer() {
    const cartItems = [
        { id: 1, name: "💻 Laptop", price: 999, quantity: 1 },
        { id: 2, name: "🖱️ Wireless Mouse", price: 25, quantity: 2 },
        { id: 3, name: "⌨️ Mechanical Keyboard", price: 75, quantity: 1 },
        { id: 4, name: "🖥️ 4K Monitor", price: 300, quantity: 2 },
        { id: 5, name: "🎧 Headphones", price: 150, quantity: 1 }
    ];

    return (
        <div>
            <h1>🛍️ E-commerce App (No CSS Version)</h1>
            <ShoppingCart items={cartItems} />

            <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
                <p><strong>🎯 Local Mutation Demo:</strong> Array và Object được tạo và thay đổi TRONG component</p>
                <p>✅ Pure Component - Same props → Same result</p>
                <p>🔧 <strong>Kỹ thuật:</strong> for loop, array.push(), object mutation</p>
            </div>
        </div>
    );
}

/* 
📝 GIẢI THÍCH ĐÁP ÁN:

🔥 LOCAL MUTATION TRONG BÀI NÀY:
1. productElements = [] - Array được tạo mới mỗi lần render
2. productElements.push() - Thêm element vào array
3. totals = {} - Object được tạo mới mỗi lần render  
4. totals.totalAmount += ... - Thay đổi properties của object

🔥 TẠI SAO SAFE?
- Các variables được tạo MỚI trong mỗi lần render
- Không thay đổi props từ bên ngoài
- Không ảnh hưởng đến state global
- Pure component: cùng input → cùng output

🔥 CÁC LOẠI TỔNG:
- itemTotal: Tổng tiền 1 sản phẩm (price × quantity)
- totalAmount: Tổng tiền toàn bộ giỏ hàng
- totalItems: Số loại sản phẩm khác nhau (5 loại)
- totalQuantity: Tổng số lượng tất cả sản phẩm (1+2+1+2+1=7)

🔥 KẾT QUẢ MONG MUỐN:
- Laptop - $999 x 1 = $999
- Wireless Mouse - $25 x 2 = $50
- Mechanical Keyboard - $75 x 1 = $75
- 4K Monitor - $300 x 2 = $600
- Headphones - $150 x 1 = $150
---
- Total Items: 5
- Total Quantity: 7
- Total Amount: $1874
*/
