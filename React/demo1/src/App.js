import './App.css';

// Ví dụ 1: If/Else Statement
function Item({name, isPacked}){
  if(isPacked) {
    return <li className='item'> {name}  ✅</li>
  }
  return <li className='item'>  {name} </li>
}


// Ví dụ 2: Ternary Operator (? :)
// function TernaryItem({ name, isPacked }) {
//   return (
//     <li className="item">
//       {isPacked ? (
//         <del>{name + ' ✅'}</del>
//       ) : (
//         name
//       )}
//     </li>
//   );
// }

function TernaryItem({name, isPacked}){
  return (
    <li className='item'>
      {isPacked ? (
        <del> {name + ' ✅'} </del>
      ) : (
        name
      )}
    </li>
  );
}

// Ví dụ 3: Logical AND Operator (&&)
function AndItem({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

// Ví dụ 4: Variable Assignment
function VariableItem({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✅"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

// Ví dụ 5: Conditional Return với null
function ConditionalItem({ name, isPacked, showPacked }) {
  if (isPacked && !showPacked) {
    return null; // Không render gì cả
  }
  return <li className="item">{name} {isPacked && '✅'}</li>;
}

// Ví dụ 6: Login/Logout Demo
function LoginDemo({ isLoggedIn, userName }) {
  if (isLoggedIn) {
    return (
      <div className="user-info">
        <h3>Chào mừng, {userName}!</h3>
        <button>Đăng xuất</button>
      </div>
    );
  }
  return (
    <div className="login-form">
      <h3>Vui lòng đăng nhập</h3>
      <button>Đăng nhập</button>
    </div>
  );
}

// Ví dụ 7: Message Counter (Cẩn thận với số 0)
function MessageCounter({ messageCount }) {
  return (
    <div>
      {/* Sai: sẽ hiển thị số 0 */}
      {/* {messageCount && <p>Bạn có {messageCount} tin nhắn mới</p>} */}
      
      {/* Đúng: chuyển về boolean */}
      {messageCount > 0 && <p>Bạn có {messageCount} tin nhắn mới</p>}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="demo-container">
        <h1>Conditional Rendering Examples</h1>
        
        {/* Ví dụ 1: If/Else */}
        <section>
          <h2>1. If/Else Statement</h2>
          <ul>
            <Item isPacked={true} name="Áo phao" />
            <Item isPacked={false} name="Ảnh gia đình" />
            <Item isPacked={true} name="Mũ bảo hiểm" />
          </ul>
        </section>

        {/* Ví dụ 2: Ternary Operator */}
        <section>
          <h2>2. Ternary Operator (? :)</h2>
          <ul>
            <TernaryItem isPacked={true} name="Áo phao" />
            <TernaryItem isPacked={false} name="Ảnh gia đình" />
            <TernaryItem isPacked={true} name="Mũ bảo hiểm" />
          </ul>
        </section>

        {/* Ví dụ 3: Logical AND */}
        <section>
          <h2>3. Logical AND (&&)</h2>
          <ul>
            <AndItem isPacked={true} name="Áo phao" />
            <AndItem isPacked={false} name="Ảnh gia đình" />
            <AndItem isPacked={true} name="Mũ bảo hiểm" />
          </ul>
        </section>

        {/* Ví dụ 4: Variable Assignment */}
        <section>
          <h2>4. Variable Assignment</h2>
          <ul>
            <VariableItem isPacked={true} name="Áo phao" />
            <VariableItem isPacked={false} name="Ảnh gia đình" />
            <VariableItem isPacked={true} name="Mũ bảo hiểm" />
          </ul>
        </section>

        {/* Ví dụ 5: Return null */}
        <section>
          <h2>5. Conditional Return (null)</h2>
          <p>Chỉ hiển thị items chưa pack:</p>
          <ul>
            <ConditionalItem isPacked={true} name="Áo phao" showPacked={false} />
            <ConditionalItem isPacked={false} name="Ảnh gia đình" showPacked={false} />
            <ConditionalItem isPacked={true} name="Mũ bảo hiểm" showPacked={false} />
          </ul>
        </section>

        {/* Ví dụ 6: Login Demo */}
        <section>
          <h2>6. Login/Logout Demo</h2>
          <LoginDemo isLoggedIn={true} userName="Nguyễn Văn A" />
          <br />
          <LoginDemo isLoggedIn={false} />
        </section>

        {/* Ví dụ 7: Message Counter */}
        <section>
          <h2>7. Message Counter (Cẩn thận với số 0)</h2>
          <MessageCounter messageCount={5} />
          <MessageCounter messageCount={0} />
        </section>
      </div>
    </div>
  );
}

export default App;
