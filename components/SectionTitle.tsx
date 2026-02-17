
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, id }) => {
  return (
    <div id={id} className="text-center mb-12 scroll-mt-24">
      <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-xl text-indigo-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
