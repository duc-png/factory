// 🎯 MENU BÀI TẬP THỰC HÀNH LOCAL MUTATION
// Chọn bài thực hành bạn muốn làm

import Challenge1 from './Exercise3_Challenge1_Discount';
import Challenge2 from './Exercise3_Challenge2_Categories'; 
import Challenge3 from './Exercise3_Challenge3_ECommerce';

function ChallengeMenu({ onSelectChallenge }) {
  const challenges = [
    {
      id: 1,
      title: "🎯 Challenge 1: Shopping Cart với Discount",
      level: "⭐ Beginner+",
      description: "Thêm tính năng giảm giá, tính tổng tiền trước và sau giảm giá",
      techniques: ["for loop", "array.push()", "discount calculation", "conditional rendering"],
      component: Challenge1
    },
    {
      id: 2, 
      title: "🎯 Challenge 2: Categories & Tax Calculation",
      level: "⭐⭐ Intermediate",
      description: "Group products theo category, tính tax, nested object mutation",
      techniques: ["nested objects", "dynamic properties", "multiple arrays", "for...in loop"],
      component: Challenge2
    },
    {
      id: 3,
      title: "🎯 Challenge 3: Mini E-commerce Store", 
      level: "⭐⭐⭐ Advanced",
      description: "Search, filter, sort products, complex business logic",
      techniques: ["complex filtering", "search algorithms", "multiple conditions", "real-world patterns"],
      component: Challenge3
    }
  ];
  
  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px" }}>
      <h1>🚀 LOCAL MUTATION - BÀI TẬP THỰC HÀNH NÂNG CAO</h1>
      <p style={{ fontSize: "18px", color: "#666" }}>
        Chọn một thách thức để thực hành Local Mutation từ cơ bản đến nâng cao!
      </p>
      
      <div style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
        {challenges.map(challenge => (
          <div 
            key={challenge.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px", 
              padding: "25px",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onClick={() => onSelectChallenge(challenge.component)}
            onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, color: "#007bff" }}>{challenge.title}</h3>
              <span style={{ 
                backgroundColor: "#007bff", 
                color: "white", 
                padding: "5px 12px", 
                borderRadius: "20px",
                fontSize: "14px"
              }}>
                {challenge.level}
              </span>
            </div>
            
            <p style={{ margin: "15px 0", fontSize: "16px", lineHeight: "1.6" }}>
              {challenge.description}
            </p>
            
            <div style={{ marginTop: "15px" }}>
              <strong>🔧 Kỹ thuật:</strong>
              <div style={{ marginTop: "8px" }}>
                {challenge.techniques.map(tech => (
                  <span 
                    key={tech}
                    style={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6", 
                      padding: "4px 8px",
                      margin: "2px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      display: "inline-block"
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ 
              marginTop: "20px", 
              textAlign: "center",
              color: "#007bff",
              fontWeight: "bold"
            }}>
              👆 Click để bắt đầu thách thức!
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: "40px", 
        padding: "20px", 
        backgroundColor: "#e8f4fd", 
        borderRadius: "10px" 
      }}>
        <h3>📚 Hướng dẫn sử dụng:</h3>
        <ol>
          <li><strong>Chọn thách thức:</strong> Click vào card để chọn bài tập</li>
          <li><strong>Chạy code:</strong> npm start để xem kết quả</li>
          <li><strong>Thực hành:</strong> Đọc code, hiểu logic, thử modify</li>
          <li><strong>Nâng cao:</strong> Làm từ Challenge 1 → 2 → 3</li>
        </ol>
        
        <h4>🎯 Mục tiêu học tập:</h4>
        <ul>
          <li>✅ Master Local Mutation patterns</li>
          <li>✅ Complex data manipulation</li>
          <li>✅ Real-world business logic</li>
          <li>✅ Pure Components best practices</li>
        </ul>
      </div>
    </div>
  );
}

export default function PracticeMenu() {
  let selectedChallenge = null;
  
  const handleSelectChallenge = (ChallengeComponent) => {
    selectedChallenge = ChallengeComponent;
    // Trong thực tế sẽ dùng useState để re-render
    console.log("Selected challenge:", ChallengeComponent.name);
  };
  
  // Simulate challenge selection (trong thực tế dùng state)
  if (selectedChallenge) {
    const ChallengeComponent = selectedChallenge;
    return <ChallengeComponent />;
  }
  
  return <ChallengeMenu onSelectChallenge={handleSelectChallenge} />;
}

/* 
🚀 CÁCH SỬ DỤNG:

1. CHẠY MENU:
   - Sửa App.js import PracticeMenu từ file này
   - npm start để xem menu

2. CHẠY TỪNG CHALLENGE:
   - Sửa App.js import trực tiếp:
   - import Challenge1 from './exercises/Exercise3_Challenge1_Discount';
   - import Challenge2 from './exercises/Exercise3_Challenge2_Categories';
   - import Challenge3 from './exercises/Exercise3_Challenge3_ECommerce';

3. THỰC HÀNH:
   - Bắt đầu từ Challenge 1 (dễ nhất)
   - Hiểu code và local mutation patterns
   - Thử modify để học sâu hơn

Chúc bạn thực hành thành công! 🎉
*/
