# 🚀 HƯỚNG DẪN THỰC HÀNH BÀI TẬP 4 - TODO APP

## 📁 Files đã tạo:
1. `Exercise4_Practice_NoCSS.js` - File để bạn thực hành (có template + gợi ý)
2. `Exercise4_Answer_NoCSS.js` - File đáp án hoàn chỉnh
3. `Exercise4_TodoApp.js` - Bài gốc có CSS đẹp

## 🎯 MỤC TIÊU BÀI TẬP 4:

### Pure Components:
- **TodoItem**: Hiển thị 1 todo (checkbox + text + delete button)
- **TodoList**: Hiển thị danh sách todos hoặc empty state  
- **TodoSummary**: Tính statistics với local mutation

### State Management:
- **useState** để manage todos array và input
- **CRUD operations**: Create, Read, Update, Delete
- **Immutable updates**: Không mutate state trực tiếp

## 🔥 CÁCH THỰC HÀNH:

### Bước 1: Hoàn thành file thực hành
```javascript
// Mở: src/exercises/Exercise4_Practice_NoCSS.js
// Hoàn thành 4 functions:
// 1. TodoItem (pure component)
// 2. TodoList (pure component) 
// 3. TodoSummary (pure component + local mutation)
// 4. TodoAppPractice (main app với state)
```

### Bước 2: Test bài làm (đã setup sẵn)
```javascript
// App.js đã import TodoAppPractice
// Chạy npm start để test ngay
```

### Bước 3: Kiểm tra features
- ✅ Add todo mới
- ✅ Toggle completed status (checkbox)
- ✅ Delete todo
- ✅ View statistics (Total/Completed/Pending)
- ✅ Empty state message

### Bước 4: So sánh đáp án nếu cần
```javascript
// Sửa App.js import TodoAppAnswer để xem đáp án
import TodoAppAnswer from './exercises/Exercise4_Answer_NoCSS';
```

## 📊 KẾT QUẢ MONG MUỐN:

```
📝 Todo App (No CSS Version)

[Input field] [Add Todo button]
[Clear Completed button] (if có completed todos)

☑️ Learn React Pure Components [Delete]
☐ Build Todo App [Delete]  
☐ Master Local Mutation [Delete]
☑️ Practice useState hooks [Delete]

📊 Todo Summary
Total: 4    ✅ Completed: 2    ⏳ Pending: 2
Progress: 50%
```

## 🎯 ĐIỂM QUAN TRỌNG:

### 1. Pure Components:
```javascript
// ✅ TodoItem - Pure
function TodoItem({ todo, onToggle, onDelete }) {
  // Same todo object → Same JSX
  return <li>...</li>;
}

// ✅ TodoSummary - Pure với Local Mutation
function TodoSummary({ todos }) {
  const stats = { total: 0, completed: 0 }; // ✅ Local object
  for(let i = 0; i < todos.length; i++) {
    stats.total++; // ✅ Safe mutation
  }
  return <div>{stats.total}</div>;
}
```

### 2. State Management:
```javascript
// ✅ Immutable Updates
setTodos([...todos, newTodo]);              // Add
setTodos(todos.map(t => t.id === id ? {...t, completed: !t.completed} : t)); // Update
setTodos(todos.filter(t => t.id !== id));   // Delete
```

### 3. Event Handlers:
```javascript
// ✅ Side effects trong event handlers là OK
const handleSubmit = (e) => {
  e.preventDefault(); // ✅ Side effect OK
  addTodo();         // ✅ State update OK
};
```

## 🚨 LỖI THƯỜNG GẶP:

### 1. **Mutate state trực tiếp**
```javascript
// ❌ SAI
todos.push(newTodo);
setTodos(todos);

// ✅ ĐÚNG  
setTodos([...todos, newTodo]);
```

### 2. **Quên key prop**
```javascript
// ❌ SAI
{todos.map(todo => <TodoItem todo={todo} />)}

// ✅ ĐÚNG
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
```

### 3. **Không handle empty state**
```javascript
// ❌ SAI
return <ul>{todos.map(...)}</ul>;

// ✅ ĐÚNG
if (todos.length === 0) return <p>No todos</p>;
return <ul>{todos.map(...)}</ul>;
```

## 💡 TIPS THỰC HÀNH:

1. **Bắt đầu với TodoItem**: Component đơn giản nhất
2. **Test từng component**: Console.log props để debug
3. **Form handling**: Nhớ preventDefault() và clear input
4. **Local mutation**: Chỉ mutate objects/arrays được tạo trong component
5. **Immutable updates**: Luôn dùng spread operator cho state

## 🎮 THÁCH THỨC THÊM (Optional):

1. **Filter todos**: All/Active/Completed tabs
2. **Edit todos**: Double-click để edit text
3. **Drag & drop**: Reorder todos
4. **Local storage**: Save todos to browser
5. **Due dates**: Add date picker

Chúc bạn thực hành thành công! 🎉
