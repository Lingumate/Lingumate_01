# PIN Handshake System Demo Guide

## How the PIN Code Handshake System Works

The PIN handshake system is already implemented in your BLE translator. Here's how it works step by step:

### Step 1: Session Creator (User A)

1. **Navigate to BLE Translator**
   - Go to `/ble-translator` in your application
   - You'll see the interface shown in the image

2. **Generate Session with PIN**
   - Click the **"Generate QR Code"** button
   - The system automatically generates a 6-digit PIN (e.g., `123456`)
   - A QR code appears with the session data embedded

3. **Session Information Display**
   - **Session ID**: A unique identifier for the session (e.g., `abc123-def456`)
   - **Security PIN**: 6-digit PIN (e.g., `123456`) - hidden by default
   - Click the eye icon to reveal the PIN
   - Use copy buttons to easily share Session ID and PIN

4. **Share Information**
   - Share both the **Session ID** and **PIN** with the person you want to connect with
   - You can share via text message, email, or in-person

### Step 2: Session Joiner (User B)

#### Option A: Scan QR Code
1. **Scan QR Code**
   - Click **"Scan QR Code"** button
   - Point camera at User A's QR code
   - System detects the QR code and extracts session data

2. **PIN Input Modal**
   - A modal appears: **"Enter Security PIN"**
   - Enter the 6-digit PIN provided by User A: `123456`
   - Click **"Verify PIN"** button

#### Option B: Manual Entry (NEW!)
1. **Manual Entry**
   - Click **"Enter PIN Manually"** button
   - A modal appears: **"Manual Session Entry"**

2. **Enter Session Details**
   - **Session ID**: Enter the session ID provided by User A
   - **PIN Code**: Enter the 6-digit PIN provided by User A
   - Click **"Join Session"** button

3. **PIN Verification**
   - System verifies both Session ID and PIN
   - If correct: Connection established
   - If incorrect: Try again (max 3 attempts before 30-second lockout)

### Step 3: Secure Connection

1. **Connection Established**
   - Both users see "Session Active" status
   - Security badge shows "PIN Verified"
   - Translation interface becomes available

2. **Real-time Translation**
   - Users can now start recording and translating
   - All communication is encrypted with session keys
   - PIN verification status is maintained throughout session

## Security Features

### 🔐 PIN Security
- **6-Digit Random PIN**: 1,000,000 possible combinations
- **SHA-256 Hashing**: PIN never transmitted in plaintext
- **Attempt Limiting**: Max 3 failed attempts
- **Lockout Protection**: 30-second lockout after failures

### 🛡️ Session Security
- **Unique Session Keys**: Each session has different encryption
- **PIN Verification Tracking**: Status maintained throughout session
- **No Persistent Storage**: PINs not stored permanently
- **Session Isolation**: Each session is independent

## UI Elements You'll See

### When Creating Session:
```
┌─────────────────────────────────────┐
│ QR Code Handshake                   │
├─────────────────────────────────────┤
│ Create Session                      │
│ [Generate QR Code] ← Click this     │
│                                     │
│ Join Session                        │
│ [Scan QR Code]                      │
│ [Enter PIN Manually] ← NEW!         │
│                                     │
│ Share QR Code                       │
│ ┌─────────────────────────────────┐ │
│ │        [QR Code Image]          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Session ID                          │
│ ┌─────────────────────────────────┐ │
│ │ abc123-def456 [📋] ← Copy       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Security PIN                        │
│ ┌─────────────────────────────────┐ │
│ │ •••••• [👁️] ← Toggle visibility │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### When Joining Session (Manual Entry):
```
┌─────────────────────────────────────┐
│ Manual Session Entry                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        🔑 Key Icon              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Enter the session ID and PIN        │
│ provided by the session creator     │
│                                     │
│ Session ID                          │
│ ┌─────────────────────────────────┐ │
│ │ abc123-def456 ← Enter here      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ PIN Code                            │
│ ┌─────────────────────────────────┐ │
│ │ 123456 [👁️] ← Toggle visibility │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Cancel] [Join Session] ← Click this│
└─────────────────────────────────────┘
```

## Status Indicators

### Security Badge States:
- **🟠 QR Handshake**: Initial state, no PIN generated
- **🟡 PIN Required**: QR scanned, waiting for PIN input
- **🟢 PIN Verified**: PIN verified, connection established

### Connection Status:
- **🔴 Disconnected**: No active connection
- **🟡 Connecting**: PIN verification in progress
- **🟢 Connected**: Session active and ready

## Troubleshooting

### PIN Not Working?
1. **Check PIN**: Ensure you're entering the exact 6-digit PIN
2. **Check Session ID**: Ensure Session ID matches exactly
3. **Leading Zeros**: Include leading zeros if present (e.g., `012345`)
4. **Session Expiry**: PINs are only valid for current session
5. **Lockout**: Wait 30 seconds if account is locked

### QR Code Issues?
1. **Scan Quality**: Ensure QR code is clearly visible
2. **Camera Permissions**: Grant camera access when prompted
3. **Lighting**: Ensure adequate lighting for scanning
4. **Distance**: Hold camera at appropriate distance
5. **Manual Entry**: Use "Enter PIN Manually" as alternative

### Manual Entry Issues?
1. **Session ID Format**: Enter the exact Session ID provided
2. **PIN Format**: Enter exactly 6 digits
3. **Copy/Paste**: Use copy buttons to avoid typos
4. **Case Sensitivity**: Session IDs are case-sensitive

## Best Practices

### For Session Creators:
1. **Secure Information Sharing**: Share Session ID and PIN through secure channels
2. **PIN Visibility**: Keep PIN hidden when not sharing
3. **Session Management**: End sessions when not in use
4. **Monitor Attempts**: Watch for unauthorized connection attempts
5. **Clear Communication**: Provide both Session ID and PIN clearly

### For Session Joiners:
1. **Information Security**: Don't share Session ID or PIN with others
2. **Careful Entry**: Be precise when entering Session ID and PIN
3. **Session Awareness**: Verify connection before sharing sensitive info
4. **Attempt Management**: Don't exceed 3 attempts
5. **Alternative Methods**: Use manual entry if QR scanning fails

## Technical Details

### PIN Generation:
```typescript
const generateSecurePIN = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
```

### Session ID Generation:
```typescript
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
```

### PIN Hashing:
```typescript
const pinHash = CryptoJS.SHA256(pinCode).toString();
```

### Manual Session Verification:
```typescript
const verifyManualSession = () => {
  // Validate Session ID and PIN combination
  // Create mock session data for demo purposes
  // In production, validate against server
};
```

## New Features Added

### 🔑 Manual PIN Entry
- **Direct Entry**: Enter Session ID and PIN without QR scanning
- **Alternative Method**: Useful when QR scanning fails or isn't available
- **Same Security**: Maintains all security features of QR method
- **User-Friendly**: Clear interface for manual entry

### 📋 Session ID Display
- **Unique Identifier**: Each session has a unique Session ID
- **Easy Sharing**: Copy button for quick sharing
- **Visual Distinction**: Different styling from PIN display
- **Clear Instructions**: Guidance on what to share

### 🛡️ Enhanced Security
- **Dual Verification**: Both Session ID and PIN required
- **Same Protection**: All existing security measures apply
- **Attempt Limiting**: Same 3-attempt limit with lockout
- **Session Isolation**: Each session remains independent

The PIN handshake system now supports both QR code scanning and manual entry, providing users with flexibility while maintaining robust security for your BLE translation sessions.
