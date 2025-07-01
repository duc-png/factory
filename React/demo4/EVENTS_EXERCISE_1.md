# 🎯 Bài tập 1: Event Handlers Cơ bản

## **Mục tiêu:**
- Hiểu cách viết event handlers
- Phân biệt function reference vs function call
- Thực hành reading props trong event handlers
- Thực hành passing event handlers as props

## **Yêu cầu:**

### **1. Button Click Counter**
Tạo component `ClickCounter` với:
- Hiển thị số lần click
- Button "Click me" để tăng counter
- Button "Reset" để reset về 0
- Button có prop `variant` (primary/secondary) để thay đổi màu



### **2. Alert Button System**
Tạo system gồm:
- `AlertButton` component nhận props `message` và `type` (success/warning/error)
- `NotificationPanel` component chứa nhiều AlertButton với messages khác nhau
- Mỗi button khi click sẽ show alert với message và style theo type

### **3. Dynamic Button Creator**
Tạo component `ButtonCreator` với:
- Input để nhập button label
- Input để nhập alert message
- Button "Create Button" để tạo button mới
- List các buttons đã tạo, mỗi button khi click sẽ show message tương ứng

## **UI Mockup:**
```
📊 Click Counter
[Count: 5]
[Click me] [Reset]

🔔 Notification Panel
[Success Alert] [Warning Alert] [Error Alert]

🛠️ Button Creator
Label: [_____________]
Message: [___________]
[Create Button]

Created Buttons:
[Hello] [Goodbye] [Welcome]
```

## **Gợi ý Technical:**
- Sử dụng useState để quản lý state
- Thực hành 3 cách viết event handlers
- Chú ý pitfall onClick={func} vs onClick={func()}
- Sử dụng props destructuring
- Naming convention: handle + EventName

## **Bonus Challenges:**
1. Thêm sound effect khi click (Web Audio API)
2. Thêm animation khi button được click
3. Lưu counter vào localStorage
4. Thêm keyboard shortcuts (Enter, Space)

**Tạo file:** `EventsExercise1.js` và `EventsExercise1.css`
