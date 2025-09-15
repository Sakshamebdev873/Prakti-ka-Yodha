import React from 'react';
import Hero from './components/home/Hero';
import Features from './components/home/Features';
import HowItWorks from './components/home/HowItWorks';
import CollectiveImpact from './components/home/CollectiveImpact';
import Testimonials from './components/home/Testimonials';
import PlatformPreview from './components/home/PlatformPreview';
import FinalCTA from './components/home/FinalCTA';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <CollectiveImpact />
      <Testimonials />
      <PlatformPreview />
      <FinalCTA />
    </div>
  );
};

export default HomePage;