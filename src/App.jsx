import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import cloudflareLogo from './assets/cloudflare.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('unknown')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [touchStartY, setTouchStartY] = useState(null)
  const [touchEndY, setTouchEndY] = useState(null)

  const totalSlides = 3

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index)
    }
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  // Touch gesture handlers
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchEndY(null)
    setTouchStart(e.targetTouches[0].clientX)
    setTouchStartY(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
    setTouchEndY(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distanceX = touchStart - touchEnd
    const distanceY = touchStartY - touchEndY
    
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isDownSwipe = distanceY < -minSwipeDistance
    
    // Use whichever swipe is more prominent
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (isLeftSwipe) {
        nextSlide()
      } else if (isRightSwipe) {
        prevSlide()
      }
    } else {
      // Vertical swipe
      if (isUpSwipe) {
        nextSlide()
      } else if (isDownSwipe) {
        prevSlide()
      }
    }
  }

  const slides = [
    // Slide 1: Title/Welcome
    <section key="slide-0" id="center" className="slide">
      <div className="hero">
        <img src={heroImg} className="base" width="170" height="179" alt="" />
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </div>
      <div>
        <h1>Get started with Cloudflare</h1>
        <p>
          Edit <code>src/App.jsx</code> or <code>worker/index.js</code> and save to test <code>HMR</code>
        </p>
      </div>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        <li>
          <button
            type="button"
            className="counter"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </li>
        <li>
          <button
            type="button"
            className="counter"
            onClick={() => {
              fetch('/api/')
                .then((res) => res.json())
                .then((data) => setName(data.name))
            }}
            aria-label='get name'
          >
            Name from API is: {name}
          </button>
        </li>
      </ul>
      
      <div className="nav-hint">
        <span className="nav-arrow">←</span>
        <span>Use arrows to navigate</span>
        <span className="nav-arrow">→</span>
      </div>
      <div className="swipe-hint">Swipe to navigate</div>
    </section>,

    // Slide 2: Documentation
    <section key="slide-1" id="next-steps" className="slide">
      <div id="docs">
        <svg className="icon" role="presentation" aria-hidden="true">
          <use href="/icons.svg#documentation-icon"></use>
        </svg>
        <h2>Documentation</h2>
        <p>Your questions, answered</p>
        <ul>
          <li>
            <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer">
              <img className="logo" src={viteLogo} alt="" />
              Explore Vite
            </a>
          </li>
          <li>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
              <img className="button-icon" src={reactLogo} alt="" />
              Learn more
            </a>
          </li>
          <li>
            <a href="https://workers.cloudflare.com/" target="_blank" rel="noopener noreferrer">
              <img className="button-icon" src={cloudflareLogo} alt="" />
              Workers Docs
            </a>
          </li>
        </ul>
      </div>
      <div id="social">
        <svg className="icon" role="presentation" aria-hidden="true">
          <use href="/icons.svg#social-icon"></use>
        </svg>
        <h2>Connect with us</h2>
        <p>Join the Vite community</p>
        <ul>
          <li>
            <a href="https://github.com/vitejs/vite" target="_blank" rel="noopener noreferrer">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#github-icon"></use>
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://chat.vite.dev/" target="_blank" rel="noopener noreferrer">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#discord-icon"></use>
              </svg>
              Discord
            </a>
          </li>
          <li>
            <a href="https://x.com/vite_js" target="_blank" rel="noopener noreferrer">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#x-icon"></use>
              </svg>
              X.com
            </a>
          </li>
          <li>
            <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noopener noreferrer">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#bluesky-icon"></use>
              </svg>
              Bluesky
            </a>
          </li>
        </ul>
      </div>
    </section>,

    // Slide 3: Spacer/End
    <section key="slide-2" id="spacer" className="slide">
      <div className="end-content">
        <h2>You're all set!</h2>
        <p>Start building with Cloudflare, Vite, and React</p>
      </div>
    </section>
  ]

  return (
    <div 
      className="slide-deck"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="slides-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides}
      </div>
      
      {/* Navigation dots */}
      <div className="nav-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            type="button"
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows - inline for mobile visibility */}
      <div className="nav-arrows-inline">
        <button 
          type="button"
          className="nav-arrow-inline prev" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          ← Prev
        </button>
        <button 
          type="button"
          className="nav-arrow-inline next" 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          aria-label="Next slide"
        >
          Next →
        </button>
      </div>

      {/* Slide counter */}
      <div className="slide-counter">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  )
}

export default App
