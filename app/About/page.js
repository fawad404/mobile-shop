import React from 'react';
import Navbar from '@/app/Components/Navbar/Navbar';
import FAQSection from '@/app/Components/Faqs/Faqs';
import AboutPage from '../Components/AboutSec/AboutSec';

const About = () => {
  return (
    <>
    <Navbar />
    <div>
      <AboutPage />
      <FAQSection />
      
    </div>
    </>
  );
};

export default About;
