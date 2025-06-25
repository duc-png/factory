// File chính để demo tất cả ví dụ và bài tập về Pure Components

import PureExample1 from './examples/PureExample1';
import SideEffectExample from './examples/SideEffectExample';
import LocalMutationExample from './examples/LocalMutationExample';
import SideEffectsLocationExample from './examples/SideEffectsLocationExample';
import ClockExample from './examples/ClockExample';

// Import bài tập (commented out vì chưa hoàn thành)
import Exercise1 from './exercises/Exercise1_Calculator';
// import Exercise2 from './exercises/Exercise2_FixImpure';
// import Exercise3 from './exercises/Exercise3_LocalMutation';
// import Exercise4 from './exercises/Exercise4_TodoApp';
// import Exercise5 from './exercises/Exercise5_WeatherDashboard';

export default function PureComponentsLearning() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎯 Học về Pure Components trong React</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>📚 Lý thuyết và Ví dụ</h2>
        
        <div style={{ border: '1px solid #ddd', margin: '20px 0', padding: '20px' }}>
          <h3>1. Pure Component cơ bản</h3>
          <PureExample1 />
        </div>

        <div style={{ border: '1px solid #ddd', margin: '20px 0', padding: '20px' }}>
          <h3>2. Side Effects - Impure vs Pure</h3>
          <SideEffectExample />
        </div>

        <div style={{ border: '1px solid #ddd', margin: '20px 0', padding: '20px' }}>
          <h3>3. Local Mutation</h3>
          <LocalMutationExample />
        </div>

        <div style={{ border: '1px solid #ddd', margin: '20px 0', padding: '20px' }}>
          <h3>4. Nơi đúng cho Side Effects</h3>
          <SideEffectsLocationExample />
        </div>

        <div style={{ border: '1px solid #ddd', margin: '20px 0', padding: '20px' }}>
          <h3>5. Clock Challenge</h3>
          <ClockExample />
        </div>
      </section>

      <section>
        <h2>💪 Bài tập thực hành</h2>
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
          <h3>Danh sách bài tập:</h3>
          <ol>
            <li>
              <strong>Calculator Component</strong> - Tạo component tính toán thuần
              <br />
              <code>src/exercises/Exercise1_Calculator.js</code>
            </li>
            <li>
              <strong>Fix Impure Component</strong> - Sửa component có side effects
              <br />
              <code>src/exercises/Exercise2_FixImpure.js</code>
            </li>
            <li>
              <strong>Shopping Cart với Local Mutation</strong> - Sử dụng local mutation đúng cách
              <br />
              <code>src/exercises/Exercise3_LocalMutation.js</code>
            </li>
            <li>
              <strong>Todo App</strong> - Ứng dụng hoàn chỉnh với pure components
              <br />
              <code>src/exercises/Exercise4_TodoApp.js</code>
            </li>
            <li>
              <strong>Weather Dashboard</strong> - Tổng hợp tất cả kiến thức
              <br />
              <code>src/exercises/Exercise5_WeatherDashboard.js</code>
            </li>
          </ol>
          
          <h3>📝 Hướng dẫn làm bài:</h3>
          <ul>
            <li>Mở từng file bài tập và đọc TODO comments</li>
            <li>Implement theo yêu cầu, đảm bảo components pure</li>
            <li>Test bằng cách uncomment import trong file này</li>
            <li>Kiểm tra không có side effects trong render</li>
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>💪 Bài tập đã hoàn thành</h2>
        
        <div style={{ border: '2px solid #4caf50', margin: '20px 0', padding: '20px', borderRadius: '8px' }}>
          <h3>✅ Bài tập 1: Calculator Component</h3>
          <Exercise1 />
        </div>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>🎯 Tóm tắt Pure Components</h2>
        <div style={{ backgroundColor: '#e3f2fd', padding: '20px', borderRadius: '8px' }}>
          <h3>✅ Nguyên tắc Pure Component:</h3>
          <ul>
            <li><strong>Same input, same output</strong> - Cùng props thì cùng JSX</li>
            <li><strong>No side effects trong render</strong> - Không thay đổi bên ngoài</li>
            <li><strong>Local mutation OK</strong> - Được phép thay đổi objects/arrays tạo trong component</li>
            <li><strong>Side effects trong event handlers</strong> - onClick, onSubmit, etc.</li>
          </ul>
          
          <h3>❌ Tránh trong Pure Components:</h3>
          <ul>
            <li>Thay đổi biến global trong render</li>
            <li>Gọi API trong render</li>
            <li>Thay đổi DOM trực tiếp trong render</li>
            <li>Math.random(), Date.now() trong render</li>
            <li>Console.log trong render (chỉ để debug)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
