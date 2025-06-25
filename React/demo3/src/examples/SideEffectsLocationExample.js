import { useState } from 'react';

// Ví dụ 4: Nơi đúng để đặt Side Effects

function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ SAI: Side effect trong render
  // console.log('Rendering counter'); // Đừng làm thế này!
  
  // ✅ ĐÚNG: Side effect trong event handler
  const handleClick = () => {
    console.log('Button clicked!'); // OK - trong event handler
    setCount(count + 1);
  };
  
  const handleReset = () => {
    console.log('Counter reset!'); // OK - trong event handler
    setCount(0);
  };
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleClick}>Increment</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // ✅ ĐÚNG: Side effect trong event handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Side effects OK ở đây:
    console.log('Form submitted:', { name, email });
    alert(`Thank you ${name}!`);
    
    // Reset form
    setName('');
    setEmail('');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default function SideEffectsExample() {
  return (
    <div>
      <h1>Side Effects trong Event Handlers</h1>
      <Counter />
      <ContactForm />
    </div>
  );
}
