
import React from 'react';
import { QUOTES } from '../constants';
import SectionTitle from './SectionTitle';

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="What Our Partners Say"
          subtitle="Hear directly from the businesses we've empowered."
          id="testimonials"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUOTES.map((quote, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-transparent hover:border-indigo-500 relative animate-fadeInUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="absolute top-0 left-0 -mt-4 -ml-4 text-7xl text-indigo-600 opacity-20 transform -rotate-12">
                &ldquo;
              </div>
              <p className="text-gray-200 text-lg italic leading-relaxed mb-6 z-10 relative">
                {quote.quote}
              </p>
              <div className="border-t border-gray-700 pt-6 flex items-center space-x-4">
                <img
                  src={`https://i.pravatar.cc/60?img=${index + 1}`} // Placeholder for client avatar
                  alt={quote.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <p className="font-semibold text-white">{quote.clientName}</p>
                  <p className="text-sm text-indigo-400">{quote.clientTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
