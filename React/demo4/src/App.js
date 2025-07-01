import './App.css';
import ColorPicker from './ColorPicker';
import FormWizard from './FormWizard';
import ProductCRUD from './ProductCRUD';
import EventsExercise1 from './EventsExercise1';
import EventsExercise2 from './EventsExercise2';
import EventsExercise3 from './EventsExercise3';
import { useState } from 'react';

function App() {
  const [currentExercise, setCurrentExercise] = useState(6);

  const exercises = [
    { id: 1, title: 'Color Picker Interactive', component: <ColorPicker /> },
    { id: 2, title: 'Multi-Step Form Wizard', component: <FormWizard /> },
    { id: 3, title: 'Product CRUD System', component: <ProductCRUD /> },
    { id: 4, title: 'Events Exercise 1 - Click Counter', component: <EventsExercise1 /> },
    { id: 5, title: 'Events Exercise 2 - Advanced Events', component: <EventsExercise2 /> },
    { id: 6, title: 'Events Exercise 3 - Side Effects & Real-world', component: <EventsExercise3 /> }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React Interactivity Practice</h1>
        <p>Bài tập {currentExercise}: {exercises.find(ex => ex.id === currentExercise)?.title}</p>
        
        <div className="exercise-switcher">
          {exercises.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => setCurrentExercise(exercise.id)}
              className={`exercise-btn ${currentExercise === exercise.id ? 'active' : ''}`}
            >
              Bài {exercise.id}
            </button>
          ))}
        </div>
      </header>
      
      <main>
        {exercises.find(ex => ex.id === currentExercise)?.component}
      </main>
    </div>
  );
}

export default App;
