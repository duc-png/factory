// Ví dụ 2: Impure vs Pure Component

// ❌ IMPURE - Thay đổi biến global trong render
let guest = 0;

function ImpureCup() {
  // BAD: thay đổi biến đã tồn tại trước đó!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

function ImpureTeaSet() {
  return (
    <>
      <ImpureCup />
      <ImpureCup />
      <ImpureCup />
    </>
  );
}

// ✅ PURE - Truyền data qua props
function PureCup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

function PureTeaSet() {
  return (
    <>
      <PureCup guest={1} />
      <PureCup guest={2} />
      <PureCup guest={3} />
    </>
  );
}

export default function SideEffectExample() {
  return (
    <div>
      <h1>Impure Example (Sai)</h1>
      <ImpureTeaSet />
      
      <h1>Pure Example (Đúng)</h1>
      <PureTeaSet />
    </div>
  );
}
