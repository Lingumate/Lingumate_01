import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Lingumate servers...\n');

// Start handshake server
console.log('📡 Starting Handshake Server (Port 3001)...');
const handshakeServer = spawn('node', [join(__dirname, 'server', 'handshakeServer.js')], {
  stdio: 'inherit',
  env: { ...process.env, HANDSHAKE_PORT: '3001' }
});

// Start real-time translation server
console.log('🎤 Starting Real-time Translation Server (Port 3002)...');
const realtimeServer = spawn('node', [join(__dirname, 'server', 'realtimeTranslationServer.js')], {
  stdio: 'inherit',
  env: { ...process.env, REALTIME_TRANSLATION_PORT: '3002' }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  handshakeServer.kill('SIGINT');
  realtimeServer.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down servers...');
  handshakeServer.kill('SIGTERM');
  realtimeServer.kill('SIGTERM');
  process.exit(0);
});

// Handle server crashes
handshakeServer.on('close', (code) => {
  console.log(`❌ Handshake server exited with code ${code}`);
});

realtimeServer.on('close', (code) => {
  console.log(`❌ Real-time translation server exited with code ${code}`);
});

console.log('\n✅ Both servers are starting...');
console.log('📡 Handshake Server: http://localhost:3001');
console.log('🎤 Real-time Translation Server: ws://localhost:3002');
console.log('\n💡 Press Ctrl+C to stop both servers\n');
