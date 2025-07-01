// 📚 ĐÁP ÁN BÀI TẬP 4: TODO APP - PURE COMPONENTS (KHÔNG CSS)
// File này là đáp án, bạn hãy tự làm Exercise4_Practice_NoCSS.js trước!

import { useState } from 'react';

/* 
🎯 ĐÂY LÀ ĐÁПÁN HOÀN CHỈNH - CHỈ XEM SAU KHI TỰ LÀM!
*/

// BƯỚC 1: Pure Component hiển thị 1 todo
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li style={{ marginBottom: "8px", listStyle: "none" }}>
      <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        style={{ marginRight: "8px" }}
      />
      
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#888' : '#000',
        marginRight: "8px"
      }}>
        {todo.text}
      </span>
      
      <button 
        onClick={() => onDelete(todo.id)}
        style={{ 
          backgroundColor: "#ff4444", 
          color: "white", 
          border: "none", 
          padding: "4px 8px",
          cursor: "pointer"
        }}
      >
        🗑️ Delete
      </button>
    </li>
  );
}

// BƯỚC 2: Pure Component hiển thị danh sách todos
function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div style={{ 
        textAlign: "center", 
        color: "#666", 
        padding: "20px",
        border: "2px dashed #ccc"
      }}>
        <p>📝 No todos yet. Add some tasks to get started!</p>
      </div>
    );
  }
  
  return (
    <ul style={{ padding: 0 }}>
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

// BƯỚC 3: Pure Component với local mutation để tính statistics
function TodoSummary({ todos }) {
  // LOCAL MUTATION - Tạo stats object mới mỗi render
  const stats = {
    total: 0,
    completed: 0, 
    pending: 0
  };
  
  // Loop và mutate local object (safe)
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    stats.total += 1;
    if (todo.completed) {
      stats.completed += 1;
    } else {
      stats.pending += 1;
    }
  }
  
  return (
    <div style={{ 
      backgroundColor: "#f5f5f5", 
      padding: "15px", 
      borderRadius: "8px",
      marginTop: "20px"
    }}>
      <h3>📊 Todo Summary</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        <p><strong>Total:</strong> {stats.total}</p>
        <p><strong>✅ Completed:</strong> {stats.completed}</p>
        <p><strong>⏳ Pending:</strong> {stats.pending}</p>
      </div>
      {stats.total > 0 && (
        <p><strong>Progress:</strong> {Math.round((stats.completed / stats.total) * 100)}%</p>
      )}
    </div>
  );
}

// BƯỚC 4: Main App Component với state management
export default function TodoAppAnswer() {
  // State management
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React Pure Components", completed: true },
    { id: 2, text: "Build Todo App", completed: false },
    { id: 3, text: "Master Local Mutation", completed: false },
    { id: 4, text: "Practice useState hooks", completed: true }
  ]);
  
  const [newTodo, setNewTodo] = useState("");
  
  // CRUD Operations
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    
    const todo = {
      id: Date.now(), // Simple ID generation
      text: newTodo.trim(),
      completed: false
    };
    
    setTodos([...todos, todo]); // Immutable add
    setNewTodo(""); // Clear input
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed } // Immutable update
        : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); // Immutable delete
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };
  
  // Clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>📝 Todo App (No CSS Version)</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ 
            padding: "8px", 
            width: "70%", 
            marginRight: "8px",
            border: "1px solid #ccc"
          }}
        />
        <button 
          type="submit"
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none",
            cursor: "pointer"
          }}
        >
          ➕ Add Todo
        </button>
      </form>
      
      {/* Actions */}
      {todos.some(todo => todo.completed) && (
        <button 
          onClick={clearCompleted}
          style={{ 
            marginBottom: "20px",
            padding: "6px 12px",
            backgroundColor: "#ffc107",
            border: "none",
            cursor: "pointer"
          }}
        >
          🧹 Clear Completed
        </button>
      )}
      
      {/* Todo List */}
      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      
      {/* Summary Statistics */}
      <TodoSummary todos={todos} />
      
      {/* Demo Info */}
      <div style={{ 
        marginTop: "30px", 
        padding: "15px", 
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9"
      }}>
        <p><strong>🎯 Pure Components Demo:</strong> TodoItem, TodoList, TodoSummary</p>
        <p>✅ <strong>Pure:</strong> Same props → Same output (no side effects)</p>
        <p>🔧 <strong>State:</strong> useState hooks với immutable updates</p>
        <p>🎮 <strong>Features:</strong> Add, Toggle, Delete, Clear completed</p>
        <p>📊 <strong>Local Mutation:</strong> Safe object mutation trong TodoSummary</p>
      </div>
    </div>
  );
}

/* 
📝 GIẢI THÍCH ĐÁP ÁN:

🔥 PURE COMPONENTS TRONG BÀI NÀY:

1. TodoItem:
   - Input: { todo, onToggle, onDelete }
   - Output: JSX hiển thị todo với checkbox và button
   - Pure: Cùng todo object → Cùng JSX

2. TodoList:
   - Input: { todos, onToggle, onDelete }
   - Output: List of TodoItem hoặc empty message
   - Pure: Cùng todos array → Cùng danh sách

3. TodoSummary:
   - Input: { todos }
   - Output: Statistics JSX
   - Pure: Cùng todos → Cùng stats
   - Local Mutation: stats object được tạo mới mỗi render

🔥 STATE MANAGEMENT:

- useState([]) để lưu todos array
- useState("") để lưu input value
- Immutable updates: [...todos, newTodo], todos.map(), todos.filter()
- Event handlers handle side effects (OK trong pure components)

🔥 LOCAL MUTATION (Safe):

```javascript
const stats = { total: 0, completed: 0, pending: 0 };
for (let i = 0; i < todos.length; i++) {
  stats.total += 1; // ✅ Safe - local object
  if (todos[i].completed) {
    stats.completed += 1; // ✅ Safe - local mutation
  }
}
```

🔥 IMMUTABLE UPDATES (Required):

```javascript
// ✅ Add: Spread operator
setTodos([...todos, newTodo]);

// ✅ Update: Map with spread
setTodos(todos.map(todo => 
  todo.id === id ? {...todo, completed: !todo.completed} : todo
));

// ✅ Delete: Filter
setTodos(todos.filter(todo => todo.id !== id));
```

🔥 KẾT QUẢ MONG MUỐN:
- Input field để add todo
- Danh sách todos với checkbox và delete
- Statistics: Total, Completed, Pending, Progress %
- Button clear completed todos
- Pure components render đúng với props
*/
