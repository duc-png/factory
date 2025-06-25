import React from 'react';
import './ListExample1.css';

// Ví dụ 1: Hiển thị danh sách đơn giản
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

function ListExample1() {
  const listItems = people.map(person =>
    <li key={person}>{person}</li>
  );

  return (
    <div className="list-example1">
      <div className="list-example1__header">
        <h2 className="list-example1__title">📝 1. Basic List Rendering</h2>
        <p className="list-example1__description">
          <strong>Lý thuyết:</strong> Sử dụng <code>map()</code> để chuyển đổi mảng thành JSX elements
        </p>
      </div>
      
      <h3 className="list-example1__subtitle">Danh sách các nhà khoa học nổi tiếng:</h3>
      <ul className="list-example1__list">
        {listItems}
      </ul>
      
      <div className="list-example1__code-section">
        <h4 className="list-example1__code-title">💡 Code giải thích:</h4>
        <pre className="list-example1__code-block">
{`const people = ['item1', 'item2', 'item3'];

const listItems = people.map(person =>
  <li key={person}>{person}</li>
);

return <ul>{listItems}</ul>;`}
        </pre>
      </div>
    </div>
  );
}

export default ListExample1;
