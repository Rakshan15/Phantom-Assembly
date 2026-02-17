
import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, PORTFOLIO_TAGS } from '../constants';
import SectionTitle from './SectionTitle';
import Modal from './Modal'; // Assuming a Modal component is created/exists
import Button from './Button';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ensureApiKeySelected } from '../utils/apiKeyHelper';


interface AiInsights {
  challenges: string;
  techStackChoice: string;
  futureEnhancements: string;
}

const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<string | AiInsights | null>(null);
  const [isLoadingAiInsights, setIsLoadingAiInsights] = useState(false);
  const [aiInsightError, setAiInsightError] = useState('');

  const filteredProjects = activeFilter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(project => project.tags.includes(activeFilter));

  const generateAiInsights = async (projectDescription: string, projectTitle: string) => {
    setIsLoadingAiInsights(true);
    setAiInsightError('');
    setModalTitle(`AI Insights for "${projectTitle}"`);
    setIsModalOpen(true); // Open modal to show loading state

    try {
      await ensureApiKeySelected();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the project description: "${projectDescription}". Generate AI insights including:
        1. Key Challenges Addressed (summarize in 2-3 sentences).
        2. Why this tech stack was chosen (explain in 2-3 sentences).
        3. Potential Future Enhancements (suggest 2-3 points).
        Format the output as a JSON object with keys: 'challenges', 'techStackChoice', 'futureEnhancements'.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              challenges: { type: "STRING" },
              techStackChoice: { type: "STRING" },
              futureEnhancements: { type: "STRING" },
            },
            required: ["challenges", "techStackChoice", "futureEnhancements"],
          },
        },
      });

      const jsonStr = response.text?.trim();
      if (jsonStr) {
        setModalContent(JSON.parse(jsonStr) as AiInsights);
      } else {
        setAiInsightError("AI did not return a valid JSON response.");
        setModalContent(null);
      }
    } catch (error) {
      console.error("Error generating AI insights:", error);
      setAiInsightError("Failed to generate AI insights. Please try again or select your API key.");
      setModalContent(null);
    } finally {
      setIsLoadingAiInsights(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalContent(null);
    setAiInsightError('');
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Work in Action"
          subtitle="Showcasing impactful projects in cloud architecture, DevOps, and SRE."
          id="portfolio"
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeInUp">
          {PORTFOLIO_TAGS.map(tag => (
            <Button
              key={tag}
              variant={activeFilter === tag ? 'primary' : 'secondary'}
              onClick={() => setActiveFilter(tag)}
              className="px-5 py-2 rounded-full text-sm font-medium"
            >
              {tag}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 animate-zoomIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 flex flex-col h-full">
                <p className="text-gray-300 leading-relaxed mb-4 text-sm flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-indigo-700 text-indigo-100 text-xs px-3 py-1 rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => generateAiInsights(project.description, project.title)}
                  className="mt-auto"
                >
                  <span className="inline-block mr-2">🤖</span> AI Insights
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal} title={modalTitle}>
          {isLoadingAiInsights ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-indigo-300">Generating AI insights...</p>
            </div>
          ) : aiInsightError ? (
            <p className="text-red-400 text-center py-8">{aiInsightError}</p>
          ) : modalContent && typeof modalContent !== 'string' ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Key Challenges Addressed:</h4>
                <p className="text-gray-300">{modalContent.challenges}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Why this tech stack was chosen:</h4>
                <p className="text-gray-300">{modalContent.techStackChoice}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Potential Future Enhancements:</h4>
                <p className="text-gray-300">{modalContent.futureEnhancements}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-300">No insights available.</p>
          )}
        </Modal>
      )}
    </section>
  );
};

export default PortfolioSection;