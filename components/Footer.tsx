
import React from 'react';
import { COMPANY_NAME, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 border-t border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-6 text-lg">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          {SOCIAL_LINKS.linkedin && (
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 text-indigo-400 transform hover:scale-110"
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
              className="hover:text-white transition-colors duration-300 text-gray-400 transform hover:scale-110"
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
              className="hover:text-white transition-colors duration-300 text-blue-400 transform hover:scale-110"
              aria-label="Twitter profile"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.46 6c-.77.34-1.6.56-2.46.66.88-.53 1.56-1.37 1.88-2.38-.83.49-1.76.85-2.74 1.04-.79-.84-1.92-1.37-3.17-1.37-2.38 0-4.32 1.93-4.32 4.31 0 .34.04.67.11.98-3.59-.18-6.78-1.9-8.91-4.52-.37.64-.58 1.39-.58 2.2 0 1.49.76 2.81 1.91 3.59-.7-.01-1.36-.21-1.93-.53v.06c0 2.08 1.48 3.82 3.44 4.22-.36.1-.75.15-1.15.15-.28 0-.55-.03-.8-.08.55 1.71 2.14 2.95 4.02 2.98-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.91 1.23 4.18 1.94 6.62 1.94 7.95 0 12.29-6.59 12.29-12.29 0-.19-.01-.39-.01-.58.85-.61 1.58-1.37 2.16-2.22z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
