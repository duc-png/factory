import React, { useState, useRef, useEffect } from 'react';
import './EventsExercise2.css';

// 🎯 Component 1: Nested Click Handlers
function NestedClicks() {
  const [stopPropagation, setStopPropagation] = useState(false);
  const [eventLog, setEventLog] = useState([]);

  const addToLog = (message) => {
    setEventLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearLog = () => {
    setEventLog([]);
  };

  const handleContainerClick = () => {
    addToLog("Container clicked");
  };

  const handleMiddleClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    addToLog("Middle clicked");
  };

  const handleButtonClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    addToLog("Button clicked");
  };

  return (
    <div className="nested-clicks">
      <h3>🎯 Nested Click Test</h3>
      
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={stopPropagation}
            onChange={(e) => setStopPropagation(e.target.checked)}
          />
          Stop Propagation
        </label>
        <button onClick={clearLog} className="btn btn-small">Clear Log</button>
      </div>

      <div className="nested-container" onClick={handleContainerClick}>
        <div className="outer-label">Outer Container</div>
        <div className="middle-box" onClick={handleMiddleClick}>
          <div className="middle-label">Middle Box</div>
          <button className="inner-button" onClick={handleButtonClick}>
            Inner Button
          </button>
        </div>
      </div>

      <div className="event-log">
        <h4>Event Log:</h4>
        <div className="log-content">
          {eventLog.length === 0 ? (
            <p>Click the nested elements to see event propagation...</p>
          ) : (
            eventLog.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// 🎯 Component 2: Custom Context Menu
function CustomContextMenu() {
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const menuRef = useRef();

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent default browser context menu
    setContextMenu({
      show: true,
      x: e.pageX,
      y: e.pageY
    });
  };

  const handleMenuAction = (action) => {
    alert(`${action} clicked!`);
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const closeMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  // Handle click outside and ESC key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (contextMenu.show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [contextMenu.show]);

  return (
    <div className="custom-context-menu">
      <h3>🖱️ Custom Context Menu</h3>
      
      <div className="product-card" onContextMenu={handleContextMenu}>
        <div className="card-image">📱</div>
        <h4>iPhone 15 Pro</h4>
        <p>$999.99</p>
        <p className="hint">Right-click để mở context menu</p>
      </div>

      {contextMenu.show && (
        <div
          ref={menuRef}
          className="context-menu"
          style={{
            position: 'absolute',
            left: contextMenu.x,
            top: contextMenu.y
          }}
        >
          <div className="menu-item" onClick={() => handleMenuAction('Edit')}>
            ✏️ Edit
          </div>
          <div className="menu-item" onClick={() => handleMenuAction('Delete')}>
            🗑️ Delete
          </div>
          <div className="menu-item" onClick={() => handleMenuAction('Copy')}>
            📋 Copy
          </div>
          <div className="menu-item" onClick={() => handleMenuAction('Share')}>
            📤 Share
          </div>
        </div>
      )}
    </div>
  );
}

// 🎯 Component 3: Form Validation System
function ValidatedForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Invalid email address' : '';
      case 'phone':
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return !phoneRegex.test(value) ? 'Phone format: 123-456-7890' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // Check if form is valid
    const isValid = Object.keys(newErrors).length === 0 && 
                   Object.values(formData).every(value => value.trim() !== '');

    if (isValid) {
      alert('Form submitted successfully!');
      setIsSubmitted(true);
      // Reset form
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSubmitted(false);
        setErrors({});
      }, 2000);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
                     Object.values(formData).every(value => value.trim() !== '') &&
                     Object.values(errors).every(error => error === '');

  return (
    <div className="validated-form">
      <h3>📝 Form Validation</h3>
      
      {isSubmitted && (
        <div className="success-message">✅ Form submitted successfully!</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={errors.name ? 'error' : formData.name ? 'valid' : ''}
          />
          {errors.name && <span className="error-text">❌ {errors.name}</span>}
          {!errors.name && formData.name && <span className="valid-text">✅</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={errors.email ? 'error' : formData.email && !errors.email ? 'valid' : ''}
          />
          {errors.email && <span className="error-text">❌ {errors.email}</span>}
          {!errors.email && formData.email && <span className="valid-text">✅</span>}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="123-456-7890"
            className={errors.phone ? 'error' : formData.phone && !errors.phone ? 'valid' : ''}
          />
          {errors.phone && <span className="error-text">❌ {errors.phone}</span>}
          {!errors.phone && formData.phone && <span className="valid-text">✅</span>}
        </div>

        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={errors.message ? 'error' : formData.message && !errors.message ? 'valid' : ''}
          />
          {errors.message && <span className="error-text">❌ {errors.message}</span>}
          {!errors.message && formData.message && <span className="valid-text">✅</span>}
        </div>

        <button 
          type="submit" 
          className={`btn ${isFormValid ? 'btn-primary' : 'btn-disabled'}`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>

      <div className="form-hint">
        💡 Press Enter in any field to submit, or click Submit button
      </div>
    </div>
  );
}

// 🎯 Component 4: Drag & Drop Kanban
function MiniKanban() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, text: 'Task 1: Learn React' },
      { id: 2, text: 'Task 2: Practice Events' }
    ],
    inprogress: [
      { id: 3, text: 'Task 3: Build Components' }
    ],
    done: [
      { id: 4, text: 'Task 4: Deploy App' }
    ]
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, column) => {
    e.preventDefault();
    setDragOverColumn(column);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    
    if (!draggedTask || draggedTask.sourceColumn === targetColumn) {
      setDragOverColumn(null);
      return;
    }

    setTasks(prev => {
      const newTasks = { ...prev };
      
      // Remove from source column
      newTasks[draggedTask.sourceColumn] = newTasks[draggedTask.sourceColumn]
        .filter(task => task.id !== draggedTask.task.id);
      
      // Add to target column
      newTasks[targetColumn] = [...newTasks[targetColumn], draggedTask.task];
      
      return newTasks;
    });

    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const columns = [
    { key: 'todo', title: 'To Do', color: '#ff6b6b' },
    { key: 'inprogress', title: 'In Progress', color: '#4ecdc4' },
    { key: 'done', title: 'Done', color: '#45b7d1' }
  ];

  return (
    <div className="mini-kanban">
      <h3>📋 Mini Kanban</h3>
      
      <div className="kanban-board">
        {columns.map(column => (
          <div
            key={column.key}
            className={`kanban-column ${dragOverColumn === column.key ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, column.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.key)}
            style={{ borderColor: column.color }}
          >
            <div className="column-header" style={{ backgroundColor: column.color }}>
              <h4>{column.title}</h4>
              <span className="task-count">({tasks[column.key].length})</span>
            </div>
            
            <div className="column-content">
              {tasks[column.key].map(task => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column.key)}
                >
                  {task.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="kanban-hint">
        💡 Drag and drop tasks between columns
      </div>
    </div>
  );
}

// 🎯 Main Exercise Component
function EventsExercise2() {
  return (
    <div className="events-exercise-2">
      <h2>🎯 Events Exercise 2: Event Propagation & Advanced Events</h2>
      
      <div className="exercise-grid">
        <NestedClicks />
        <CustomContextMenu />
        <ValidatedForm />
        <MiniKanban />
      </div>

      <div className="instructions">
        <h4>📝 Features Implemented:</h4>
        <ul>
          <li>✅ <strong>Event Propagation</strong>: stopPropagation() control</li>
          <li>✅ <strong>Context Menu</strong>: preventDefault(), click outside, ESC key</li>
          <li>✅ <strong>Form Validation</strong>: Real-time validation, Enter key submit</li>
          <li>✅ <strong>Drag & Drop</strong>: Kanban board với visual feedback</li>
        </ul>
        
        <h4>🎯 Event Concepts Learned:</h4>
        <ul>
          <li><code>e.stopPropagation()</code> - Dừng event bubbling</li>
          <li><code>e.preventDefault()</code> - Ngăn default behavior</li>
          <li><code>onContextMenu</code> - Right-click events</li>
          <li><code>onDragStart, onDragOver, onDrop</code> - Drag & Drop</li>
          <li><code>document.addEventListener</code> - Global events</li>
        </ul>
      </div>
    </div>
  );
}

export default EventsExercise2;
