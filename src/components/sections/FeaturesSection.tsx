import React from 'react';

const FeatureItem = ({ icon, title, description }: { icon: JSX.Element, title: string, description: string }) => (
  <div data-aos="fade-up" data-aos-delay="100" className="text-center">
    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-accent/50 bg-dark-base text-brand-accent">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-bold text-light-text">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-black/20" id="features">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-light-text md:text-4xl">
            Engineered for the Cosmos
          </h2>
          <p className="text-lg text-gray-400">
            Cutting-edge technology meets ethereal design.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <FeatureItem
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.414-1.414M14.586 14.586L16 16m-2.828-8.414L12 9m0 6l-1.414 1.414" /></svg>}
            title="Cosmic Sound"
            description="Experience a vast, 3D soundstage with our custom-tuned audio drivers."
          />
          <FeatureItem
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title="All-Day Battery"
            description="Up to 30 hours of listening time with the compact charging case."
          />
          <FeatureItem
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m5 10v4m-2-2h4" /></svg>}
            title="Zero Gravity Fit"
            description="Ergonomically designed for weightless comfort and a secure fit, no matter the activity."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;