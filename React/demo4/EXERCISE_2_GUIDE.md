# 📋 Bài Tập 2: Multi-Step Form Wizard

## 🎯 Mục tiêu
Tạo một form wizard có 3 bước với đầy đủ tính năng:
1. **Bước 1:** Thông tin cá nhân (name, email, phone, age)
2. **Bước 2:** Sở thích (hobbies checkboxes, favorite color, newsletter)
3. **Bước 3:** Địa chỉ và xem lại thông tin

## 🚀 Tính năng đã implement

### ✅ State Management
- **currentStep**: Quản lý bước hiện tại (1, 2, 3)
- **formData**: Object chứa tất cả dữ liệu form
- **errors**: Object chứa lỗi validation
- **isSubmitting**: Boolean cho loading state

### ✅ Navigation
- **handleNext()**: Chuyển sang bước tiếp theo (có validation)
- **handlePrevious()**: Quay về bước trước
- Disable nút "Quay lại" ở bước 1

### ✅ Validation
- **validateStep()**: Validate từng bước riêng biệt
- Real-time error clearing khi user sửa
- Required fields validation
- Email format validation
- Age range validation

### ✅ Form Handling
- **handleInputChange()**: Cập nhật nested object state
- **handleHobbyChange()**: Xử lý checkbox array
- Dynamic form rendering theo step

### ✅ UI/UX Features
- **Progress Bar**: Hiển thị % hoàn thành
- **Step Indicators**: Visual feedback cho từng bước
- **Preview Section**: Xem lại tất cả thông tin ở bước 3
- **Loading State**: Spinner khi submit
- **Responsive Design**: Mobile-friendly

## 🎨 CSS Features

### Animation & Effects
- ✨ **Smooth transitions** cho tất cả elements
- 🌈 **Gradient backgrounds** và button effects
- 📊 **Progress bar animation** với shimmer effect
- ✅ **Step completion animation** với checkmarks
- 🔄 **Loading spinner** khi submit
- 📱 **Responsive grid layouts**

### Visual Feedback
- 🚨 **Error states** với red borders và shake animation
- 💚 **Success states** với green colors
- 🎯 **Hover effects** trên tất cả interactive elements
- 🌟 **Focus states** với blue glow

## 🧠 Kiến thức React áp dụng

### 1. **Complex State Management**
```javascript
const [formData, setFormData] = useState({
  personal: { name: '', email: '', phone: '', age: '' },
  preferences: { hobbies: [], favoriteColor: '', newsletter: false },
  address: { street: '', city: '', country: '' }
});
```

### 2. **Nested State Updates**
```javascript
const handleInputChange = (section, field, value) => {
  setFormData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
};
```

### 3. **Array State Operations**
```javascript
const handleHobbyChange = (hobby) => {
  const currentHobbies = formData.preferences.hobbies;
  let newHobbies;
  
  if (currentHobbies.includes(hobby)) {
    newHobbies = currentHobbies.filter(h => h !== hobby);
  } else {
    newHobbies = [...currentHobbies, hobby];
  }
  
  handleInputChange('preferences', 'hobbies', newHobbies);
};
```

### 4. **Conditional Rendering**
```javascript
{currentStep === 1 && renderStep1()}
{currentStep === 2 && renderStep2()}
{currentStep === 3 && renderStep3()}
```

### 5. **Event Handling**
- `onChange` cho inputs
- `onClick` cho buttons và checkboxes
- `onSubmit` cho form submission
- Conditional `disabled` states

### 6. **Validation Logic**
```javascript
const validateStep = (step) => {
  const newErrors = {};
  
  switch (step) {
    case 1:
      if (!formData.personal.name.trim()) {
        newErrors.name = 'Tên không được để trống';
      }
      // ... more validations
      break;
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## 🎪 Demo các tính năng

### 1. **Form Navigation**
- Click "Tiếp theo" để chuyển bước (có validation)
- Click "Quay lại" để về bước trước
- Progress bar cập nhật theo bước

### 2. **Validation**
- Để trống required fields → Hiển thị lỗi
- Nhập email sai format → Lỗi email
- Nhập tuổi < 1 → Lỗi tuổi
- Không chọn sở thích → Lỗi ở bước 2

### 3. **Data Persistence**
- Dữ liệu được lưu khi chuyển bước
- Quay lại vẫn giữ nguyên dữ liệu đã nhập

### 4. **Preview**
- Bước 3 hiển thị tất cả thông tin đã nhập
- Layout đẹp với grid system

### 5. **Submit Flow**
- Click "Hoàn thành" → Loading 2s
- Hiển thị alert với thông tin
- Reset form về bước 1

## 🏆 Thử thách nâng cao (Optional)

### 1. **Local Storage Persistence**
```javascript
// Lưu draft vào localStorage
useEffect(() => {
  localStorage.setItem('formDraft', JSON.stringify(formData));
}, [formData]);

// Khôi phục draft khi load
useEffect(() => {
  const draft = localStorage.getItem('formDraft');
  if (draft) {
    setFormData(JSON.parse(draft));
  }
}, []);
```

### 2. **Custom Validation Rules**
```javascript
const validationRules = {
  personal: {
    name: { required: true, minLength: 2 },
    email: { required: true, pattern: /\S+@\S+\.\S+/ },
    phone: { required: true, pattern: /^\d{10,11}$/ },
    age: { required: true, min: 1, max: 120 }
  }
};
```

### 3. **Animation Cho Step Transitions**
```javascript
const [isTransitioning, setIsTransitioning] = useState(false);

const handleNext = () => {
  if (validateStep(currentStep)) {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsTransitioning(false);
    }, 300);
  }
};
```

### 4. **File Upload Field**
```javascript
// Thêm vào bước 1
<div className="form-group">
  <label>Avatar</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
  />
  {formData.personal.avatar && (
    <img src={formData.personal.avatar} alt="Preview" />
  )}
</div>
```

### 5. **API Integration**
```javascript
const handleSubmit = async () => {
  try {
    setIsSubmitting(true);
    
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      alert('✅ Form submitted successfully!');
      // Reset form
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    alert('❌ Error: ' + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

## 📚 Kiến thức mở rộng

### 1. **Form Libraries**
- **Formik**: Thư viện form phổ biến
- **React Hook Form**: Performance tốt hơn
- **Yup**: Schema validation

### 2. **State Management**
- **useReducer**: Cho complex state logic
- **Context API**: Share state across components
- **Redux**: Cho large applications

### 3. **Animation Libraries**
- **Framer Motion**: Smooth animations
- **React Spring**: Physics-based animations
- **React Transition Group**: Transition components

## 🎯 Bài tập thực hành

1. **Thêm bước 4**: Xác nhận OTP qua email
2. **Custom validation**: Tạo validation rules riêng
3. **Save draft**: Lưu form vào localStorage
4. **Animation**: Thêm transition giữa các bước
5. **File upload**: Thêm upload avatar
6. **Progress save**: Lưu progress vào database

Chúc bạn coding vui vẻ! 🚀
