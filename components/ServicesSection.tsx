
import React from 'react';
import { SERVICES } from '../constants';
import SectionTitle from './SectionTitle';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Core Expertise"
          subtitle="Delivering comprehensive cloud and operations solutions tailored to accelerate your business."
          id="services"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:border-indigo-500 border border-transparent animate-zoomIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-6 text-indigo-400 flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900 bg-opacity-30 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
