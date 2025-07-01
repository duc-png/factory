import { useState } from 'react';

export default function UserForm() {
    // ✅ Object state cho form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
        hobbies: [],
        bio: ''
    });

    // ✅ Separate states cho UI
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // ✅ Available hobbies
    const availableHobbies = ['Đọc sách', 'Du lịch', 'Âm nhạc', 'Thể thao', 'Game', 'Nấu ăn'];

    // ✅ Handle input changes
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    // ✅ Handle hobby checkbox changes
    function handleHobbyChange(hobby) {
        setFormData(prev => ({
            ...prev,
            hobbies: prev.hobbies.includes(hobby)
                ? prev.hobbies.filter(h => h !== hobby)
                : [...prev.hobbies, hobby]
        }));
    }

    // ✅ Validate form
    function validateForm() {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Tên không được để trống';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.age || formData.age < 1 || formData.age > 120) {
            newErrors.age = 'Tuổi phải từ 1-120';
        }

        if (!formData.gender) {
            newErrors.gender = 'Vui lòng chọn giới tính';
        }

        return newErrors;
    }

    // ✅ Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitted(true);
        setErrors({});
        // Simulate API call
        setTimeout(() => {
            alert('Form đã được gửi thành công!');
            setIsSubmitted(false);
        }, 2000);
    }

    // ✅ Reset form
    function handleReset() {
        setFormData({
            name: '',
            email: '',
            age: '',
            gender: '',
            hobbies: [],
            bio: ''
        });
        setErrors({});
        setIsSubmitted(false);
        setShowPreview(false);
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>📝 React State Demo: User Form</h1>

            <form onSubmit={handleSubmit}>
                {/* Name input */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Họ tên:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: errors.name ? '2px solid #dc3545' : '1px solid #ddd',
                            fontSize: '16px'
                        }}
                        placeholder="Nhập họ tên của bạn"
                    />
                    {errors.name && <p style={{ color: '#dc3545', margin: '5px 0 0 0' }}>{errors.name}</p>}
                </div>

                {/* Email input */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: errors.email ? '2px solid #dc3545' : '1px solid #ddd',
                            fontSize: '16px'
                        }}
                        placeholder="Nhập email của bạn"
                    />
                    {errors.email && <p style={{ color: '#dc3545', margin: '5px 0 0 0' }}>{errors.email}</p>}
                </div>

                {/* Age input */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Tuổi:
                    </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: errors.age ? '2px solid #dc3545' : '1px solid #ddd',
                            fontSize: '16px'
                        }}
                        placeholder="Nhập tuổi của bạn"
                    />
                    {errors.age && <p style={{ color: '#dc3545', margin: '5px 0 0 0' }}>{errors.age}</p>}
                </div>

                {/* Gender radio buttons */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Giới tính:
                    </label>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {['Nam', 'Nữ', 'Khác'].map(gender => (
                            <label key={gender} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    checked={formData.gender === gender}
                                    onChange={handleInputChange}
                                    style={{ marginRight: '5px' }}
                                />
                                {gender}
                            </label>
                        ))}
                    </div>
                    {errors.gender && <p style={{ color: '#dc3545', margin: '5px 0 0 0' }}>{errors.gender}</p>}
                </div>

                {/* Hobbies checkboxes */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Sở thích:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {availableHobbies.map(hobby => (
                            <label key={hobby} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.hobbies.includes(hobby)}
                                    onChange={() => handleHobbyChange(hobby)}
                                    style={{ marginRight: '5px' }}
                                />
                                {hobby}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Bio textarea */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Giới thiệu bản thân:
                    </label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                            fontSize: '16px',
                            resize: 'vertical'
                        }}
                        placeholder="Viết vài dòng giới thiệu về bản thân..."
                    />
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button
                        type="submit"
                        disabled={isSubmitted}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: isSubmitted ? '#6c757d' : '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: isSubmitted ? 'not-allowed' : 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {isSubmitted ? 'Đang gửi...' : 'Gửi form'}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {showPreview ? 'Ẩn' : 'Xem'} preview
                    </button>
                </div>
            </form>

            {/* Preview section */}
            {showPreview && (
                <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px',
                    marginBottom: '20px'
                }}>
                    <h3>👀 Preview dữ liệu:</h3>
                    <ul>
                        <li><strong>Tên:</strong> {formData.name || 'Chưa nhập'}</li>
                        <li><strong>Email:</strong> {formData.email || 'Chưa nhập'}</li>
                        <li><strong>Tuổi:</strong> {formData.age || 'Chưa nhập'}</li>
                        <li><strong>Giới tính:</strong> {formData.gender || 'Chưa chọn'}</li>
                        <li><strong>Sở thích:</strong> {formData.hobbies.length > 0 ? formData.hobbies.join(', ') : 'Chưa chọn'}</li>
                        <li><strong>Giới thiệu:</strong> {formData.bio || 'Chưa viết'}</li>
                    </ul>
                </div>
            )}

            {/* State explanation */}
            <div style={{
                padding: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px'
            }}>
                <h3>🔍 Giải thích Complex State:</h3>
                <ul>
                    <li><strong>formData:</strong> Object state chứa tất cả dữ liệu form</li>
                    <li><strong>errors:</strong> Object chứa thông báo lỗi cho từng field</li>
                    <li><strong>isSubmitted:</strong> Boolean để hiển thị trạng thái đang gửi</li>
                    <li><strong>showPreview:</strong> Boolean để toggle preview</li>
                    <li><strong>Tại sao dùng Object state?</strong> Dữ liệu liên quan nhau nên nhóm lại</li>
                    <li><strong>Spread operator:</strong> &#123;...prev, [name]: value&#125; để update object immutably</li>
                </ul>
            </div>
        </div>
    );
}
