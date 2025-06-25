// Ví dụ 1: Pure Component - Công thức toán học
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Đun sôi {drinkers} cốc nước.</li>
      <li>Thêm {drinkers} thìa trà và {0.5 * drinkers} thìa gia vị.</li>
      <li>Thêm {0.5 * drinkers} cốc sữa và đường theo ý thích.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Công thức Trà Chai</h1>
      <h2>Cho 2 người</h2>
      <Recipe drinkers={2} />
      <h2>Cho nhóm bạn</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
