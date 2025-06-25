// 📚 BÀI TẬP 3 THỰC HÀNH: LOCAL MUTATION - SHOPPING CART (KHÔNG CSS)
// Bạn hãy code theo hướng dẫn từng bước bên dưới

/* 
🎯 MỤC TIÊU:
- Tạo Shopping Cart hiển thị danh sách sản phẩm
- Tính tổng tiền cho từng sản phẩm và toàn bộ giỏ hàng
- Thực hành Local Mutation (tạo và thay đổi array, object trong component)
- Không sử dụng CSS, chỉ focus vào logic
*/

/* 
📝 BƯỚC 1: TẠO COMPONENT PRODUCTITEM
Nhiệm vụ: Hiển thị thông tin 1 sản phẩm (name, price, quantity, total)

Gợi ý:
- Nhận props: name, price, quantity
- Tính itemTotal = price * quantity
- Return JSX đơn giản với <li>
*/

// TODO: Viết function ProductItem ở đây
function ProductItem({ name, price, quantity }) {
  // TODO: Tính itemTotal
  
  // TODO: Return JSX hiển thị sản phẩm
  return (
    <li>
      {/* TODO: Hiển thị name, price, quantity, itemTotal */}
    </li>
  );
}

/* 
📝 BƯỚC 2: TẠO COMPONENT SHOPPINGCART
Nhiệm vụ: Hiển thị toàn bộ giỏ hàng và tính các loại tổng

Gợi ý Local Mutation:
- Tạo array rỗng: const productElements = [];
- Tạo object totals: { totalAmount: 0, totalItems: 0, totalQuantity: 0 }
- Dùng for loop để duyệt items
- Push JSX vào array: productElements.push(<ProductItem />)
- Cộng dồn vào object totals
*/

// TODO: Viết function ShoppingCart ở đây
function ShoppingCart({ items }) {
  // TODO: BƯỚC 2.1 - Tạo local variables
  // const productElements = [];
  // const totals = { ... };
  
  // TODO: BƯỚC 2.2 - For loop qua items
  // for (let i = 0; i < items.length; i++) {
  //   const item = items[i];
  //   
  //   // Push JSX element
  //   productElements.push(<ProductItem key={item.id} ... />);
  //   
  //   // Cập nhật totals
  //   totals.totalAmount += ...;
  //   totals.totalItems += ...;
  //   totals.totalQuantity += ...;
  // }
  
  // TODO: BƯỚC 2.3 - Return JSX
  return (
    <div>
      <h2>Shopping Cart</h2>
      {/* TODO: Render productElements */}
      
      {/* TODO: Hiển thị totals */}
      <div>
        <h3>Summary:</h3>
        {/* TODO: Hiển thị totalItems, totalQuantity, totalAmount */}
      </div>
    </div>
  );
}

/* 
📝 BƯỚC 3: TẠO COMPONENT APP CHÍNH
Nhiệm vụ: Cung cấp dữ liệu và render ShoppingCart

Gợi ý:
- Tạo array cartItems với 5 sản phẩm
- Mỗi item có: id, name, price, quantity
- Render ShoppingCart với props items={cartItems}
*/

// TODO: Viết export default function
export default function ShoppingAppPractice() {
  // TODO: BƯỚC 3.1 - Tạo cartItems array
  const cartItems = [
    // TODO: Thêm 5 sản phẩm với id, name, price, quantity
    // { id: 1, name: "Laptop", price: 999, quantity: 1 },
    // ...
  ];

  // TODO: BƯỚC 3.2 - Return JSX
  return (
    <div>
      {/* TODO: Hiển thị title và ShoppingCart */}
    </div>
  );
}

/* 
🔥 HƯỚNG DẪN THỰC HÀNH:

BƯỚC 1 - ProductItem:
✅ Nhận 3 props: name, price, quantity
✅ Tính itemTotal = price * quantity  
✅ Return <li> hiển thị: "name - $price x quantity = $itemTotal"

BƯỚC 2 - ShoppingCart:
✅ Tạo productElements = []
✅ Tạo totals = { totalAmount: 0, totalItems: 0, totalQuantity: 0 }
✅ For loop qua items:
   - Push <ProductItem key={item.id} .../> vào productElements
   - Cộng item.price * item.quantity vào totalAmount
   - Cộng 1 vào totalItems
   - Cộng item.quantity vào totalQuantity
✅ Return JSX hiển thị productElements và totals

BƯỚC 3 - ShoppingAppPractice:
✅ Tạo cartItems với 5 sản phẩm
✅ Return JSX với <ShoppingCart items={cartItems} />

📊 KẾT QUẢ MONG MUỐN:
- Hiển thị danh sách 5 sản phẩm
- Mỗi sản phẩm hiển thị tổng tiền riêng
- Cuối cùng hiển thị tổng số loại sản phẩm, tổng số lượng, tổng tiền

🎯 SAU KHI HOÀN THÀNH:
- Sửa App.js import ShoppingAppPractice thay vì ShoppingApp
- Chạy npm start để test
- So sánh với file Exercise3_LocalMutation.js có CSS
*/

/* 
💡 GỢI Ý NHANH:

ProductItem:
const itemTotal = price * quantity;
return <li>{name} - ${price} x {quantity} = ${itemTotal}</li>;

ShoppingCart - Loop:
for (let i = 0; i < items.length; i++) {
  const item = items[i];
  productElements.push(<ProductItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} />);
  totals.totalAmount += item.price * item.quantity;
  totals.totalItems += 1;
  totals.totalQuantity += item.quantity;
}

ShoppingCart - Render:
<ul>{productElements}</ul>
<p>Items: {totals.totalItems}</p>
<p>Quantity: {totals.totalQuantity}</p>
<p>Total: ${totals.totalAmount}</p>

ShoppingAppPractice - Data:
{ id: 1, name: "Laptop", price: 999, quantity: 1 }
*/
