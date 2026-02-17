
import React from 'react';
import { COMPANY_NAME, FOUNDER_NAME, FOUNDER_DESCRIPTION, COMPANY_MISSION, FOUNDER_IMAGE_URL } from '../constants';
import SectionTitle from './SectionTitle';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle
          title={`About ${FOUNDER_NAME} & ${COMPANY_NAME}`}
          subtitle="Innovating the cloud landscape with passion and precision."
          id="about"
        />
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="md:w-1/2 animate-slideInLeft">
            <img
              src={FOUNDER_IMAGE_URL}
              alt={`${FOUNDER_NAME} Profile`}
              className="rounded-xl shadow-2xl object-cover w-full h-96 transform hover:scale-105 transition-transform duration-500 ease-in-out border-2 border-indigo-600 object-top"
            />
          </div>
          <div className="md:w-1/2 text-left animate-slideInRight">
            <h3 className="text-3xl font-bold text-white mb-4">
              Our Mission: {COMPANY_MISSION}
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              At <span className="text-indigo-400 font-semibold">{COMPANY_NAME}</span>, we are driven by a singular vision: to empower businesses with cutting-edge cloud and operations solutions. Founded by {FOUNDER_NAME}, an experienced Operations and Cloud Engineer, our company is built on a foundation of technical excellence and a deep understanding of modern software infrastructure.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {FOUNDER_DESCRIPTION} Our commitment is to deliver solutions that are not just functional, but also resilient, cost-effective, and future-proof, ensuring your success in a rapidly evolving tech landscape.
            </p>
            <div className="mt-8">
                <h4 className="text-xl font-semibold text-white mb-3">Key Areas of Expertise:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Cloud Platforms (AWS, Azure, GCP)</li>
                    <li>DevOps & CI/CD Tooling</li>
                    <li>Kubernetes & Containerization</li>
                    <li>Infrastructure as Code (Terraform)</li>
                    <li>Site Reliability Engineering (SRE)</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;