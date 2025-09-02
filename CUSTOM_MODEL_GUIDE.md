# Custom AI Model Integration Guide

This guide explains how to upload and use your custom trained AI models in the Lingumate translation system.

## Overview

The system now supports uploading custom AI models that can handle the complete translation pipeline:
1. **Speech-to-Text**: Convert audio to text
2. **Text Translation**: Translate text between languages
3. **Text-to-Speech**: Convert translated text back to audio

## How to Upload Your Model

### 1. Access the Model Manager
- Navigate to `/model-manager` in the application
- Or click the "Models" tab in the mobile navigation

### 2. Upload Your Model File
- Click "Upload Custom AI Model"
- Select your model file (supports: `.model`, `.onnx`, `.pb`, `.h5`, `.json`, `.bin`)
- Provide a name and description
- Select the capabilities your model supports
- Click "Upload Model"

### 3. Activate Your Model
- Once uploaded, click "Activate" on your model
- The system will automatically switch to use your model for all translations

## Model Requirements

Your custom model must implement the following interface:

```typescript
interface AIServiceInterface {
  // Convert speech to text
  speechToText(audioBuffer: Buffer, language?: string): Promise<{
    text: string;
    language: string;
    confidence: number;
  }>;

  // Translate text between languages
  translateText(
    text: string, 
    targetLanguage: string, 
    sourceLanguage?: string
  ): Promise<{
    originalText: string;
    translatedText: string;
    originalLanguage: string;
    targetLanguage: string;
  }>;

  // Convert text to speech
  textToSpeech(
    text: string, 
    language: string,
    voice?: string
  ): Promise<{
    audioBuffer: Buffer;
    duration: number;
  }>;

  // Complete pipeline (optional - will be auto-generated)
  translateVoiceToVoice(
    audioBuffer: Buffer,
    targetLanguage: string,
    sourceLanguage?: string
  ): Promise<{
    originalText: string;
    translatedText: string;
    originalLanguage: string;
    targetLanguage: string;
    audioBuffer: Buffer;
  }>;
}
```

## Implementation Options

### Option 1: API-Based Model (Recommended)
If your model is served via an API (e.g., Flask, FastAPI, Django):

1. **Set up your API endpoints:**
   ```
   POST /speech-to-text
   POST /translate
   POST /text-to-speech
   ```

2. **Set environment variable:**
   ```bash
   CUSTOM_MODEL_API_URL=http://localhost:8000
   ```

3. **Upload any file** (the system will use your API)

### Option 2: Direct Model Integration
For models that can run directly in Node.js:

1. **Install required dependencies:**
   ```bash
   npm install @tensorflow/tfjs-node  # For TensorFlow.js models
   npm install onnxruntime-node      # For ONNX models
   ```

2. **Modify the CustomModelWrapper** in `server/services/modelManager.ts`:
   ```typescript
   private loadTrainedModel() {
     // For TensorFlow.js models:
     this.model = await tf.loadLayersModel(`file://${modelPath}`);
     
     // For ONNX models:
     this.model = await ort.InferenceSession.create(modelPath);
   }
   ```

3. **Implement the inference methods** with your model's specific API

### Option 3: Python Model Bridge
For Python-based models:

1. **Create a Python API server** (Flask/FastAPI):
   ```python
   from flask import Flask, request, jsonify
   import your_model
   
   app = Flask(__name__)
   model = your_model.load_model()
   
   @app.route('/speech-to-text', methods=['POST'])
   def speech_to_text():
       audio_data = request.json['audio']
       result = model.transcribe(audio_data)
       return jsonify(result)
   
   @app.route('/translate', methods=['POST'])
   def translate():
       text = request.json['text']
       result = model.translate(text)
       return jsonify(result)
   
   @app.route('/text-to-speech', methods=['POST'])
   def text_to_speech():
       text = request.json['text']
       result = model.synthesize(text)
       return result
   ```

2. **Set the API URL** in environment variables
3. **Upload any file** (the system will use your Python API)

## Environment Variables

Add these to your `.env` file:

```bash
# For API-based models
CUSTOM_MODEL_API_URL=http://localhost:8000

# For direct model integration
CUSTOM_MODEL_API_KEY=your_api_key_if_needed
```

## Testing Your Model

1. **Upload and activate your model**
2. **Go to the Translator page**
3. **Start a conversation**
4. **Test the complete pipeline:**
   - Speaker 1 speaks → Your model processes → Speaker 2 hears translation
   - Speaker 2 responds → Your model processes → Speaker 1 hears translation

## Troubleshooting

### Model Not Loading
- Check the console logs for error messages
- Verify your model file format is supported
- Ensure your API endpoints are accessible

### Translation Errors
- Verify your model implements all required methods
- Check that your API returns the expected response format
- Test your model independently before uploading

### Performance Issues
- Consider model optimization (quantization, pruning)
- Use GPU acceleration if available
- Implement caching for repeated translations

## Example API Response Formats

### Speech-to-Text Response
```json
{
  "text": "Hello, how are you?",
  "language": "en",
  "confidence": 0.95
}
```

### Translation Response
```json
{
  "translated_text": "Hola, ¿cómo estás?",
  "original_language": "en",
  "target_language": "es"
}
```

### Text-to-Speech Response
- Return audio data as binary/array buffer
- Or return base64-encoded audio

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your model implementation matches the interface
3. Test your API endpoints independently
4. Check the server logs for detailed error information

## Advanced Features

### Model Versioning
- Upload multiple versions of your model
- Switch between versions as needed
- Compare performance between versions

### Model Analytics
- Monitor translation accuracy
- Track processing times
- Analyze usage patterns

### Custom Voices
- Implement multiple voice options
- Support for different accents
- Gender-specific voice synthesis
