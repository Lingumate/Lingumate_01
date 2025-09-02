# Real-Time Speech Translation System

This guide explains how to use the new real-time speech translation system that integrates with the existing QR handshake system.

## 🚀 Overview

The real-time speech translation system allows two users to have a conversation where:
- **User1** speaks in **Language1** 
- The speech is automatically translated to **Language2**
- **User2** hears the translation in their language
- Both users see the real-time translation text
- The system works bi-directionally

## 🏗️ Architecture

The system consists of two servers:

1. **Handshake Server** (Port 3001) - Manages user connections and room creation
2. **Real-time Translation Server** (Port 3002) - Handles live speech translation

## 🚀 Getting Started

### 1. Start Both Servers

```bash
# Option 1: Start both servers with one command
npm run dev:all

# Option 2: Start servers individually
npm run dev:handshake    # Port 3001
npm run dev:realtime     # Port 3002
```

### 2. Access the Application

1. Open your browser and navigate to the main application
2. Go to the **QR Handshake** page
3. Complete the handshake process with another user
4. Navigate to the **BLE Translator** page for real-time translation

## 🔄 How It Works

### Step 1: Handshake (QR Handshake Page)
1. **Create Room**: One user creates a room and gets a PIN
2. **Join Room**: The other user joins using the PIN or QR code
3. **Verification**: Both users complete the handshake
4. **Session Ready**: Translation session is prepared

### Step 2: Real-time Translation (BLE Translator Page)
1. **Auto-connection**: Automatically connects to real-time translation server
2. **Language Setup**: Configure speaking and listening languages
3. **Start Speaking**: Click "Start Listening" and begin speaking
4. **Live Translation**: See real-time transcription and translation
5. **Audio Output**: Hear the translated speech in the target language

## 🌍 Supported Languages

The system supports multiple languages including:
- 🇺🇸 English (en)
- 🇪🇸 Spanish (es) 
- 🇫🇷 French (fr)
- 🇩🇪 German (de)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)
- 🇯🇵 Japanese (ja)
- 🇰🇷 Korean (ko)
- 🇨🇳 Chinese (zh)
- 🇸🇦 Arabic (ar)

## 🔧 Technical Details

### WebSocket Messages

#### From Client to Server:
```json
{
  "type": "init_translation_session",
  "user": {
    "id": "user123",
    "name": "John",
    "preferredLanguage": "en"
  },
  "user1Language": "en",
  "user2Language": "es"
}
```

```json
{
  "type": "text_translation",
  "text": "Hello, how are you?",
  "sourceLanguage": "en",
  "targetLanguage": "es",
  "senderId": "user123",
  "sessionId": "session456"
}
```

#### From Server to Client:
```json
{
  "type": "translation_result",
  "message": {
    "id": "msg789",
    "originalText": "Hello, how are you?",
    "translatedText": "Hola, ¿cómo estás?",
    "originalLanguage": "en",
    "targetLanguage": "es",
    "timestamp": 1234567890
  }
}
```

### Server Ports
- **Handshake Server**: Port 3001
- **Real-time Translation Server**: Port 3002
- **Main Application**: Port 5000 (default)

## 📱 Usage Flow

### For User 1 (Host):
1. Create a room on QR Handshake page
2. Share the PIN with User 2
3. Wait for User 2 to join
4. Complete handshake
5. Go to BLE Translator page
6. Set your speaking language (e.g., English)
7. Set your listening language (e.g., Spanish)
8. Start speaking - your words will be translated for User 2

### For User 2 (Guest):
1. Join the room using the PIN from User 1
2. Complete handshake
3. Go to BLE Translator page
4. Set your speaking language (e.g., Spanish)
5. Set your listening language (e.g., English)
6. Start speaking - your words will be translated for User 1

## 🎯 Real-time Features

### Speech Recognition
- **Google-style STT**: Real-time speech-to-text conversion
- **Interim Results**: See words as you speak them
- **Final Results**: Get complete transcription when you finish speaking

### Translation Pipeline
1. **Speech → Text**: Convert spoken words to text
2. **Text Translation**: Translate from source to target language
3. **Text → Speech**: Convert translated text to audio
4. **Real-time Delivery**: Minimal latency for natural conversation

### Audio Features
- **Automatic Playback**: Translated speech plays automatically
- **Audio Controls**: Toggle audio on/off
- **Language-specific TTS**: Natural-sounding speech in target language

## 🔒 Security Features

- **Encrypted Sessions**: All communication is encrypted
- **PIN Verification**: Secure room access with 6-digit PINs
- **Session Isolation**: Users can only access their own sessions
- **Automatic Cleanup**: Inactive sessions are automatically removed

## 🐛 Troubleshooting

### Common Issues:

#### "Real-time Translation Disconnected"
- Check if the real-time translation server is running on port 3002
- Verify network connectivity
- Restart the server: `npm run dev:realtime`

#### "Handshake Server Not Connected"
- Check if the handshake server is running on port 3001
- Verify the server IP address in the client code
- Restart the server: `npm run dev:handshake`

#### "Speech Recognition Not Working"
- Ensure you're using Chrome or Edge browser
- Check microphone permissions
- Verify the Web Speech API is supported

#### "Translation Not Working"
- Check if both servers are running
- Verify language settings are correct
- Check browser console for error messages

### Server Logs:
Both servers provide detailed logging:
- Connection events
- Message processing
- Error details
- Session management

## 🚀 Future Enhancements

### Planned Features:
- **AI Model Integration**: Connect to actual translation services
- **Voice Recognition**: Identify speakers automatically
- **Multi-language Support**: Support for more languages
- **Offline Mode**: Basic translation without internet
- **Recording**: Save conversations for later review

### Performance Improvements:
- **WebRTC**: Direct peer-to-peer audio streaming
- **Compression**: Optimize audio data transmission
- **Caching**: Cache common translations
- **Load Balancing**: Support for multiple users

## 📚 API Reference

### Real-time Translation Server Endpoints:

#### WebSocket Connection
```
ws://localhost:3002
```

#### Message Types:
- `init_translation_session` - Initialize new translation session
- `join_translation_session` - Join existing session
- `text_translation` - Send text for translation
- `speech_input` - Send audio data for processing
- `translation_result` - Receive translation results
- `audio_playback` - Control audio playback
- `end_translation_session` - End current session
- `heartbeat` - Keep connection alive

## 🤝 Contributing

To contribute to the real-time translation system:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
1. Check the troubleshooting section
2. Review server logs
3. Check browser console for errors
4. Create an issue in the repository

---

**Happy Translating! 🌍✨**
