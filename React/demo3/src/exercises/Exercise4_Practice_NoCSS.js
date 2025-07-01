// 📚 BÀI TẬP 4 THỰC HÀNH: TODO APP - PURE COMPONENTS (KHÔNG CSS)
// Bạn hãy code theo hướng dẫn từng bước bên dưới

import { useState } from 'react';

/* 
🎯 MỤC TIÊU:
- Tạo Todo App hoàn chỉnh với CRUD operations
- Thực hành Pure Components với complex state
- Sử dụng useState hooks
- Event handlers và state management
- Local mutation trong pure components
*/

/* 
📝 BƯỚC 1: TẠO COMPONENT TODOITEM (PURE COMPONENT)
Nhiệm vụ: Hiển thị 1 todo với checkbox và delete button

Gợi ý:
- Nhận props: todo, onToggle, onDelete
- Return JSX với <li>, <input type="checkbox">, <span>, <button>
- Event handlers: onChange={()=>onToggle(todo.id)}, onClick={()=>onDelete(todo.id)}
*/

// TODO: Viết function TodoItem ở đây
function TodoItem({ todo, onToggle, onDelete }) {
  // TODO: Return JSX
  return (
    <li>
      {/* TODO: Checkbox để toggle completed */}
      <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {/* TODO: Text hiển thị todo (có thể gạch ngang nếu completed) */}
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      
      {/* TODO: Delete button */}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}

/* 
📝 BƯỚC 2: TẠO COMPONENT TODOLIST (PURE COMPONENT)
Nhiệm vụ: Render danh sách todos hoặc empty message

Gợi ý:
- Nhận props: todos, onToggle, onDelete
- Kiểm tra if todos.length === 0 → return empty message
- Map qua todos và render TodoItem cho mỗi todo
*/

// TODO: Viết function TodoList ở đây
function TodoList({ todos, onToggle, onDelete }) {
  // TODO: Kiểm tra empty state
  if (todos.length === 0) {
    return <p>No todos yet. Add some tasks!</p>;
  }
  
  // TODO: Map qua todos và render TodoItem
  return (
    <ul>
      {/* TODO: Map todos thành TodoItem components */}
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

/* 
📝 BƯỚC 3: TẠO COMPONENT TODOSUMMARY (PURE COMPONENT)
Nhiệm vụ: Hiển thị thống kê todos

Gợi ý Local Mutation:
- Tạo object stats = { total: 0, completed: 0, pending: 0 }
- Loop qua todos và count từng loại
- Return JSX hiển thị stats
*/

// TODO: Viết function TodoSummary ở đây
function TodoSummary({ todos }) {
  // TODO: LOCAL MUTATION - Tạo stats object
  const stats = {
    total: 0,
    completed: 0, 
    pending: 0
  };
  
  // TODO: Loop và count
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    stats.total += 1;
    if (todo.completed) {
      stats.completed += 1;
    } else {
      stats.pending += 1;
    }
  }
  
  // TODO: Return JSX hiển thị stats
  return (
    <div>
      <h3>📊 Todo Summary</h3>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>
    </div>
  );
}

/* 
📝 BƯỚC 4: TẠO COMPONENT APP CHÍNH (STATEFUL COMPONENT)
Nhiệm vụ: Quản lý state và các functions

Gợi ý State Management:
- useState để lưu todos array
- useState để lưu newTodo string
- Tạo functions: addTodo, toggleTodo, deleteTodo
- Handle form submit
*/

// TODO: Viết export default function
export default function TodoAppPractice() {
  // TODO: BƯỚC 4.1 - Setup state
  const [todos, setTodos] = useState([
    // TODO: Thêm sample data để test
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build Todo App", completed: true },
    { id: 3, text: "Master Pure Components", completed: false }
  ]);
  
  const [newTodo, setNewTodo] = useState("");
  
  // TODO: BƯỚC 4.2 - Create functions
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    
    const todo = {
      id: Date.now(), // Simple ID generation
      text: newTodo,
      completed: false
    };
    
    setTodos([...todos, todo]); // Immutable update
    setNewTodo(""); // Clear input
  };
  
  const toggleTodo = (id) => {
    // TODO: Update todo completed status
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  const deleteTodo = (id) => {
    // TODO: Remove todo from array
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };
  
  // TODO: BƯỚC 4.3 - Return JSX
  return (
    <div>
      <h1>📝 Todo App (No CSS Version)</h1>
      
      {/* Form để add todo */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      
      {/* Hiển thị todos */}
      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      
      {/* Hiển thị summary */}
      <TodoSummary todos={todos} />
      
      {/* Thông tin demo */}
      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
        <p><strong>🎯 Pure Components Demo:</strong> TodoItem, TodoList, TodoSummary</p>
        <p>✅ Same props → Same output</p>
        <p>🔧 <strong>State management:</strong> useState, immutable updates</p>
        <p>🎮 <strong>Interactions:</strong> Add, Toggle, Delete todos</p>
      </div>
    </div>
  );
}

/* 
🔥 HƯỚNG DẪN THỰC HÀNH:

BƯỚC 1 - TodoItem:
✅ Pure component hiển thị 1 todo
✅ Checkbox để toggle completed
✅ Button để delete
✅ Style conditional (line-through nếu completed)

BƯỚC 2 - TodoList:
✅ Pure component hiển thị danh sách
✅ Empty state handling
✅ Map todos thành TodoItem components

BƯỚC 3 - TodoSummary:
✅ Pure component với local mutation
✅ Count total, completed, pending todos
✅ Display statistics

BƯỚC 4 - TodoAppPractice:
✅ State management với useState
✅ CRUD operations (Create, Read, Update, Delete)
✅ Form handling
✅ Immutable state updates

📊 KẾT QUẢ MONG MUỐN:
- Form để add todo mới
- Danh sách todos với checkbox và delete button
- Statistics: Total/Completed/Pending
- Toggle completed status
- Delete todos
- Pure components everywhere!

🎯 SAU KHI HOÀN THÀNH:
- Sửa App.js import TodoAppPractice
- Chạy npm start để test
- Thử add/toggle/delete todos
- Kiểm tra pure components hoạt động đúng
*/

/* 
💡 CONCEPTS QUAN TRỌNG:

🟢 PURE COMPONENTS:
- TodoItem: Cùng todo object → Cùng JSX
- TodoList: Cùng todos array → Cùng danh sách  
- TodoSummary: Cùng todos → Cùng statistics

🟢 LOCAL MUTATION (trong TodoSummary):
- stats object được tạo mới mỗi render
- Safe to mutate vì local scope
- Không ảnh hưởng external state

🟢 IMMUTABLE UPDATES:
- setTodos([...todos, newTodo]) // Add
- todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo) // Update
- todos.filter(todo => todo.id !== id) // Delete

🟢 EVENT HANDLERS:
- onSubmit, onChange, onClick
- Side effects trong event handlers là OK
- Pure components chỉ pure ở render function
*/
