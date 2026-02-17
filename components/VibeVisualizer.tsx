
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ensureApiKeySelected } from '../utils/apiKeyHelper';

const VibeVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateVibe = async () => {
    if (!prompt.trim()) {
      setError("Please enter a keyword or phrase to generate a vibe.");
      return;
    }

    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      await ensureApiKeySelected();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image', // Using gemini-2.5-flash-image for abstract visuals
        contents: {
          parts: [
            {
              text: `Generate an abstract, futuristic, tech-themed image that visualizes the concept of "${prompt}". Use vibrant colors and dynamic shapes, resembling data flow or cloud architecture.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            // imageSize: "1K" // Uncomment for gemini-3-pro-image-preview if higher resolution is needed and API key selection is handled.
          },
        },
      });

      let foundImage = false;
      for (const candidate of response.candidates || []) {
        if (candidate.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
              setImageUrl(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
              foundImage = true;
              break;
            }
          }
        }
        if (foundImage) break;
      }

      if (!foundImage) {
        setError("Could not generate image. No image data received from AI.");
      }
    } catch (err) {
      console.error("Error generating vibe image:", err);
      setError("Failed to generate vibe. Please ensure your API key is selected and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="vibe-visualizer" className="py-20 md:py-28 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Experience Vibe Coding"
          subtitle="Unleash abstract visuals from your technical concepts with AI-powered creativity."
          id="vibe-visualizer"
        />
        <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl animate-fadeInUp">
          <p className="text-lg text-gray-300 mb-6 text-center">
            Enter a keyword or concept, and our AI will generate a unique visual "vibe" that captures its essence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., scalable architecture, CI/CD, data flow, quantum computing"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              aria-label="Enter a keyword for vibe visualization"
            />
            <Button onClick={generateVibe} disabled={isLoading} variant="primary">
              {isLoading ? 'Generating Vibe...' : 'Generate Vibe'}
            </Button>
          </div>

          {error && <p className="text-red-400 text-center mb-6 animate-fadeInUp">{error}</p>}

          {imageUrl && (
            <div className="mt-8 relative border-2 border-indigo-600 rounded-lg overflow-hidden shadow-2xl animate-zoomIn">
              <img src={imageUrl} alt="AI Generated Vibe" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VibeVisualizer;