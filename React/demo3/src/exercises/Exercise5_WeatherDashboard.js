import { useState } from 'react';

// Bài tập 5: Weather Dashboard - Tổng hợp tất cả kiến thức
// Tạo ứng dụng dashboard thời tiết hoàn chỉnh

// Mock data
const weatherData = {
  "Hanoi": { temp: 28, humidity: 80, condition: "Rainy" },
  "Ho Chi Minh": { temp: 32, humidity: 75, condition: "Sunny" },
  "Da Nang": { temp: 30, humidity: 70, condition: "Cloudy" },
  "Can Tho": { temp: 29, humidity: 85, condition: "Rainy" }
};

// TODO: Tạo pure component WeatherCard
function WeatherCard({ city, weather }) {
  // TODO:
  // 1. Hiển thị tên thành phố
  // 2. Hiển thị nhiệt độ, độ ẩm, tình trạng thời tiết
  // 3. Tính và hiển thị Fahrenheit từ Celsius (local computation)
  // 4. Chọn icon/color dựa trên condition (local computation)
  // 5. ĐẢM BẢO pure!
  
  return (
    <div>
      {/* TODO: Implement WeatherCard */}
    </div>
  );
}

// TODO: Tạo pure component WeatherSummary
function WeatherSummary({ cities, weatherData }) {
  // TODO:
  // 1. Tính nhiệt độ trung bình của tất cả thành phố
  // 2. Tìm thành phố nóng nhất, lạnh nhất
  // 3. Đếm số thành phố theo từng condition
  // 4. Sử dụng local mutation để tính toán
  // 5. Component phải pure
  
  return (
    <div>
      {/* TODO: Implement WeatherSummary */}
    </div>
  );
}

// TODO: Tạo pure component CitySelector
function CitySelector({ cities, selectedCities, onCityToggle }) {
  // TODO:
  // 1. Hiển thị danh sách tất cả thành phố
  // 2. Có checkbox cho mỗi thành phố
  // 3. Gọi onCityToggle khi user click (event handler)
  // 4. Component phải pure
  
  return (
    <div>
      {/* TODO: Implement CitySelector */}
    </div>
  );
}

export default function WeatherDashboard() {
  const [selectedCities, setSelectedCities] = useState(["Hanoi", "Ho Chi Minh"]);
  const allCities = Object.keys(weatherData);

  // ✅ Side effects chỉ trong event handlers
  const handleCityToggle = (city) => {
    // TODO: Implement toggle city logic
    console.log(`Toggling city: ${city}`); // Side effect OK ở đây
  };

  const handleRefreshData = () => {
    // TODO: Mock refresh weather data
    console.log('Refreshing weather data...'); // Side effect OK ở đây
    alert('Weather data refreshed!');
  };

  // TODO: Filter weather data dựa trên selected cities (pure computation)
  const filteredWeatherData = {};

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🌤️ Weather Dashboard</h1>
      
      <button onClick={handleRefreshData} style={{ marginBottom: '20px' }}>
        🔄 Refresh Data
      </button>

      {/* TODO: Add CitySelector component */}
      {/* TODO: Add WeatherSummary component */}
      
      <h2>Selected Cities Weather</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
        {/* TODO: Render WeatherCard cho mỗi selected city */}
      </div>

      {/* Debugging info */}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Debug Info:</h3>
        <p>Selected Cities: {selectedCities.join(', ')}</p>
        <p>Total Cities: {allCities.length}</p>
      </div>
    </div>
  );
}

// TODO: REQUIREMENTS CHECKLIST:
// □ Tất cả components phải pure
// □ Không có side effects trong render
// □ Sử dụng local mutation khi cần thiết
// □ Side effects chỉ trong event handlers
// □ Components có thể reuse được
// □ Same input → same output
// □ Không thay đổi props/external variables
