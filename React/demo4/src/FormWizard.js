import React, { useState } from 'react';
import './FormWizard.css';

function FormWizard() {
  // State quản lý bước hiện tại
  const [currentStep, setCurrentStep] = useState(1);
  
  // State lưu trữ tất cả dữ liệu form
  const [formData, setFormData] = useState({
    // Bước 1: Thông tin cá nhân
    personal: {
      name: '',
      email: '',
      phone: '',
      age: ''
    },
    // Bước 2: Sở thích
    preferences: {
      hobbies: [],
      favoriteColor: '',
      newsletter: false
    },
    // Bước 3: Địa chỉ
    address: {
      street: '',
      city: '',
      country: ''
    }
  });

  // State quản lý lỗi validation
  const [errors, setErrors] = useState({});

  // State hiển thị loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Danh sách sở thích có sẵn
  const availableHobbies = [
    'Reading', 'Gaming', 'Cooking', 'Traveling', 
    'Photography', 'Music', 'Sports', 'Art'
  ];

  // TODO: Các function cần implement

  // 1. validateStep - Validate dữ liệu của bước hiện tại
  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        // Validate thông tin cá nhân
        if (!formData.personal.name.trim()) {
          newErrors.name = 'Tên không được để trống';
        }
        if (!formData.personal.email.trim()) {
          newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(formData.personal.email)) {
          newErrors.email = 'Email không hợp lệ';
        }
        if (!formData.personal.phone.trim()) {
          newErrors.phone = 'Số điện thoại không được để trống';
        }
        if (!formData.personal.age || formData.personal.age < 1) {
          newErrors.age = 'Tuổi phải lớn hơn 0';
        }
        break;
        
      case 2:
        // Validate sở thích
        if (formData.preferences.hobbies.length === 0) {
          newErrors.hobbies = 'Vui lòng chọn ít nhất một sở thích';
        }
        if (!formData.preferences.favoriteColor) {
          newErrors.favoriteColor = 'Vui lòng chọn màu yêu thích';
        }
        break;
        
      case 3:
        // Validate địa chỉ
        if (!formData.address.street.trim()) {
          newErrors.street = 'Địa chỉ không được để trống';
        }
        if (!formData.address.city.trim()) {
          newErrors.city = 'Thành phố không được để trống';
        }
        if (!formData.address.country.trim()) {
          newErrors.country = 'Quốc gia không được để trống';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 2. handleNext - Chuyển sang bước tiếp theo
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setErrors({}); // Clear errors khi chuyển bước
    }
  };

  // 3. handlePrevious - Quay về bước trước
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setErrors({}); // Clear errors khi quay lại
    }
  };

  // 4. handleInputChange - Cập nhật dữ liệu form
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear error cho field vừa được sửa
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // 5. handleHobbyChange - Xử lý thay đổi sở thích (checkbox)
  const handleHobbyChange = (hobby) => {
    const currentHobbies = formData.preferences.hobbies;
    let newHobbies;
    
    if (currentHobbies.includes(hobby)) {
      // Bỏ chọn
      newHobbies = currentHobbies.filter(h => h !== hobby);
    } else {
      // Thêm chọn
      newHobbies = [...currentHobbies, hobby];
    }
    
    handleInputChange('preferences', 'hobbies', newHobbies);
  };

  // 6. handleSubmit - Gửi form cuối cùng
  const handleSubmit = async () => {
    if (validateStep(3)) {
      setIsSubmitting(true);
      
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        alert('🎉 Form đã được gửi thành công!\n\n' + 
              `Tên: ${formData.personal.name}\n` +
              `Email: ${formData.personal.email}\n` +
              `Sở thích: ${formData.preferences.hobbies.join(', ')}\n` +
              `Địa chỉ: ${formData.address.street}, ${formData.address.city}`);
        
        // Reset form
        setCurrentStep(1);
        setFormData({
          personal: { name: '', email: '', phone: '', age: '' },
          preferences: { hobbies: [], favoriteColor: '', newsletter: false },
          address: { street: '', city: '', country: '' }
        });
        
      } catch (error) {
        alert('❌ Có lỗi xảy ra khi gửi form!');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 7. calculateProgress - Tính % hoàn thành
  const calculateProgress = () => {
    return ((currentStep - 1) / 2) * 100; // 3 bước = 0%, 50%, 100%
  };

  // Component cho bước 1: Thông tin cá nhân
  const renderStep1 = () => (
    <div className="step-content">
      <h3>📝 Bước 1: Thông tin cá nhân</h3>
      
      <div className="form-group">
        <label>Họ và tên *</label>
        <input
          type="text"
          value={formData.personal.name}
          onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
          placeholder="Nhập họ và tên"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={formData.personal.email}
          onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
          placeholder="example@email.com"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Số điện thoại *</label>
        <input
          type="tel"
          value={formData.personal.phone}
          onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
          placeholder="0123456789"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Tuổi *</label>
        <input
          type="number"
          value={formData.personal.age}
          onChange={(e) => handleInputChange('personal', 'age', parseInt(e.target.value) || '')}
          placeholder="25"
          min="1"
          max="120"
          className={errors.age ? 'error' : ''}
        />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>
    </div>
  );

  // Component cho bước 2: Sở thích
  const renderStep2 = () => (
    <div className="step-content">
      <h3>🎯 Bước 2: Sở thích</h3>
      
      <div className="form-group">
        <label>Sở thích * (chọn ít nhất 1)</label>
        <div className="hobbies-grid">
          {availableHobbies.map(hobby => (
            <label key={hobby} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.preferences.hobbies.includes(hobby)}
                onChange={() => handleHobbyChange(hobby)}
              />
              <span>{hobby}</span>
            </label>
          ))}
        </div>
        {errors.hobbies && <span className="error-message">{errors.hobbies}</span>}
      </div>

      <div className="form-group">
        <label>Màu yêu thích *</label>
        <select
          value={formData.preferences.favoriteColor}
          onChange={(e) => handleInputChange('preferences', 'favoriteColor', e.target.value)}
          className={errors.favoriteColor ? 'error' : ''}
        >
          <option value="">Chọn màu yêu thích</option>
          <option value="red">Đỏ</option>
          <option value="blue">Xanh dương</option>
          <option value="green">Xanh lá</option>
          <option value="yellow">Vàng</option>
          <option value="purple">Tím</option>
          <option value="orange">Cam</option>
        </select>
        {errors.favoriteColor && <span className="error-message">{errors.favoriteColor}</span>}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.preferences.newsletter}
            onChange={(e) => handleInputChange('preferences', 'newsletter', e.target.checked)}
          />
          <span>Đăng ký nhận bản tin email</span>
        </label>
      </div>
    </div>
  );

  // Component cho bước 3: Xem lại và địa chỉ
  const renderStep3 = () => (
    <div className="step-content">
      <h3>📍 Bước 3: Địa chỉ và xác nhận</h3>
      
      <div className="form-group">
        <label>Địa chỉ *</label>
        <input
          type="text"
          value={formData.address.street}
          onChange={(e) => handleInputChange('address', 'street', e.target.value)}
          placeholder="123 Đường ABC"
          className={errors.street ? 'error' : ''}
        />
        {errors.street && <span className="error-message">{errors.street}</span>}
      </div>

      <div className="form-group">
        <label>Thành phố *</label>
        <input
          type="text"
          value={formData.address.city}
          onChange={(e) => handleInputChange('address', 'city', e.target.value)}
          placeholder="Hồ Chí Minh"
          className={errors.city ? 'error' : ''}
        />
        {errors.city && <span className="error-message">{errors.city}</span>}
      </div>

      <div className="form-group">
        <label>Quốc gia *</label>
        <input
          type="text"
          value={formData.address.country}
          onChange={(e) => handleInputChange('address', 'country', e.target.value)}
          placeholder="Việt Nam"
          className={errors.country ? 'error' : ''}
        />
        {errors.country && <span className="error-message">{errors.country}</span>}
      </div>

      {/* Preview thông tin */}
      <div className="preview-section">
        <h4>📋 Xem lại thông tin</h4>
        <div className="preview-content">
          <div className="preview-group">
            <strong>Thông tin cá nhân:</strong>
            <p>Tên: {formData.personal.name}</p>
            <p>Email: {formData.personal.email}</p>
            <p>Điện thoại: {formData.personal.phone}</p>
            <p>Tuổi: {formData.personal.age}</p>
          </div>
          
          <div className="preview-group">
            <strong>Sở thích:</strong>
            <p>Hobbies: {formData.preferences.hobbies.join(', ') || 'Chưa chọn'}</p>
            <p>Màu yêu thích: {formData.preferences.favoriteColor || 'Chưa chọn'}</p>
            <p>Newsletter: {formData.preferences.newsletter ? 'Có' : 'Không'}</p>
          </div>
          
          <div className="preview-group">
            <strong>Địa chỉ:</strong>
            <p>{formData.address.street || 'Chưa nhập'}</p>
            <p>{formData.address.city || 'Chưa nhập'}</p>
            <p>{formData.address.country || 'Chưa nhập'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="form-wizard-container">
      <h2>📋 Multi-Step Form Wizard</h2>
      
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="step-indicators">
          {[1, 2, 3].map(step => (
            <div
              key={step}
              className={`step-indicator ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
            >
              {step < currentStep ? '✓' : step}
            </div>
          ))}
        </div>
        <p className="progress-text">
          Bước {currentStep} / 3 ({Math.round(calculateProgress())}% hoàn thành)
        </p>
      </div>

      {/* Form Content */}
      <div className="form-content">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>

      {/* Navigation Buttons */}
      <div className="form-navigation">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="btn btn-secondary"
        >
          ← Quay lại
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-primary"
          >
            Tiếp theo →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-success"
          >
            {isSubmitting ? 'Đang gửi...' : '🚀 Hoàn thành'}
          </button>
        )}
      </div>

      {/* Debug Panel */}
      <div className="debug-panel">
        <details>
          <summary>🔍 Debug Info (Click để mở)</summary>
          <pre>{JSON.stringify({ currentStep, formData, errors }, null, 2)}</pre>
        </details>
      </div>
    </div>
  );
}

export default FormWizard;
