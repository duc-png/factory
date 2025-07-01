# 🎯 Bài tập 2: Event Propagation & Advanced Events

## **Mục tiêu:**
- Hiểu event bubbling/propagation
- Thực hành stopPropagation()
- Thực hành preventDefault()
- Xây dựng complex event systems

## **Yêu cầu:**

### **1. Nested Click Handlers**
Tạo component `NestedClicks` mô phỏng:
```
[Outer Container] (click → "Container clicked")
  [Middle Box] (click → "Middle clicked")  
    [Inner Button] (click → "Button clicked")
```
- Mặc định: Click inner button sẽ trigger tất cả 3 handlers
- Thêm checkbox "Stop Propagation" để kiểm soát event bubbling
- Hiển thị log các events đã fired

### **2. Custom Context Menu**
Tạo component `CustomContextMenu`:
- Right-click vào một card sẽ hiện context menu
- Context menu có options: Edit, Delete, Copy, Share
- Click outside hoặc ESC để đóng menu
- Prevent default browser context menu

### **3. Form Validation System**
Tạo component `ValidatedForm` với:
- Các fields: name, email, phone, message
- Real-time validation khi typing (onInput)
- Submit form chỉ khi tất cả fields valid
- Prevent default form submission, show success message
- Enter key trong bất kỳ field nào cũng submit form

### **4. Drag & Drop Kanban**
Tạo component `MiniKanban`:
- 3 columns: To Do, In Progress, Done
- Drag tasks giữa các columns
- Prevent default drag behaviors
- Visual feedback khi drag over valid drop zones

## **UI Mockup:**
```
🎯 Nested Click Test
☑️ Stop Propagation
[==== Outer Container ====]
  [== Middle Box ==]
    [Inner Button]

Event Log:
- Button clicked
- Middle clicked  
- Container clicked

🖱️ Custom Context Menu
[Product Card]
  ┌─────────────┐
  │ ✏️ Edit      │
  │ 🗑️ Delete    │
  │ 📋 Copy      │
  │ 📤 Share     │
  └─────────────┘

📝 Form Validation
Name: [John Doe] ✅
Email: [john@] ❌ Invalid email
Phone: [123-456-7890] ✅
Message: [Hello...] ✅
[Submit] (disabled if invalid)

📋 Mini Kanban
[To Do]     [In Progress]     [Done]
Task 1      Task 3           Task 5
Task 2      Task 4           Task 6
```

## **Gợi ý Technical:**
- Sử dụng e.stopPropagation() và e.preventDefault()
- Xử lý keyboard events (onKeyDown, onKeyUp)
- Mouse events (onClick, onMouseDown, onContextMenu)
- Drag events (onDragStart, onDragOver, onDrop)
- Document event listeners cho click outside

## **Bonus Challenges:**
1. Thêm touch events cho mobile
2. Implement double-click detection
3. Add keyboard navigation cho context menu
4. Thêm animation cho drag & drop
5. Persist Kanban state trong localStorage

**Tạo file:** `EventsExercise2.js` và `EventsExercise2.css`
