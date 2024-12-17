import React from 'react'
import HeroSection from '../../src/Components/Hero Section/Herosection'
import FeaturesSection from '../../src/Components/Cards/cards'
import SocialReviews from '../../src/Components/Social Reviews/Social-reviews'
import Navbar from '../../src/Components/Navbar/Navbar'
import Footer from '../../src/Components/Footer/Footer'

const Home = () => {
  return (
    <>
    <div>
      <HeroSection />
      <FeaturesSection />
      <SocialReviews />
    </div>

    <Footer />
    </>
  )
}

export default Home
