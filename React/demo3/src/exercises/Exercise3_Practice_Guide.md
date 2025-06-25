# 🚀 HƯỚNG DẪN THỰC HÀNH BÀI TẬP 3

## 📁 Files đã tạo:
1. `Exercise3_Practice_NoCSS.js` - File để bạn thực hành (chưa hoàn thành)
2. `Exercise3_Answer_NoCSS.js` - File đáp án (đã hoàn thành)
3. `Exercise3_LocalMutation.js` - Bài gốc có CSS đẹp

## 🔥 CÁCH THỰC HÀNH:

### Bước 1: Làm bài tập
```javascript
// Mở file: src/exercises/Exercise3_Practice_NoCSS.js
// Hoàn thành 3 phần:
// 1. function ProductItem
// 2. function ShoppingCart  
// 3. export default function ShoppingAppPractice
```

### Bước 2: Test bài làm
```javascript
// Sửa src/App.js:
import ShoppingAppPractice from './exercises/Exercise3_Practice_NoCSS';

function App() {
  return (
    <div className="App">
      <ShoppingAppPractice/>
    </div>
  );
}
```

### Bước 3: Chạy để test
```bash
npm start
```

### Bước 4: Kiểm tra kết quả
Nếu làm đúng, bạn sẽ thấy:
- Danh sách 5 sản phẩm với tổng tiền từng sản phẩm
- Tổng số loại sản phẩm: 5
- Tổng số lượng: 7 (1+2+1+2+1)
- Tổng tiền: $1874

### Bước 5: So sánh đáp án
```javascript
// Nếu bí, xem file: Exercise3_Answer_NoCSS.js
// Hoặc thay App.js import:
import ShoppingAppAnswer from './exercises/Exercise3_Answer_NoCSS';
```

## 📊 KẾT QUẢ MONG MUỐN:

```
🛍️ E-commerce App (No CSS Version)

🛒 Shopping Cart
• 💻 Laptop - $999 x 1 = $999
• 🖱️ Wireless Mouse - $25 x 2 = $50  
• ⌨️ Mechanical Keyboard - $75 x 1 = $75
• 🖥️ 4K Monitor - $300 x 2 = $600
• 🎧 Headphones - $150 x 1 = $150

📊 Cart Summary
Total Items: 5
Total Quantity: 7
Total Amount: $1874
```

## 🎯 ĐIỂM QUAN TRỌNG:

### Local Mutation Safe:
```javascript
// ✅ OK - Tạo mới trong component
const productElements = [];
const totals = { totalAmount: 0 };

// ✅ OK - Thay đổi local variables
productElements.push(<ProductItem />);
totals.totalAmount += price * quantity;
```

### Pure Component:
```javascript
// ✅ Cùng props → Cùng kết quả
// ✅ Không thay đổi props
// ✅ Không side effects ngoài ý muốn
```

## 🔧 TIPS THỰC HÀNH:

1. **Bắt đầu với ProductItem:** Đơn giản nhất, chỉ tính itemTotal và render
2. **ShoppingCart step by step:**
   - Tạo variables trước
   - Viết for loop
   - Push vào array và cộng vào object
   - Render JSX cuối cùng
3. **Test từng bước:** Console.log để check data
4. **So sánh với đáp án** nếu bí

## 🚨 LỖI THƯỜNG GẶP:

1. **Quên key prop:** `<ProductItem key={item.id} .../>`
2. **Tính toán sai:**
   - itemTotal = price × quantity (của 1 sản phẩm)
   - totalAmount = tổng tất cả itemTotal
3. **Quên destructure props:** `{ name, price, quantity }`
4. **Loop sai:** `for (let i = 0; i < items.length; i++)`

Chúc bạn thực hành thành công! 🎉
