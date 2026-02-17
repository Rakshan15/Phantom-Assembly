
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, FunctionDeclaration, GenerateContentResponse, Type } from "@google/genai";
import Button from './Button';
import { ensureApiKeySelected } from '../utils/apiKeyHelper';
import { SERVICES } from '../constants'; // For lookupServiceOfferings

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'bot' | 'system';
  groundingUrls?: Array<{ uri: string; title?: string }>;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false); // Track API key selection
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Initialize chat session or ensure API key is selected when opened
  useEffect(() => {
    const initChat = async () => {
      if (isOpen && !chatSession) {
        setMessages([{ text: "Hi there! I'm Phantom Assembly's AI Assistant. How can I help you with cloud and operations today?", sender: 'bot' }]);
        await ensureApiKeyAndInitChat();
      } else if (!isOpen && chatSession) {
        // Optional: close session if API key management becomes more complex or if resources are heavy.
        // For now, keep session alive for quicker re-opening.
      }
    };
    initChat();
  }, [isOpen, chatSession]);


  const ensureApiKeyAndInitChat = async () => {
    try {
      const selected = await ensureApiKeySelected();
      setHasApiKey(selected);
      if (selected && !chatSession) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const lookupServiceOfferings: FunctionDeclaration = {
          name: 'lookupServiceOfferings',
          parameters: {
            type: Type.OBJECT,
            description: 'Looks up the services offered by Phantom Assembly related to cloud and operations.',
            properties: {
              keyword: {
                type: Type.STRING,
                description: 'An optional keyword to filter services (e.g., "Kubernetes", "DevOps", "cost optimization").',
              },
            },
          },
        };

        const estimateCostImpact: FunctionDeclaration = {
          name: 'estimateCostImpact',
          parameters: {
            type: Type.OBJECT,
            description: 'Provides a high-level, generalized estimate of cost impact for cloud migrations or optimizations.',
            properties: {
              projectType: {
                type: Type.STRING,
                description: 'The type of project (e.g., "e-commerce platform", "data pipeline", "SaaS application").',
              },
              scale: {
                type: Type.STRING,
                description: 'The approximate scale (e.g., "small", "medium", "large", "enterprise").',
              },
            },
            required: ['projectType', 'scale'],
          },
        };

        const newChat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            tools: [{ functionDeclarations: [lookupServiceOfferings, estimateCostImpact], googleSearch: {} }],
          },
        });
        setChatSession(newChat);
      }
    } catch (error) {
      console.error("Error ensuring API key or initializing chat:", error);
      setMessages(prev => [...prev, { text: "I couldn't start our chat. Please ensure your API key is selected.", sender: 'bot' }]);
      setHasApiKey(false);
    }
  };


  const sendMessage = async () => {
    if (!input.trim() || !chatSession || !hasApiKey) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const streamResponse = await chatSession.sendMessageStream({ message: userMessage });

      let botResponseText = '';
      let groundingUrls: Array<{ uri: string; title?: string }> = [];
      let functionCallsHandled = false;

      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;

        // Handle Function Calls first
        if (c.functionCalls && c.functionCalls.length > 0 && !functionCallsHandled) {
          functionCallsHandled = true; // Ensure this block runs only once per function call chunk
          for (const fc of c.functionCalls) {
            console.log("Function call detected:", fc);
            let functionResult: any = "ok"; // Default result

            if (fc.name === 'lookupServiceOfferings') {
              const keyword = (fc.args.keyword as string)?.toLowerCase();
              const matchingServices = SERVICES.filter(s =>
                keyword ? s.title.toLowerCase().includes(keyword) || s.description.toLowerCase().includes(keyword) : true
              );
              if (matchingServices.length > 0) {
                functionResult = `We offer services such as: ${matchingServices.map(s => s.title).join(', ')}. Which one would you like to know more about?`;
              } else {
                functionResult = `I couldn't find services matching "${keyword}". Phantom Assembly offers a wide range of cloud and operations services.`;
              }
            } else if (fc.name === 'estimateCostImpact') {
              const { projectType, scale } = fc.args;
              functionResult = `For a "${scale}" scale "${projectType}" project, a high-level estimate for cloud infrastructure could range from $X,000 to $Y,000 per month, depending on specific architecture and optimization. For a detailed quote, please contact us directly.`;
            } else {
              functionResult = `Function "${fc.name}" is not implemented yet.`;
            }

            await chatSession.sendToolResponse({
              functionResponses: {
                id: fc.id,
                name: fc.name,
                response: { result: functionResult },
              }
            });
            botResponseText += functionResult; // Append function call result to bot's immediate response
            // No need to break, let the stream continue for further text if any
          }
        }

        if (c.text) {
          botResponseText += c.text;
        }

        // Handle grounding metadata
        if (c.groundingMetadata?.groundingChunks) {
          const webGrounding = c.groundingMetadata.groundingChunks
            .filter((chunk: any) => chunk.web)
            .map((chunk: any) => ({
              uri: chunk.web.uri,
              title: chunk.web.title,
            }));
          if (webGrounding.length > 0) {
            groundingUrls = [...groundingUrls, ...webGrounding];
          }
        }
      }

      setMessages(prev => [...prev, { text: botResponseText, sender: 'bot', groundingUrls: groundingUrls.length > 0 ? groundingUrls : undefined }]);

    } catch (error: any) {
      console.error("Error sending message to Gemini:", error);
      if (error.message.includes("Requested entity was not found.")) {
        // Specific error for invalid API key with some models
        setMessages(prev => [...prev, { text: "My apologies, I encountered an issue. It seems my connection is not active. Please open the API key selection dialog to ensure a valid API key is selected, then try again.", sender: 'bot' }]);
        setHasApiKey(false); // Reset API key status
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[99] w-80 md:w-96 h-[calc(100vh-100px)] max-h-[600px] bg-gray-800 rounded-lg shadow-2xl flex flex-col animate-fadeInUp border border-indigo-700">
      <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700 rounded-t-lg">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="inline-block mr-2 text-indigo-400">🤖</span> AI Assistant
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
          aria-label="Close Chatbot"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-lg shadow-md ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white'
                : msg.sender === 'bot'
                  ? 'bg-gray-700 text-gray-100'
                  : 'bg-yellow-800 text-yellow-100' // For system messages, if any
            }`}>
              {msg.text}
              {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                <div className="mt-2 text-xs text-gray-300">
                  <p className="font-semibold">Sources:</p>
                  <ul className="list-disc list-inside">
                    {msg.groundingUrls.map((url, urlIndex) => (
                      <li key={urlIndex}>
                        <a
                          href={url.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-200 hover:underline"
                          title={url.title || url.uri}
                        >
                          {url.title || new URL(url.uri).hostname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[75%] p-3 rounded-lg shadow-md bg-gray-700 text-gray-100">
              <div className="flex space-x-1">
                <span className="animate-pulse w-2 h-2 bg-gray-400 rounded-full"></span>
                <span className="animate-pulse w-2 h-2 bg-gray-400 rounded-full delay-150"></span>
                <span className="animate-pulse w-2 h-2 bg-gray-400 rounded-full delay-300"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700">
        {!hasApiKey && (
          <div className="mb-3 text-sm text-red-300 text-center">
            API Key not selected. Chat functionality limited.
            <Button variant="outline" onClick={ensureApiKeyAndInitChat} className="mt-2 w-full text-xs py-1">Select API Key</Button>
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
          <input
            type="text"
            className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || !hasApiKey}
            aria-label="Chat input"
          />
          <Button type="submit" disabled={isLoading || !hasApiKey} className="px-4 py-2 text-sm">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;