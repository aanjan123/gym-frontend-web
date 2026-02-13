import { ArrowRight, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

export const NotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="not-found-container">
      <div
        className="gradient-orb"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      <div className="not-found-content">
        <div className="not-found-header">
          <div className="error-code-large">404</div>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-subtitle">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="not-found-illustration">
          <div className="illustration-wrapper">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="404-text">
              <span className="digit">4</span>
              <span className="zero">0</span>
              <span className="digit">4</span>
            </div>
          </div>
        </div>

        <div className="not-found-actions">
          <a href="/" className="btn btn-primary">
            <Home size={20} />
            Back to Home
          </a>
          <a href="/help" className="btn btn-secondary">
            Get Help
            <ArrowRight size={20} />
          </a>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .not-found-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
          position: relative;
          overflow: hidden;
        }

        .gradient-orb {
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          transition: all 0.1s ease-out;
        }

        .not-found-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 2rem;
          max-width: 600px;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .not-found-header {
          margin-bottom: 3rem;
        }

        .error-code-large {
          font-size: 6rem;
          font-weight: 900;
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          animation: pulse 2s ease-in-out infinite;
        }

        .not-found-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #171717;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .not-found-subtitle {
          font-size: 1.125rem;
          color: #525252;
          line-height: 1.6;
          margin: 0;
        }

        .not-found-illustration {
          margin-bottom: 3rem;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .illustration-wrapper {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-shape {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          background: #2563eb;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          background: #1e40af;
          border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          animation-delay: -2s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          background: #3b82f6;
          border-radius: 30% 30% 70% 70% / 30% 70% 70% 30%;
          animation-delay: -4s;
        }

        .404-text {
          position: relative;
          z-index: 5;
          font-size: 4rem;
          font-weight: 900;
          color: #2563eb;
          display: flex;
          gap: 0.5rem;
          letter-spacing: 0.1em;
        }

        .digit {
          display: inline-block;
          animation: bounce 1s ease-in-out infinite;
        }

        .digit:nth-child(1) {
          animation-delay: 0s;
        }

        .digit:nth-child(3) {
          animation-delay: 0.2s;
        }

        .zero {
          display: inline-block;
          animation: rotate 2s linear infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes rotate {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        .not-found-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .btn-primary {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #2563eb;
          border: 2px solid #e5e5e5;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .btn-secondary:hover {
          border-color: #2563eb;
          background: #fafafa;
          transform: translateY(-2px);
        }
        code {
          background: #f5f5f5;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Monaco', 'Menlo', monospace;
          color: #1e40af;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .error-code-large {
            font-size: 4rem;
          }

          .not-found-title {
            font-size: 1.875rem;
          }

          .not-found-subtitle {
            font-size: 1rem;
          }

          .404-text {
            font-size: 3rem;
          }

          .not-found-actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .not-found-content {
            padding: 1.5rem;
          }

          .not-found-header {
            margin-bottom: 2rem;
          }

          .not-found-illustration {
            margin-bottom: 2rem;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}