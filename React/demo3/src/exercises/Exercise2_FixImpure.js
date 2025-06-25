// Bài tập 2: Fix Impure Component
// Component dưới đây có vấn đề về purity, hãy sửa lại

import './Exercise2_FixImpure.css';

// ❌ XÓA BIẾN GLOBAL - không cần nữa
// let totalScore = 0; 

// ✅ PURE COMPONENT - chỉ hiển thị thông tin của 1 player
function ScoreCard({ playerName, points }) {
  return (
    <div className="score-card" data-player={playerName}>
      <h3>Player: {playerName}</h3>
      <p>Points: <span className="points-display">{points}</span></p>
    </div>
  );
}

// ✅ PURE COMPONENT - tính total ở đây
function GameBoard() {
  // Tạo data array trong component (local data)
  const players = [
    { name: "Alice", points: 10 },
    { name: "Bob", points: 15 },
    { name: "Charlie", points: 8 }
  ];
  
  // Tính total score bằng pure calculation
  const totalScore = players.reduce((sum, player) => sum + player.points, 0);
  
  return (
    <div className="game-board-container">
      <h1>🎮 Game Scores</h1>
      
      {/* Hiển thị total score */}
      <div className="total-score-section">
        <h2>🏆 Total Score: {totalScore}</h2>
        <p>👥 Number of Players: {players.length}</p>
        <p>📊 Average Score: {Math.round(totalScore / players.length)}</p>
      </div>
      
      {/* Render từng player */}
      <div className="players-grid">
        {players.map(player => (
          <ScoreCard 
            key={player.name}
            playerName={player.name} 
            points={player.points} 
          />
        ))}
      </div>
    </div>
  );
}

// ✅ HOÀN THÀNH: 
// 1. ✅ Sửa component ScoreCard để trở thành pure
// 2. ✅ Tính total score đúng cách với reduce()
// 3. ✅ Đảm bảo component không có side effects
// 4. ✅ Sử dụng array.map() để render danh sách
// 5. ✅ Local data thay vì global variables

export default GameBoard;
