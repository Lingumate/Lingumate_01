import WebSocket from 'ws';

console.log('🧪 Testing Real-time Translation Server...\n');

// Test server connection
const testWebSocketConnection = () => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('ws://localhost:3002');
    
    const timeout = setTimeout(() => {
      reject(new Error('Connection timeout'));
    }, 5000);
    
    ws.on('open', () => {
      console.log('✅ WebSocket connection established');
      clearTimeout(timeout);
      
      // Test session initialization
      const initMessage = {
        type: 'init_translation_session',
        user: {
          id: 'test_user_1',
          name: 'Test User 1',
          preferredLanguage: 'en'
        },
        user1Language: 'en',
        user2Language: 'es'
      };
      
      console.log('📤 Sending session initialization...');
      ws.send(JSON.stringify(initMessage));
      
      // Wait for response
      ws.on('message', (data) => {
        try {
          const response = JSON.parse(data);
          console.log('📨 Received response:', response.type);
          
          if (response.type === 'translation_session_created') {
            console.log('✅ Session created successfully');
            console.log('📊 Session ID:', response.sessionId);
            
            // Test text translation
            const translationMessage = {
              type: 'text_translation',
              text: 'Hello, how are you?',
              sourceLanguage: 'en',
              targetLanguage: 'es',
              senderId: 'test_user_1',
              sessionId: response.sessionId
            };
            
            console.log('📤 Sending translation request...');
            ws.send(JSON.stringify(translationMessage));
            
            // Wait for translation result
            ws.on('message', (translationData) => {
              try {
                const translationResponse = JSON.parse(translationData);
                console.log('📨 Received translation response:', translationResponse.type);
                
                if (translationResponse.type === 'translation_result') {
                  console.log('✅ Translation completed successfully');
                  console.log('📄 Original:', translationResponse.message.originalText);
                  console.log('🌐 Translated:', translationResponse.message.translatedText);
                  
                  // Close connection
                  ws.close();
                  resolve('All tests passed!');
                }
              } catch (parseError) {
                console.error('❌ Failed to parse translation response:', parseError);
                ws.close();
                reject(parseError);
              }
            });
          }
        } catch (parseError) {
          console.error('❌ Failed to parse response:', parseError);
          ws.close();
          reject(parseError);
        }
      });
      
      ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
        clearTimeout(timeout);
        reject(error);
      });
      
      ws.on('close', () => {
        console.log('🔌 WebSocket connection closed');
      });
    });
    
    ws.on('error', (error) => {
      console.error('❌ Connection failed:', error.message);
      clearTimeout(timeout);
      reject(error);
    });
  });
};

// Run tests
const runTests = async () => {
  try {
    console.log('🚀 Starting tests...\n');
    
    const result = await testWebSocketConnection();
    console.log('\n🎉 Test Results:', result);
    console.log('\n✅ Real-time translation server is working correctly!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n💡 Make sure the real-time translation server is running:');
    console.log('   npm run dev:realtime');
    console.log('\n💡 Or start both servers:');
    console.log('   npm run dev:all');
    
    process.exit(1);
  }
};

// Run the tests
runTests();
