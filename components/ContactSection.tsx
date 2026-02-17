
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import Button from './Button';
import { SOCIAL_LINKS } from '../constants';
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ensureApiKeySelected } from '../utils/apiKeyHelper';


interface CostEstimateForm {
  applicationType: string;
  expectedUsers: string;
  dataStorageNeeds: string;
  performanceRequirement: string;
}

interface ArchitecturalSuggestion {
  cloudProvider: string;
  suggestedServices: string[];
  estimatedMonthlyCostRange: string;
  notes: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const [costEstimateData, setCostEstimateData] = useState<CostEstimateForm>({
    applicationType: '',
    expectedUsers: '',
    dataStorageNeeds: '',
    performanceRequirement: '',
  });
  const [costEstimateResult, setCostEstimateResult] = useState<ArchitecturalSuggestion | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimateError, setEstimateError] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCostEstimateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCostEstimateData({ ...costEstimateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request
      console.log('Contact Form Data Submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus('error');
    }
  };

  const handleCostEstimateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEstimating(true);
    setEstimateError('');
    setCostEstimateResult(null);

    try {
      await ensureApiKeySelected();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Based on the following requirements, suggest a high-level cloud architecture (provider and services) and an estimated monthly cost range for a startup.
      Application Type: ${costEstimateData.applicationType}
      Expected Monthly Users: ${costEstimateData.expectedUsers}
      Data Storage Needs: ${costEstimateData.dataStorageNeeds}
      Performance Requirement: ${costEstimateData.performanceRequirement}

      Provide the response as a JSON object with the following structure:
      {
        "cloudProvider": "string (e.g., AWS, GCP, Azure)",
        "suggestedServices": ["string (e.g., EC2, S3, RDS, Kubernetes, Lambda, App Engine)"],
        "estimatedMonthlyCostRange": "string (e.g., $500 - $1500, $2000 - $5000)",
        "notes": "string (brief explanation)"
      }`;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              cloudProvider: { type: Type.STRING },
              suggestedServices: { type: Type.ARRAY, items: { type: Type.STRING } },
              estimatedMonthlyCostRange: { type: Type.STRING },
              notes: { type: Type.STRING },
            },
            required: ["cloudProvider", "suggestedServices", "estimatedMonthlyCostRange", "notes"],
          },
        },
      });

      const jsonStr = response.text?.trim();
      if (jsonStr) {
        setCostEstimateResult(JSON.parse(jsonStr) as ArchitecturalSuggestion);
      } else {
        setEstimateError("AI did not return a valid JSON response.");
      }
    } catch (error) {
      console.error('Cost estimation error:', error);
      setEstimateError("Failed to generate estimate. Please ensure your API key is selected and try again.");
    } finally {
      setIsEstimating(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Let's Connect"
          subtitle="Ready to build something amazing? Reach out to Phantom Assembly!"
          id="contact"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl animate-fadeInUp">
            <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y transition-all duration-200"
                ></textarea>
              </div>
              <Button type="submit" className="w-full" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Sending Message...' : 'Send Message'}
              </Button>
              {formStatus === 'success' && (
                <p className="text-green-400 text-center mt-4 animate-fadeInUp">Message sent successfully! We'll be in touch soon.</p>
              )}
              {formStatus === 'error' && (
                <p className="text-red-400 text-center mt-4 animate-fadeInUp">Failed to send message. Please try again.</p>
              )}
            </form>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-300 mb-4">You can also find me on:</p>
              <div className="flex justify-center space-x-6">
                {SOCIAL_LINKS.linkedin && (
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300 text-indigo-400 hover:scale-110 transform"
                    aria-label="LinkedIn profile"
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                {SOCIAL_LINKS.github && (
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300 text-gray-400 hover:scale-110 transform"
                    aria-label="GitHub profile"
                  >
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 0C5.372 0 0 5.372 0 12c0 5.308 3.438 9.799 8.205 11.385.6.11.82-.257.82-.572 0-.282-.01-1.033-.015-2.03-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.332-1.758-1.332-1.758-1.09-.744.08-.73.08-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.834 2.808 1.3 3.49.993.109-.775.419-1.3.762-1.6C7.147 17.587 4.45 16.517 4.45 11.006c0-1.3.465-2.361 1.235-3.19-.12-.3-.535-1.51-.117-3.15 0 0 1.008-.32 3.301 1.21.957-.266 1.983-.4 3.003-.404 1.02.004 2.046.138 3.003.404 2.29-1.53 3.298-1.21 3.298-1.21.418 1.64.003 2.85-.118 3.15.77.829 1.233 1.89 1.233 3.19 0 5.52-2.699 6.577-5.297 6.877.436.377.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .318.21.688.829.572C20.565 21.799 24 17.308 24 12c0-6.628-5.372-12-12-12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {SOCIAL_LINKS.twitter && (
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300 text-blue-400 hover:scale-110 transform"
                  aria-label="Twitter profile"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.46 6c-.77.34-1.6.56-2.46.66.88-.53 1.56-1.37 1.88-2.38-.83.49-1.76.85-2.74 1.04-.79-.84-1.92-1.37-3.17-1.37-2.38 0-4.32 1.93-4.32 4.31 0 .34.04.67.11.98-3.59-.18-6.78-1.9-8.91-4.52-.37.64-.58 1.39-.58 2.2 0 1.49.76 2.81 1.91 3.59-.7-.01-1.36-.21-1.93-.53v.06c0 2.08 1.48 3.82 3.44 4.22-.36.1-.75.15-1.15.15-.28 0-.55-.03-.8-.08.55 1.71 2.14 2.95 4.02 2.98-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.91 1.23 4.18 1.94 6.62 1.94 7.95 0 12.29-6.59 12.29-12.29 0-.19-.01-.39-.01-.58.85-.61 1.58-1.37 2.16-2.22z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
          </div>

          {/* Cloud Cost Estimator */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl animate-fadeInUp delay-200">
            <h3 className="text-2xl font-bold text-white mb-6">Cloud Cost Estimator <span className="text-indigo-400 text-lg">(AI Powered)</span></h3>
            <p className="text-gray-300 mb-6">Get a high-level architectural and cost estimate for your next cloud project.</p>
            <form onSubmit={handleCostEstimateSubmit} className="space-y-6">
              <div>
                <label htmlFor="applicationType" className="block text-sm font-medium text-gray-300 mb-2">Application Type</label>
                <input
                  type="text"
                  id="applicationType"
                  name="applicationType"
                  value={costEstimateData.applicationType}
                  onChange={handleCostEstimateChange}
                  placeholder="e.g., E-commerce, SaaS API, Data Analytics"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="expectedUsers" className="block text-sm font-medium text-gray-300 mb-2">Expected Monthly Users</label>
                <input
                  type="text"
                  id="expectedUsers"
                  name="expectedUsers"
                  value={costEstimateData.expectedUsers}
                  onChange={handleCostEstimateChange}
                  placeholder="e.g., 10,000, 1 million, variable"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="dataStorageNeeds" className="block text-sm font-medium text-gray-300 mb-2">Data Storage Needs</label>
                <input
                  type="text"
                  id="dataStorageNeeds"
                  name="dataStorageNeeds"
                  value={costEstimateData.dataStorageNeeds}
                  onChange={handleCostEstimateChange}
                  placeholder="e.g., 50GB database, 1TB object storage"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="performanceRequirement" className="block text-sm font-medium text-gray-300 mb-2">Performance Requirement</label>
                <input
                  type="text"
                  id="performanceRequirement"
                  name="performanceRequirement"
                  value={costEstimateData.performanceRequirement}
                  onChange={handleCostEstimateChange}
                  placeholder="e.g., Low latency, high throughput, real-time"
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isEstimating}>
                {isEstimating ? 'Generating Estimate...' : 'Get AI Estimate'}
              </Button>
              {estimateError && <p className="text-red-400 text-center mt-4">{estimateError}</p>}
            </form>

            {costEstimateResult && (
              <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-inner animate-fadeInUp">
                <h4 className="text-xl font-bold text-indigo-400 mb-3">Suggested Architecture:</h4>
                <p className="text-gray-300 mb-2"><strong className="text-white">Cloud Provider:</strong> {costEstimateResult.cloudProvider}</p>
                <p className="text-gray-300 mb-2"><strong className="text-white">Suggested Services:</strong> {costEstimateResult.suggestedServices.join(', ')}</p>
                <p className="text-gray-300 mb-2"><strong className="text-white">Estimated Monthly Cost:</strong> {costEstimateResult.estimatedMonthlyCostRange} (this is a high-level estimate)</p>
                <p className="text-gray-300"><strong className="text-white">Notes:</strong> {costEstimateResult.notes}</p>
                <p className="text-sm text-gray-500 mt-4">Disclaimer: This is an AI-generated estimate and actual costs may vary. For precise planning, please contact us directly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;