// 🧪 TEST FILE - ĐỂ ĐẢM BẢO IMPORT ĐÚNG
import { useState } from 'react';

export default function TodoAppTest() {
  const [todos, setTodos] = useState([
    { id: 1, text: "✅ BÀI 4 - TODO APP ĐÃ CHẠY THÀNH CÔNG!", completed: false }
  ]);

  return (
    <div style={{ padding: "20px", fontSize: "18px" }}>
      <h1>🎉 THÀNH CÔNG! ĐÂY LÀ BÀI 4 - TODO APP</h1>
      <p style={{ color: "green", fontWeight: "bold", fontSize: "20px" }}>
        Bạn đã import đúng file Exercise4_Practice_NoCSS.js!
      </p>
      
      <div style={{ backgroundColor: "#e8f5e8", padding: "15px", marginTop: "20px" }}>
        <h3>📝 Todo List Test:</h3>
        {todos.map(todo => (
          <div key={todo.id} style={{ fontSize: "16px", margin: "10px 0" }}>
            ✓ {todo.text}
          </div>
        ))}
      </div>
      
      <div style={{ backgroundColor: "#fff3cd", padding: "15px", marginTop: "20px" }}>
        <p><strong>🔧 Bước tiếp theo:</strong></p>
        <p>1. Nếu bạn thấy message này → Import đã đúng!</p>
        <p>2. Bây giờ có thể thay thế bằng code Todo App thật</p>
        <p>3. Hoặc dùng file Exercise4_Answer_NoCSS.js để xem đáp án</p>
      </div>
    </div>
  );
}
