// Ví dụ 3: Local Mutation - Được phép!

function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

function TeaGathering() {
  // ✅ OK: Tạo array mới TRONG component
  const cups = [];
  
  // ✅ OK: Thay đổi array được tạo trong component này
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  
  return (
    <div>
      <h1>Tea Party for 12 guests</h1>
      {cups}
    </div>
  );
}

// Ví dụ khác: Tạo object mới
function UserProfile({ user }) {
  // ✅ OK: Tạo object mới trong component
  const displayInfo = {
    name: user.firstName + ' ' + user.lastName,
    initials: user.firstName[0] + user.lastName[0],
    age: new Date().getFullYear() - user.birthYear
  };
  
  return (
    <div>
      <h2>{displayInfo.name} ({displayInfo.initials})</h2>
      <p>Age: {displayInfo.age}</p>
    </div>
  );
}

export default function LocalMutationExample() {
  const sampleUser = {
    firstName: "John",
    lastName: "Doe", 
    birthYear: 1990
  };
  
  return (
    <div>
      <TeaGathering />
      <UserProfile user={sampleUser} />
    </div>
  );
}
