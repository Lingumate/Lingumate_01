# PIN Code Handshake System Guide

## Overview

The PIN Code Handshake System is a security enhancement for the BLE Real-Time Translator that adds an additional layer of authentication during the connection process. This system prevents unauthorized connections and ensures that only users with the correct PIN code can join a translation session.

## Key Features

### 🔐 Security Features
- **6-Digit PIN Generation**: Automatically generates secure 6-digit PIN codes
- **PIN Hashing**: PINs are hashed using SHA-256 for secure transmission
- **Attempt Limiting**: Maximum 3 failed attempts before temporary lockout
- **Lockout Protection**: 30-second lockout after failed attempts
- **PIN Visibility Toggle**: Show/hide PIN for secure sharing

### 🔄 Handshake Workflow

#### For Session Creator (Initiator):
1. **Generate Session**: Click "Generate QR Code" to create a new session
2. **PIN Generation**: System automatically generates a 6-digit PIN
3. **Share PIN**: Share the PIN with the person you want to connect with
4. **QR Code Display**: QR code contains session data and PIN hash
5. **Wait for Connection**: Wait for the other person to scan and enter PIN

#### For Session Joiner:
1. **Scan QR Code**: Use camera to scan the QR code
2. **PIN Prompt**: System prompts for the 6-digit PIN
3. **Enter PIN**: Input the PIN provided by the session creator
4. **Verification**: System verifies PIN against the hash
5. **Connection**: If correct, connection is established

## Technical Implementation

### PIN Generation
```typescript
const generateSecurePIN = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
```

### PIN Hashing
```typescript
const pinHash = CryptoJS.SHA256(pinCode).toString();
```

### PIN Verification
```typescript
const inputHash = CryptoJS.SHA256(pinInput).toString();
if (inputHash === parsedData.pin_hash) {
  // PIN verified successfully
}
```

### Security Measures

#### 1. PIN Generation
- **Random Generation**: Uses cryptographically secure random number generation
- **6-Digit Format**: Ensures sufficient entropy (1,000,000 possible combinations)
- **No Patterns**: Completely random, no predictable sequences

#### 2. PIN Transmission
- **Hashed Only**: Only the hash is transmitted in the QR code
- **No Plaintext**: Original PIN is never transmitted
- **One-Time Use**: Each session has a unique PIN

#### 3. PIN Verification
- **Hash Comparison**: Compares hashed input with stored hash
- **Attempt Limiting**: Prevents brute force attacks
- **Lockout Protection**: Temporary lockout after failed attempts

#### 4. Session Security
- **Encrypted Communication**: All session data is encrypted
- **Session Keys**: Unique encryption keys for each session
- **PIN Verification Status**: Tracks verification status throughout session

## User Interface

### PIN Display (Session Creator)
- **Secure Display**: PIN is hidden by default (shows as ••••••)
- **Toggle Visibility**: Eye icon to show/hide PIN
- **Copy Functionality**: Easy copying of session data
- **Visual Indicators**: Clear security status indicators

### PIN Input (Session Joiner)
- **Modal Interface**: Dedicated PIN input modal
- **Input Validation**: Only accepts numeric input
- **Character Limit**: Maximum 6 digits
- **Error Handling**: Clear error messages for failed attempts
- **Lockout Display**: Shows remaining lockout time

### Status Indicators
- **Security Badge**: Shows PIN verification status
- **Connection Status**: Indicates handshake progress
- **Visual Feedback**: Color-coded status indicators

## Security Benefits

### 1. Unauthorized Access Prevention
- **PIN Requirement**: Only users with correct PIN can join
- **No Random Connections**: Prevents unwanted connections
- **Intentional Sharing**: Creator controls who can join

### 2. Brute Force Protection
- **Attempt Limiting**: Maximum 3 attempts per session
- **Lockout Mechanism**: 30-second lockout after failures
- **Session-Specific**: Lockout applies to current session only

### 3. Data Protection
- **Hashed Transmission**: PIN never transmitted in plaintext
- **Session Isolation**: Each session has unique security context
- **No Persistent Storage**: PINs are not stored permanently

## Usage Instructions

### Creating a Secure Session

1. **Navigate to BLE Translator**
   - Go to `/ble-translator` in the application
   - Ensure Bluetooth is enabled

2. **Generate Session**
   - Click "Generate QR Code" button
   - System creates session with unique PIN

3. **Share PIN Securely**
   - Note the 6-digit PIN displayed
   - Share PIN with intended participant
   - Use secure communication method (in-person, secure messaging)

4. **Wait for Connection**
   - Keep the QR code visible
   - Wait for other person to scan and enter PIN

### Joining a Secure Session

1. **Scan QR Code**
   - Click "Scan QR Code" button
   - Point camera at the QR code
   - Wait for scan to complete

2. **Enter PIN**
   - System prompts for 6-digit PIN
   - Enter the PIN provided by session creator
   - Click "Verify PIN" button

3. **Handle Verification**
   - If correct: Connection established
   - If incorrect: Try again (max 3 attempts)
   - If locked: Wait for lockout to expire

4. **Start Translation**
   - Once connected, translation interface appears
   - Begin real-time translation session

## Troubleshooting

### Common Issues

#### PIN Not Working
- **Check PIN**: Ensure you're entering the correct 6-digit PIN
- **Case Sensitivity**: PINs are case-sensitive
- **Leading Zeros**: Include leading zeros if present
- **Session Expiry**: PINs are only valid for current session

#### Account Locked
- **Wait Period**: Wait 30 seconds for lockout to expire
- **New Session**: Creator may need to generate new session
- **Different Device**: Try from different device if available

#### QR Code Issues
- **Scan Quality**: Ensure QR code is clearly visible
- **Camera Permissions**: Grant camera access when prompted
- **Lighting**: Ensure adequate lighting for scanning
- **Distance**: Hold camera at appropriate distance

### Best Practices

#### For Session Creators
1. **Secure PIN Sharing**: Share PIN through secure channels
2. **Session Management**: End sessions when not in use
3. **PIN Visibility**: Keep PIN hidden when not sharing
4. **Session Monitoring**: Monitor for unauthorized connection attempts

#### For Session Joiners
1. **PIN Security**: Don't share PIN with others
2. **Attempt Management**: Be careful with PIN entry
3. **Session Awareness**: Be aware of session context
4. **Connection Verification**: Verify connection before sharing sensitive information

## Advanced Features

### PIN Customization (Future)
- **Custom PINs**: Allow users to set custom PINs
- **PIN Complexity**: Support for alphanumeric PINs
- **PIN Expiry**: Time-based PIN expiration
- **PIN Rotation**: Automatic PIN rotation for long sessions

### Enhanced Security (Future)
- **Biometric Verification**: Fingerprint or face recognition
- **Two-Factor Authentication**: Additional verification methods
- **Device Pairing**: Trusted device management
- **Audit Logging**: Connection attempt logging

## Privacy Considerations

### Data Protection
- **No PIN Storage**: PINs are not stored on devices
- **Session Isolation**: Each session is independent
- **No Tracking**: No persistent tracking of PIN usage
- **Local Processing**: All verification happens locally

### User Control
- **PIN Visibility**: Users control PIN visibility
- **Session Termination**: Users can end sessions anytime
- **Connection Approval**: Users approve all connections
- **Data Deletion**: No persistent data retention

## Technical Requirements

### Browser Support
- **Web Bluetooth API**: For BLE communication
- **CryptoJS**: For PIN hashing and encryption
- **QR Code Library**: For QR code generation/scanning
- **Modern Browser**: Chrome, Firefox, Safari, Edge

### Device Requirements
- **Bluetooth Low Energy**: Required for BLE communication
- **Camera**: Required for QR code scanning
- **JavaScript**: Required for client-side processing
- **HTTPS**: Required for secure communication

## Support

For technical support or security concerns regarding the PIN handshake system, please contact the development team or refer to the main application documentation.

### Security Reporting
If you discover any security vulnerabilities in the PIN handshake system, please report them immediately to the security team.

### Feature Requests
For feature requests or improvements to the PIN handshake system, please submit them through the application's feedback system.
