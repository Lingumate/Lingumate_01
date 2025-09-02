#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔄 Restarting development server...');

// Kill any existing processes on the development port
const killProcess = spawn('npx', ['kill-port', '5000', '24678', '3000'], {
  stdio: 'inherit',
  shell: true
});

killProcess.on('close', (code) => {
  console.log(`✅ Killed processes on ports 5000, 24678, 3000 (exit code: ${code})`);
  
  // Wait a moment for ports to be freed
  setTimeout(() => {
    console.log('🚀 Starting development server...');
    
               const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
      cwd: __dirname
    });
    
    devProcess.on('error', (error) => {
      console.error('❌ Failed to start development server:', error);
    });
    
    devProcess.on('close', (code) => {
      console.log(`Development server stopped (exit code: ${code})`);
    });
  }, 1000);
});
