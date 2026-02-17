
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
                {/* Client Avatar - using static placeholder for now */}
                <img
                  src={`https://i.pravatar.cc/60?img=${index + 1}`}
                  alt={quote.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                  <p className="font-semibold text-white">{quote.clientName}</p>
                  <p className="text-sm text-indigo-400">{quote.clientTitle}</p>
                  {/* Optional Company Logo and LinkedIn */}
                  <div className="flex items-center mt-2 space-x-2">
                    {quote.clientCompanyLogo && (
                      <img
                        src={quote.clientCompanyLogo}
                        alt="Company Logo"
                        className="h-5 w-auto filter grayscale opacity-75 hover:opacity-100 transition-opacity duration-300"
                        title="Client Company"
                      />
                    )}
                    {quote.clientLinkedIn && (
                      <a
                        href={quote.clientLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-indigo-400 transition-colors duration-300"
                        aria-label={`LinkedIn profile of ${quote.clientName}`}
                        title={`Connect with ${quote.clientName} on LinkedIn`}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                  </div>
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