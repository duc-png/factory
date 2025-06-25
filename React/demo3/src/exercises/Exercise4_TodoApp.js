import { useState } from 'react';
import './Exercise4_TodoApp.css';

// Bài tập 4: To-Do App với Pure Components
// Tạo ứng dụng To-Do list hoàn chỉnh tuân thủ nguyên tắc Pure Components

/**
 * ✅ PURE COMPONENT - TodoItem
 * Nhiệm vụ: Hiển thị 1 todo item với checkbox và delete button
 * Props: { todo, onToggle, onDelete }
 * Tại sao pure: Same props → Same JSX, không có side effects
 */
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* Checkbox để toggle completed/pending */}
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)} // ✅ Event handler - side effects OK
      />
      
      {/* Text hiển thị với style conditional */}
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      
      {/* Delete button */}
      <button
        className="delete-button"
        onClick={() => onDelete(todo.id)} // ✅ Event handler - side effects OK
        title="Delete todo"
      >
        🗑️ Delete
      </button>
    </li>
  );
}

/**
 * ✅ PURE COMPONENT - TodoList  
 * Nhiệm vụ: Render danh sách todos hoặc empty state
 * Props: { todos, onToggle, onDelete }
 * Tại sao pure: Chỉ render dựa trên props, không thay đổi external data
 */
function TodoList({ todos, onToggle, onDelete }) {
  // Kiểm tra empty state
  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <div className="todo-list-header">
          <h2>📝 Todo List</h2>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p>No todos yet. Add one above!</p>
        </div>
      </div>
    );
  }

  // Render danh sách todos
  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <h2>📝 Todo List ({todos.length} items)</h2>
      </div>
      <ul className="todo-items">
        {/* ✅ Pure rendering: map over todos array */}
        {todos.map(todo => (
          <TodoItem
            key={todo.id} // ✅ Required React key for list
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * ✅ PURE COMPONENT - TodoStats
 * Nhiệm vụ: Tính và hiển thị thống kê todos (sử dụng Local Mutation)
 * Props: { todos }
 * Tại sao pure: Local mutation OK, same todos → same stats
 */
function TodoStats({ todos }) {
  // ✅ LOCAL MUTATION - Tạo object mới TRONG component
  const stats = {
    total: 0,
    completed: 0,
    pending: 0
  };

  // ✅ LOCAL MUTATION - Loop và thay đổi object vừa tạo (OK!)
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    stats.total++; // Mutation object local
    
    if (todo.completed) {
      stats.completed++; // Mutation object local
    } else {
      stats.pending++; // Mutation object local
    }
  }

  // ✅ Pure calculation result
  return (
    <div className="todo-stats">
      <h2>📊 Todo Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 🔄 MAIN COMPONENT - TodoApp (có state, không pure nhưng OK)
 * Nhiệm vụ: Quản lý state và event handlers cho toàn bộ app
 * State: todos array, inputText string
 */
export default function TodoApp() {
  // ✅ React useState hooks
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build Todo App", completed: false },
    { id: 3, text: "Master Pure Components", completed: true }
  ]);
  const [inputText, setInputText] = useState('');

  /**
   * ✅ EVENT HANDLER - Side effects được phép ở đây
   * Nhiệm vụ: Thêm todo mới vào state
   */
  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevent form submission
    
    if (inputText.trim()) { // Validate input
      // Tạo todo object mới
      const newTodo = {
        id: Date.now(), // Simple unique ID generation
        text: inputText.trim(),
        completed: false
      };
      
      // ✅ Side effect: Update state (OK trong event handler)
      setTodos([...todos, newTodo]); // Immutable update
      setInputText(''); // Reset input
    }
  };

  /**
   * ✅ EVENT HANDLER - Toggle completed status
   * Nhiệm vụ: Thay đổi completed của todo có id tương ứng
   */
  const handleToggleTodo = (id) => {
    // ✅ Side effect: Update state (OK trong event handler)
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed } // Immutable update
        : todo
    ));
  };

  /**
   * ✅ EVENT HANDLER - Delete todo
   * Nhiệm vụ: Xóa todo khỏi state
   */
  const handleDeleteTodo = (id) => {
    // ✅ Side effect: Update state (OK trong event handler)
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-app-container">
      <h1>✅ Pure Components Todo App</h1>
      
      {/* Form để thêm todo mới */}
      <form className="add-todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todo-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} // ✅ Event handler
          placeholder="Add new todo..."
        />
        <button type="submit" className="add-button">
          ➕ Add Todo
        </button>
      </form>

      {/* ✅ Sử dụng Pure Component TodoStats */}
      <TodoStats todos={todos} />
      
      {/* ✅ Sử dụng Pure Component TodoList */}
      <TodoList 
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

/**
 * 📝 TÓM TẮT PURE COMPONENTS RULES ĐƯỢC ÁP DỤNG:
 * 
 * ✅ TodoItem: Same props → Same JSX
 * ✅ TodoList: Same todos → Same list rendering  
 * ✅ TodoStats: Same todos → Same stats (Local Mutation OK)
 * 
 * ✅ Side effects chỉ trong event handlers:
 *    - handleAddTodo: setTodos, setInputText
 *    - handleToggleTodo: setTodos  
 *    - handleDeleteTodo: setTodos
 *    - onChange events: setInputText
 * 
 * ✅ Local Mutation trong TodoStats:
 *    - stats object được tạo MỚI mỗi render
 *    - Thay đổi stats object không ảnh hưởng bên ngoài
 *    - Pure vì same todos → same stats calculation
 * 
 * ✅ Immutable Updates:
 *    - [...todos, newTodo] thay vì todos.push()
 *    - todos.map() thay vì todos[i] = 
 *    - todos.filter() thay vì todos.splice()
 */
