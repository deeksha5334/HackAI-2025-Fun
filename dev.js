// dev.js (run with Node.js)
const { spawn } = require('child_process');
const path = require('path');

// Start Next.js app
const nextApp = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start Flask backend
const flaskApp = spawn('python', ['app.py'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, GOOGLE_API_KEY: 'your-api-key-here' }
});

process.on('SIGINT', () => {
  nextApp.kill('SIGINT');
  flaskApp.kill('SIGINT');
  process.exit();
});