// server.js - Express server for Vite SPA
// Tested and working version for Node.js v18+
// Run: node server.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`\n📊 Starting server in ${NODE_ENV} mode on port ${PORT}...\n`);

// ============================================
// Middleware - Security Headers
// ============================================

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

// ============================================
// Static Files Middleware
// ============================================

const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath, {
  maxAge: NODE_ENV === 'production' ? '1d' : '0',
  etag: false,
}));

// ============================================
// Logging Middleware
// ============================================

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

// ============================================
// Health Check Endpoint
// ============================================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// API Routes (if you add any in future)
// ============================================

// Example: app.use('/api', apiRoutes);

// ============================================
// SPA Fallback - MUST BE LAST
// ============================================

app.use((req, res) => {
  const indexPath = path.join(distPath, 'index.html');

  // Set headers for HTML
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  // Send index.html
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error(`❌ Error serving ${indexPath}:`, err.message);
      res.status(500).send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Error</title>
            <style>
              body { font-family: sans-serif; padding: 2rem; }
              h1 { color: #d32f2f; }
            </style>
          </head>
          <body>
            <h1>500 - Internal Server Error</h1>
            <p>Could not load the application.</p>
            <p><small>${NODE_ENV === 'production' ? 'Check server logs.' : err.message}</small></p>
          </body>
        </html>
      `);
    }
  });
});

// ============================================
// Start Server
// ============================================

const server = app.listen(PORT, () => {
  const startTime = new Date().toISOString();
  console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║         ✅ Vite SPA Server Started                ║
║                                                    ║
╚════════════════════════════════════════════════════╝

📊 Server Information:
   🚀 Port: ${PORT}
   🌍 Environment: ${NODE_ENV}
   📁 Serving from: ${distPath}
   ⏰ Started: ${startTime}

✨ Features:
   ✅ SPA routing (all URLs serve index.html)
   ✅ Static file caching
   ✅ Security headers
   ✅ Health check endpoint

🧪 Test URLs:
   GET http://localhost:${PORT}/
   GET http://localhost:${PORT}/admin/dashboard
   GET http://localhost:${PORT}/owner/members
   GET http://localhost:${PORT}/health

🔍 Logs:
   Request logs will appear below...

════════════════════════════════════════════════════
  `);
});

// ============================================
// Graceful Shutdown
// ============================================

process.on('SIGTERM', () => {
  console.log('\n📛 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n📛 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

export default app;