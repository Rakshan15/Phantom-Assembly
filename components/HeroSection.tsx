
import React from 'react';
import { COMPANY_NAME, COMPANY_SLOGAN } from '../constants';
import Button from './Button';

const HeroSection: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://unsplash.com/photos/a-blue-and-purple-abstract-background-with-lines-and-dots-qZk9QJ7b-m0/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzE3ODc0NjY3fA&force=true&w=1920&h=1080')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-indigo-900 opacity-80"></div>
      <div className="z-10 text-center text-white p-8 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fadeInUp delay-100">
          <span className="text-indigo-400 drop-shadow-lg">{COMPANY_NAME}</span>
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-8 max-w-3xl mx-auto animate-fadeInUp delay-300">
          {COMPANY_SLOGAN}
        </p>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fadeInUp delay-500">
          Your partner in transforming ideas into robust, scalable, and secure cloud solutions. We build the future of your digital infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fadeInUp delay-700">
          <Button variant="primary" onClick={() => handleScrollTo('services')}>Explore Our Services</Button>
          <Button variant="outline" onClick={() => handleScrollTo('contact')}>Get a Consultation</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
