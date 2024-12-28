import React from 'react';
import AboutPage from '@/app/Components/AboutSec/Aboutsec';
import Navbar from '@/app/Components/Navbar/Navbar';
import FAQSection from '@/app/Components/Faqs/Faqs';

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
