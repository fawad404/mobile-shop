import React from 'react';
import AboutPage from '../../src/Components/AboutSec/Aboutsec';
import Navbar from '../../src/Components/Navbar/Navbar';
import FAQSection from '../../src/Components/Faqs/Faqs';

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
