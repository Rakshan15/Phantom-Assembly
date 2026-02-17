
import React from 'react';
import { PORTFOLIO_PROJECTS } from '../constants';
import SectionTitle from './SectionTitle';

const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Our Work in Action"
          subtitle="Showcasing impactful projects in cloud architecture, DevOps, and SRE."
          id="portfolio"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_PROJECTS.map((project, index) => (
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
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-indigo-700 text-indigo-100 text-xs px-3 py-1 rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
