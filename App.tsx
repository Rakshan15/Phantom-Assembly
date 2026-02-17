
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection'; // New import
import PortfolioSection from './components/PortfolioSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 min-h-screen">
      <Header />
      <main className="pt-20"> {/* Adjust pt-xx based on header height to prevent content overlap */}
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection /> {/* New section added */}
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;