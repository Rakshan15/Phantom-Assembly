
import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PortfolioSection from './components/PortfolioSection';
import BlogSection from './components/BlogSection'; // New import
import VibeVisualizer from './components/VibeVisualizer'; // New import
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot'; // New import

const App: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  return (
    <div className="relative overflow-hidden bg-gray-900 min-h-screen">
      <Header toggleChatbot={toggleChatbot} />
      <main className="pt-24"> {/* Adjusted pt-xx based on header height to prevent content overlap and account for animations */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <PortfolioSection />
        <BlogSection /> {/* New section added */}
        <VibeVisualizer /> {/* New section added */}
        <ContactSection />
      </main>
      <Footer />
      <Chatbot isOpen={isChatbotOpen} onClose={toggleChatbot} /> {/* Chatbot component */}
    </div>
  );
};

export default App;