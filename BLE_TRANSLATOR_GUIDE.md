# BLE Real-Time Translator Guide

## Overview

The BLE Real-Time Translator is an enhanced version of the real-time translation feature that enables direct, nearby device-to-device connections using Bluetooth Low Energy (BLE) for discovery, pairing, and communication. This allows two users (often wearing earbuds) to have seamless two-way translated conversations without needing an internet connection.

## Key Features

### 🔍 Device Discovery
- **Find Nearby Users**: Scan for other Lingumate users in the vicinity
- **Device Profiles**: View user avatars, names, and preferred languages
- **Signal Strength**: Monitor connection quality with nearby devices
- **Discoverable Mode**: Make your device visible to other users

### 🔐 PIN Code Security
- **6-Digit PIN Generation**: Automatically generates secure 6-digit PIN codes
- **PIN Hashing**: PINs are hashed using SHA-256 for secure transmission
- **Attempt Limiting**: Maximum 3 failed attempts before temporary lockout
- **Lockout Protection**: 30-second lockout after failed attempts
- **PIN Visibility Toggle**: Show/hide PIN for secure sharing

### 🔗 Connection Workflow
1. **QR Code Generation**: Session creator generates QR code with embedded PIN hash
2. **PIN Sharing**: Creator shares 6-digit PIN with intended participant
3. **QR Code Scanning**: Participant scans QR code to initiate connection
4. **PIN Verification**: Participant enters PIN for verification
5. **Session Establishment**: Connection established after successful PIN verification

### 🎤 Two-Way Live Translation Flow

#### From User1 → User2:
1. **Speech Capture**: User1 speaks in Language1 (mic input from earbuds or phone)
2. **Speech-to-Text (STT)**: Convert audio → Text1 (Language1)
3. **Translation**: Text1 → Text2 (Language2)
4. **Text-to-Speech (TTS)**: Text2 → Speech2 in Language2
5. **BLE Transfer**: Speech2 audio stream sent over BLE to User2's device
6. **Playback**: Speech2 played in User2's earbuds/speakers

#### From User2 → User1:
1. **Speech Capture**: User2 speaks in Language2
2. **Speech-to-Text (STT)**: Convert audio → Text3 (Language2)
3. **Translation**: Text3 → Text4 (Language1)
4. **Text-to-Speech (TTS)**: Text4 → Speech4 in Language1
5. **BLE Transfer**: Speech4 sent to User1's device
6. **Playback**: Speech4 played in User1's earbuds/speakers

## Technical Requirements

### Hardware Requirements
- **Bluetooth Low Energy (BLE)**: Both devices must support BLE
- **Microphone**: For speech input
- **Speakers/Earbuds**: For audio output
- **Internet Connection**: Not required for translation (offline mode)

### Software Requirements
- **Web Bluetooth API**: For BLE communication
- **MediaRecorder API**: For audio recording
- **Web Speech API**: For speech recognition
- **Audio Context**: For audio processing

## Usage Instructions

### 1. Access the BLE Translator
- Navigate to `/ble-translator` or click "BLE Real-Time Translator" from the dashboard
- Ensure Bluetooth is enabled on your device

### 2. Configure Your Device
- Set your display name
- Choose your preferred language
- Optionally upload a profile picture

### 3. Create or Join Session

#### Creating a Session (Initiator):
- Click "Generate QR Code" to create a new session
- System generates a unique 6-digit PIN
- Share the PIN with the person you want to connect with
- Keep the QR code visible for scanning

#### Joining a Session (Participant):
- Click "Scan QR Code" to scan the session QR code
- Enter the 6-digit PIN provided by the session creator
- System verifies PIN and establishes connection
- If PIN is incorrect, you have 3 attempts before lockout

### 4. PIN Verification Process
- **PIN Input**: Enter the 6-digit PIN in the modal
- **Verification**: System compares hashed input with stored hash
- **Success**: Connection established if PIN is correct
- **Failure**: Try again (max 3 attempts)
- **Lockout**: 30-second lockout after 3 failed attempts

### 5. Start Translation Session
- Once connected, the translation interface appears
- Tap the microphone button to start recording
- Speak clearly in your language
- Wait for translation and playback
- The other user will hear the translated audio

### 6. End Session
- Tap "End Session" to disconnect
- Both users return to handshake mode

## Advanced Features

### 🎧 Earbud Support
- **Default Audio Routing**: All audio input/output defaults to connected earbuds
- **Dual Connection**: Maintain BLE connection to other device and Bluetooth audio link to earbuds simultaneously
- **Audio Quality**: Optimized for earbud playback

### ⚡ Low Latency Optimizations
- **Audio Compression**: Compress audio before sending over BLE (Opus or AAC-LC)
- **Short Packet Transmission**: Prioritize near-instant responses
- **Connection Monitoring**: Real-time connection strength indicator

### 🔧 Session Management
- **Connection Strength**: Visual indicator of BLE signal quality
- **Language Switching**: Change languages mid-session
- **Audio Controls**: Toggle microphone and speaker independently
- **Session History**: View conversation messages

## Troubleshooting

### Common Issues

#### BLE Not Supported
- **Symptom**: "Bluetooth Not Supported" message
- **Solution**: Ensure your device supports Bluetooth Low Energy
- **Alternative**: Use the regular real-time translator

#### PIN Verification Issues
- **Symptom**: PIN not working or account locked
- **Solutions**:
  - Ensure you're entering the correct 6-digit PIN
  - Check for leading zeros in the PIN
  - Wait for lockout to expire (30 seconds)
  - Ask session creator to generate new session

#### QR Code Scanning Issues
- **Symptom**: QR code not scanning or invalid data
- **Solutions**:
  - Ensure QR code is clearly visible and well-lit
  - Grant camera permissions when prompted
  - Hold camera at appropriate distance
  - Check that QR code contains valid session data

#### Connection Failed
- **Symptom**: Connection request times out or fails
- **Solutions**:
  - Check signal strength indicator
  - Ensure both devices are within range
  - Restart the connection process
  - Check for Bluetooth interference

#### Audio Issues
- **Symptom**: No audio playback or poor quality
- **Solutions**:
  - Check earbud connection
  - Verify audio permissions
  - Test with device speakers
  - Check audio settings

### Performance Tips

1. **Optimal Distance**: Keep devices within 10-30 feet for best performance
2. **Clear Speech**: Speak clearly and at normal volume
3. **Background Noise**: Minimize background noise for better recognition
4. **Battery Life**: BLE scanning can drain battery - use sparingly
5. **Interference**: Avoid areas with heavy Bluetooth interference

## Privacy & Security

### Data Protection
- **Local Processing**: All translation processing happens locally on devices
- **No Internet Required**: Conversations don't require internet connection
- **Temporary Storage**: Audio data is not permanently stored
- **End-to-End**: Direct device-to-device communication
- **PIN Security**: PINs are hashed and never transmitted in plaintext

### PIN Code Security
- **Secure Generation**: 6-digit PINs generated using cryptographically secure methods
- **Hash Transmission**: Only PIN hashes are transmitted, never plaintext PINs
- **Attempt Limiting**: Maximum 3 failed attempts before lockout
- **Session Isolation**: Each session has unique PIN and security context
- **No Persistent Storage**: PINs are not stored permanently on devices

### User Control
- **PIN Sharing**: Users control who receives the PIN
- **PIN Visibility**: Toggle PIN visibility for secure sharing
- **Session Management**: End sessions at any time
- **Connection Verification**: PIN verification required for all connections
- **Audio Controls**: Mute microphone or speakers as needed

## Future Enhancements

### Planned Features
- **Group Conversations**: Support for 3+ users in a session
- **Custom Languages**: Add support for more languages
- **Voice Recognition**: Improved accuracy and noise cancellation
- **Offline Models**: Download translation models for offline use
- **Audio Effects**: Voice enhancement and noise reduction

### Technical Improvements
- **BLE Mesh**: Support for mesh networking
- **Audio Codecs**: Additional audio compression options
- **Battery Optimization**: Improved power management
- **Range Extension**: Longer distance connections

## Support

For technical support or feature requests, please contact the development team or refer to the main application documentation.
