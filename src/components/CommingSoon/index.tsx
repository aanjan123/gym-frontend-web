import React, { useEffect, useRef } from 'react';

const ComingSoon: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --primary: #2563eb;
          --primary-light: #3b82f6;
          --primary-glow: rgba(37, 99, 235, 0.15);
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #f1f5f9;
          --text-primary: #0f172a;
          --text-secondary: #475569;
          --text-tertiary: #94a3b8;
          --border: #e2e8f0;
          --success: #10b981;
          --radius-md: 0.5rem;
          --radius-lg: 0.75rem;
          --radius-xl: 1rem;
          --font-sans: 'Plus Jakarta Sans', sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cs-root {
          font-family: var(--font-sans);
          background: var(--bg-primary);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cs-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        /* Decorative blobs */
        .cs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .cs-blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.08), transparent 70%);
          top: -150px;
          right: -100px;
        }

        .cs-blob-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.06), transparent 70%);
          bottom: -120px;
          left: -80px;
        }

        /* Grid pattern overlay */
        .cs-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        .cs-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          animation: slideUp 0.6s ease-out both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cs-icon-wrap {
          width: 96px;
          height: 96px;
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          box-shadow:
            0 20px 40px rgba(37, 99, 235, 0.25),
            0 0 0 1px rgba(37, 99, 235, 0.1);
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 20px 40px rgba(37, 99, 235, 0.25), 0 0 0 1px rgba(37, 99, 235, 0.1); }
          50% { box-shadow: 0 20px 60px rgba(37, 99, 235, 0.4), 0 0 0 8px rgba(37, 99, 235, 0.06); }
        }

        .cs-icon-wrap svg {
          color: white;
        }

        .cs-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.875rem;
          background: var(--primary-glow);
          border: 1px solid rgba(37, 99, 235, 0.2);
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.25rem;
        }

        .cs-badge-dot {
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          animation: blink 1.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .cs-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .cs-title span {
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cs-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          max-width: 440px;
        }

        /* Progress card */
        .cs-card {
          width: 100%;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 1.75rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 24px rgba(15, 23, 42, 0.06);
          animation: slideUp 0.6s ease-out 0.15s both;
        }

        .cs-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .cs-card-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cs-card-pct {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--primary);
        }

        .cs-progress-track {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .cs-progress-fill {
          height: 100%;
          width: 72%;
          background: linear-gradient(90deg, var(--primary-light), var(--primary));
          border-radius: 9999px;
          animation: growBar 1.2s ease-out 0.4s both;
          transform-origin: left;
        }

        @keyframes growBar {
          from { width: 0; }
          to { width: 72%; }
        }

        .cs-steps {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .cs-step {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .cs-step-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.7rem;
        }

        .cs-step-done .cs-step-icon {
          background: rgba(16, 185, 129, 0.12);
          color: var(--success);
        }

        .cs-step-done {
          color: var(--text-primary);
          font-weight: 500;
        }

        .cs-step-pending .cs-step-icon {
          background: var(--primary-glow);
          color: var(--primary);
        }

        /* Notify row */
        .cs-notify {
          display: flex;
          gap: 0.625rem;
          width: 100%;
          animation: slideUp 0.6s ease-out 0.3s both;
        }

        .cs-notify input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          font-family: var(--font-sans);
          color: var(--text-primary);
          background: var(--bg-primary);
          transition: all 0.2s ease;
        }

        .cs-notify input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .cs-notify input::placeholder {
          color: var(--text-tertiary);
        }

        .cs-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          color: white;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .cs-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
        }

        .cs-btn:active {
          transform: translateY(0);
        }

        .cs-back {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s ease;
          margin-top: 1.5rem;
          background: none;
          border: none;
          font-family: var(--font-sans);
          animation: slideUp 0.6s ease-out 0.4s both;
        }

        .cs-back:hover {
          color: var(--primary);
        }

        @media (max-width: 480px) {
          .cs-title { font-size: 1.875rem; }
          .cs-notify { flex-direction: column; }
          .cs-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="cs-root">
        <canvas ref={canvasRef} className="cs-canvas" />
        <div className="cs-blob cs-blob-1" />
        <div className="cs-blob cs-blob-2" />
        <div className="cs-grid" />

        <div className="cs-content">
          {/* Icon */}
          <div className="cs-icon-wrap">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Badge */}
          <div className="cs-badge">
            <span className="cs-badge-dot" />
            In Development
          </div>

          {/* Title */}
          <h1 className="cs-title">
            Feature Coming <span>Soon</span>
          </h1>

          <p className="cs-subtitle">
            We're working hard to bring you this feature. Stay tuned — it'll be worth the wait.
          </p>

          {/* Progress card */}
          <div className="cs-card">
            <div className="cs-card-header">
              <span className="cs-card-label">Development Progress</span>
              <span className="cs-card-pct">72%</span>
            </div>

            <div className="cs-progress-track">
              <div className="cs-progress-fill" />
            </div>

            <div className="cs-steps">
              {[
                { label: 'Design & Planning', done: true },
                { label: 'Backend Development', done: true },
                { label: 'Frontend Integration', done: true },
                { label: 'Testing & QA', done: false },
                { label: 'Launch', done: false },
              ].map((step) => (
                <div key={step.label} className={`cs-step ${step.done ? 'cs-step-done' : 'cs-step-pending'}`}>
                  <div className="cs-step-icon">
                    {step.done ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                      </svg>
                    )}
                  </div>
                  {step.label}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="cs-notify">
            <input type="email" placeholder="Enter your email to get notified" />
            <button className="cs-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Notify Me
            </button>
          </div> */}

          {/* <button className="cs-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Dashboard
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ComingSoon;