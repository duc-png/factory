import React, { useState, useRef, useEffect, useCallback } from 'react';
import './EventsExercise3.css';

// 🎯 Component 1: Photo Gallery với Keyboard Navigation
function PhotoGallery() {
  const [photos] = useState([
    { id: 1, url: 'https://picsum.photos/400/300?random=1', title: 'Nature Landscape' },
    { id: 2, url: 'https://picsum.photos/400/300?random=2', title: 'City Architecture' },
    { id: 3, url: 'https://picsum.photos/400/300?random=3', title: 'Ocean View' },
    { id: 4, url: 'https://picsum.photos/400/300?random=4', title: 'Mountain Peak' },
    { id: 5, url: 'https://picsum.photos/400/300?random=5', title: 'Forest Path' },
    { id: 6, url: 'https://picsum.photos/400/300?random=6', title: 'Desert Sunset' }
  ]);

  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openFullscreen = (photo, index) => {
    setFullscreenPhoto(photo);
    setCurrentIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenPhoto(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setCurrentIndex(newIndex);
    setFullscreenPhoto(photos[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setFullscreenPhoto(photos[newIndex]);
  };

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.href = fullscreenPhoto.url;
    link.download = `${fullscreenPhoto.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenPhoto) return;

      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    if (fullscreenPhoto) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [fullscreenPhoto, currentIndex]);

  return (
    <div className="photo-gallery">
      <h3>🖼️ Photo Gallery</h3>
      
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="photo-item"
            onClick={() => openFullscreen(photo, index)}
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              loading="lazy"
            />
            <div className="photo-overlay">
              <h4>{photo.title}</h4>
              <p>Click to enlarge</p>
            </div>
          </div>
        ))}
      </div>

      {fullscreenPhoto && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{fullscreenPhoto.title}</h3>
              <button className="close-btn" onClick={closeFullscreen}>❌</button>
            </div>
            
            <div className="modal-body">
              <button className="nav-btn prev-btn" onClick={goToPrevious}>
                ← Previous
              </button>
              
              <img 
                src={fullscreenPhoto.url} 
                alt={fullscreenPhoto.title}
                className="fullscreen-image"
              />
              
              <button className="nav-btn next-btn" onClick={goToNext}>
                Next →
              </button>
            </div>
            
            <div className="modal-footer">
              <button className="download-btn" onClick={downloadPhoto}>
                💾 Download
              </button>
              <p className="keyboard-hint">
                Use ← → keys to navigate, ESC to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 🎯 Component 2: Real-time Search với Debouncing
function SmartSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem('recentSearches') || '[]')
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const searchData = [
    'React Hooks', 'React Hook Form', 'React Hook State',
    'JavaScript ES6', 'JavaScript Promises', 'JavaScript Async',
    'HTML5 Canvas', 'HTML5 Web APIs', 'HTML5 Semantic',
    'CSS Grid', 'CSS Flexbox', 'CSS Animations',
    'Node.js Express', 'Node.js APIs', 'Node.js MongoDB',
    'TypeScript React', 'TypeScript Interfaces', 'TypeScript Generics'
  ];

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery.trim() === '') {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const filtered = searchData.filter(item =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    setSelectedIndex(-1);
    
    // Add to recent searches
    const newRecentSearches = [
      suggestion,
      ...recentSearches.filter(item => item !== suggestion)
    ].slice(0, 5);
    setRecentSearches(newRecentSearches);
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <div className="smart-search">
      <h3>🔍 Smart Search</h3>
      
      <div className="search-container">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for React, JavaScript, HTML, CSS..."
            className="search-input"
          />
          {isLoading && <div className="loading-spinner">⏳</div>}
        </div>

        {suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => selectSuggestion(suggestion)}
              >
                🔍 {highlightMatch(suggestion, query)}
              </div>
            ))}
          </div>
        )}
      </div>

      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-header">
            <h4>Recent Searches:</h4>
            <button onClick={clearHistory} className="clear-btn">
              🗑️ Clear History
            </button>
          </div>
          <div className="recent-list">
            {recentSearches.map((search, index) => (
              <span
                key={index}
                className="recent-tag"
                onClick={() => setQuery(search)}
              >
                {search}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="search-hint">
        💡 Use ↑↓ arrows to navigate, Enter to select, ESC to close
      </div>
    </div>
  );
}

// 🎯 Component 3: Shopping Cart với Local Storage
function ShoppingCart() {
  const [products] = useState([
    { id: 1, name: 'iPhone 15 Pro', price: 999.99, image: '📱' },
    { id: 2, name: 'iPad Air', price: 599.99, image: '📱' },
    { id: 3, name: 'MacBook Air', price: 1299.99, image: '💻' },
    { id: 4, name: 'Apple Watch', price: 399.99, image: '⌚' },
    { id: 5, name: 'AirPods Pro', price: 249.99, image: '🎧' }
  ]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setCart([]);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setOrderComplete(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="shopping-cart">
      <h3>🛒 Shopping Cart</h3>
      
      <div className="cart-layout">
        <div className="products-section">
          <h4>Products:</h4>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.image}</div>
                <h5>{product.name}</h5>
                <p className="product-price">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-sidebar">
          <div className="cart-header">
            <h4>Cart ({getTotalItems()} items)</h4>
          </div>
          
          {orderComplete && (
            <div className="success-message">
              ✅ Order completed successfully!
            </div>
          )}

          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-image">{item.image}</span>
                    <div className="item-details">
                      <h6>{item.name}</h6>
                      <p>${item.price}</p>
                    </div>
                  </div>
                  
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="total-price">
                <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`checkout-btn ${isCheckingOut ? 'loading' : ''}`}
              >
                {isCheckingOut ? '⏳ Processing...' : '🛒 Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🎯 Component 4: Music Player Controls
function MusicPlayer() {
  const [songs] = useState([
    { id: 1, title: 'Summer Vibes', artist: 'Artist 1', duration: 215 },
    { id: 2, title: 'Night Drive', artist: 'Artist 2', duration: 198 },
    { id: 3, title: 'Ocean Waves', artist: 'Artist 3', duration: 267 },
    { id: 4, title: 'City Lights', artist: 'Artist 4', duration: 189 }
  ]);

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, one, all

  // Simulate playback
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= songs[currentSong].duration) {
            handleNext();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, songs]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(100, prev + 10));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 10));
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (repeatMode === 'one') {
      setCurrentTime(0);
      return;
    }

    let nextSong;
    if (isShuffled) {
      nextSong = Math.floor(Math.random() * songs.length);
    } else {
      nextSong = currentSong + 1;
      if (nextSong >= songs.length) {
        nextSong = repeatMode === 'all' ? 0 : songs.length - 1;
        if (repeatMode === 'none') setIsPlaying(false);
      }
    }
    setCurrentSong(nextSong);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    const prevSong = currentSong - 1;
    setCurrentSong(prevSong < 0 ? songs.length - 1 : prevSong);
    setCurrentTime(0);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = Math.floor(clickPosition * songs[currentSong].duration);
    setCurrentTime(newTime);
  };

  return (
    <div className="music-player">
      <h3>🎵 Music Player</h3>
      
      <div className="now-playing">
        <div className={`vinyl ${isPlaying ? 'spinning' : ''}`}>🎵</div>
        <div className="song-info">
          <h4>{songs[currentSong].title}</h4>
          <p>{songs[currentSong].artist}</p>
        </div>
      </div>

      <div className="player-controls">
        <button onClick={handlePrevious} className="control-btn">⏮️</button>
        <button onClick={togglePlayPause} className="control-btn play-btn">
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button onClick={handleStop} className="control-btn">⏹️</button>
        <button onClick={handleNext} className="control-btn">⏭️</button>
        
        <button
          onClick={() => setIsShuffled(!isShuffled)}
          className={`control-btn ${isShuffled ? 'active' : ''}`}
        >
          🔀
        </button>
        
        <button
          onClick={() => setRepeatMode(
            repeatMode === 'none' ? 'all' : 
            repeatMode === 'all' ? 'one' : 'none'
          )}
          className={`control-btn ${repeatMode !== 'none' ? 'active' : ''}`}
        >
          {repeatMode === 'one' ? '🔂' : '🔁'}
        </button>
      </div>

      <div className="progress-section">
        <span className="time">{formatTime(currentTime)}</span>
        <div 
          className="progress-bar"
          onClick={handleProgressClick}
        >
          <div 
            className="progress-fill"
            style={{
              width: `${(currentTime / songs[currentSong].duration) * 100}%`
            }}
          />
        </div>
        <span className="time">{formatTime(songs[currentSong].duration)}</span>
      </div>

      <div className="volume-section">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
          className="volume-slider"
        />
        <span>{volume}%</span>
      </div>

      <div className="keyboard-shortcuts">
        💡 Space: Play/Pause, ←→: Previous/Next, ↑↓: Volume
      </div>
    </div>
  );
}

// Utility function for debouncing
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 🎯 Main Exercise Component
function EventsExercise3() {
  return (
    <div className="events-exercise-3">
      <h2>🎯 Events Exercise 3: Side Effects & Real-world Applications</h2>
      
      <div className="exercise-grid">
        <PhotoGallery />
        <SmartSearch />
        <ShoppingCart />
        <MusicPlayer />
      </div>

      <div className="instructions">
        <h4>📝 Features Implemented:</h4>
        <ul>
          <li>✅ <strong>Photo Gallery</strong>: Keyboard navigation, lazy loading, download</li>
          <li>✅ <strong>Smart Search</strong>: Debouncing, keyboard navigation, localStorage</li>
          <li>✅ <strong>Shopping Cart</strong>: Real-time calculation, localStorage persistence</li>
          <li>✅ <strong>Music Player</strong>: Keyboard shortcuts, progress control, modes</li>
        </ul>
        
        <h4>🎯 Side Effects & APIs Used:</h4>
        <ul>
          <li><code>localStorage</code> - Data persistence</li>
          <li><code>setTimeout/clearTimeout</code> - Debouncing & delays</li>
          <li><code>document.addEventListener</code> - Global keyboard events</li>
          <li><code>useEffect</code> - Side effects management</li>
          <li><code>useCallback</code> - Performance optimization</li>
        </ul>
      </div>
    </div>
  );
}

export default EventsExercise3;
