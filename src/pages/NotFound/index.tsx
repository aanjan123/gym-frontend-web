import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="not-found-container">
      <div className="not-found-background">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      <div className="grid-overlay"></div>

      <div className={`not-found-content ${isVisible ? 'visible' : ''}`}>
        <div className="not-found-header">
          <div className="error-code-wrapper">
            <div className="error-code">404</div>
            <div className="error-code-glow"></div>
          </div>

          <div className="error-title-group">
            <h1 className="error-title">Page Not Found</h1>
            <div className="title-underline"></div>
            <p className="error-subtitle">
              The page you're looking for has ventured into uncharted territory
            </p>
          </div>
        </div>

        {/* Description section */}
        <div className="not-found-description">
          <div className="description-card">
            <div className="description-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <p className="description-text">
              It seems like the page you're trying to access doesn't exist or has been moved.
              Don't worry, we've got you covered with some helpful options below.
            </p>
          </div>
        </div>

        <div className="not-found-actions">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            <span className="btn-content">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Return Home</span>
            </span>
            <div className="btn-shimmer"></div>
          </button>

          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            <span className="btn-content">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span style={{ color: 'white' }}>Go Back</span>
            </span>
          </button>
        </div>
      </div>

      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
    </div>
  );
};