# QR Handshake System Setup Guide

This guide explains how to set up and use the new QR handshake system for real-time bi-directional translation.

## Overview

The system has been split into two separate pages:
1. **QR Handshake Page** (`/qr-handshake`) - Handles room creation, PIN generation, and user connection
2. **Translation Page** (`/ble-translator`) - Handles the actual translation functionality

## Architecture

### Components
- **Frontend**: React + TypeScript with WebSocket client
- **Handshake Server**: Node.js WebSocket server for room management
- **Translation Server**: Existing server for translation services

### Flow
1. User creates/joins a room on QR Handshake page
2. Handshake server generates unique PIN and manages connections
3. After successful handshake, user is redirected to Translation page
4. Translation page loads handshake data and starts translation session

## Setup Instructions

### 1. Install Dependencies

The required dependencies are already included in `package.json`:
- `ws` - WebSocket server
- `qrcode` - QR code generation
- `crypto-js` - Encryption utilities

### 2. Start the Servers

You need to run two servers:

#### Main Application Server
```bash
npm run dev
```
This runs the main application on the default port (usually 3000).

#### Handshake WebSocket Server
```bash
npm run dev:handshake
```
This runs the handshake server on port 3001.

### 3. Access the Application

1. Open your browser to `http://localhost:3000`
2. Navigate to the QR Handshake page: `http://localhost:3000/qr-handshake`
3. Or access it through the dashboard navigation

## Usage Guide

### Creating a Room (Host)

1. **Connect to Server**: Click "Connect to Server" to establish WebSocket connection
2. **Create Room**: Click "Create Room" to generate a unique 6-digit PIN
3. **Share PIN**: Share the PIN with the person you want to connect with
4. **Wait for Guest**: The system will show "Waiting for Guest" status
5. **Complete Handshake**: Once guest joins, handshake completes automatically
6. **Start Translation**: Click "Start Translation" to proceed to translation page

### Joining a Room (Guest)

1. **Connect to Server**: Click "Connect to Server" to establish WebSocket connection
2. **Enter PIN**: Enter the 6-digit PIN provided by the host
3. **Join Room**: Click "Join Room" to connect to the session
4. **Complete Handshake**: Handshake completes automatically
5. **Start Translation**: Click "Start Translation" to proceed to translation page

### Translation Session

1. **Automatic Setup**: The translation page loads handshake data automatically
2. **Configure Languages**: Set your speaking and listening languages
3. **Start Listening**: Click "Start Listening" to begin speech recognition
4. **Real-time Translation**: Speak and see translations in real-time
5. **End Session**: Click "End Session" to return to handshake page

## Features

### Security
- **Unique PINs**: Each room gets a unique 6-digit PIN
- **Room Privacy**: Only users with the correct PIN can join
- **Auto-cleanup**: Rooms are automatically deleted after 30 minutes of inactivity
- **Connection Limits**: Maximum 2 users per room

### Real-time Communication
- **WebSocket Connection**: Real-time bidirectional communication
- **Room Management**: Automatic room creation and cleanup
- **User Status**: Real-time user connection status
- **Chat System**: Built-in chat for room communication

### QR Code Support
- **QR Generation**: Automatic QR code generation for room sharing
- **QR Scanning**: Camera-based QR code scanning for easy joining
- **Manual Entry**: PIN-based manual room joining

## Technical Details

### Handshake Server (`server/handshakeServer.js`)
- **Port**: 3001 (configurable via `HANDSHAKE_PORT` environment variable)
- **Protocol**: WebSocket
- **Features**:
  - Room creation and management
  - PIN generation and validation
  - User connection tracking
  - Real-time messaging
  - Automatic cleanup

### Data Flow
1. **Room Creation**: Host creates room → Server generates PIN → QR code created
2. **Room Joining**: Guest enters PIN → Server validates → User added to room
3. **Handshake**: Both users connected → Handshake completed → Ready for translation
4. **Translation**: Handshake data passed to translation page → Translation session starts

### Error Handling
- **Invalid PIN**: Shows error message with retry options
- **Room Full**: Prevents joining when room has 2 users
- **Connection Lost**: Automatic reconnection attempts
- **Server Down**: Graceful error messages and fallback options

## Troubleshooting

### Common Issues

1. **"Server not connected"**
   - Make sure handshake server is running: `npm run dev:handshake`
   - Check if port 3001 is available

2. **"Room not found"**
   - Verify the PIN is correct (6 digits)
   - Check if the room has expired (30-minute timeout)
   - Ensure the host is still connected

3. **"Translation service not connected"**
   - Make sure main server is running: `npm run dev`
   - Check WebSocket connection status

4. **QR Code not scanning**
   - Ensure camera permissions are granted
   - Check if QR code is properly generated
   - Try manual PIN entry as alternative

### Development

For development, you can run both servers simultaneously:
```bash
# Terminal 1: Main server
npm run dev

# Terminal 2: Handshake server
npm run dev:handshake
```

### Environment Variables

Optional environment variables:
- `HANDSHAKE_PORT`: Port for handshake server (default: 3001)
- `ROOM_TIMEOUT`: Room cleanup timeout in milliseconds (default: 30 minutes)

## Security Considerations

- PINs are generated server-side and cannot be guessed
- Rooms are automatically cleaned up to prevent resource leaks
- WebSocket connections are validated and managed
- No persistent storage of sensitive data
- Session data is cleared when users disconnect

## Future Enhancements

Potential improvements:
- Database persistence for room data
- User authentication and profiles
- Room history and analytics
- Advanced security features (encryption, rate limiting)
- Mobile app support
- Group translation sessions (more than 2 users)
