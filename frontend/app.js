#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 3000;

console.log(`Starting Next.js on port ${port}`);

const next = spawn('node', [
  path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next'),
  'start',
  '-p',
  port.toString()
], {
  cwd: __dirname,
  stdio: 'inherit'
});

next.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});

next.on('exit', (code) => {
  console.log(`Next.js exited with code ${code}`);
  process.exit(code);
});
