
import React, { useEffect, useRef } from 'react';
import Button from './Button';

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close modal when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex items-center justify-center p-4 overflow-y-auto animate-fadeInUp" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl transform scale-95 animate-zoomIn border border-indigo-700">
        <div className="flex justify-between items-center pb-4 border-b border-gray-700 mb-4">
          <h3 id="modal-title" className="text-2xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-1"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-gray-200">
          {children}
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;