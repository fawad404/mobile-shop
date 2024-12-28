import React from 'react'

import FeaturesSection from '@/app/Components/Cards/cards'
import SocialReviews from '@/app/Components/Social Reviews/Social-reviews'
import Navbar from '@/app/Components/Navbar/Navbar'
import Footer from '@/app/Components/Footer/Footer'
import HeroSection from '@/app/Components/Hero Section/Herosection'

const HomePage = () => {
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

export default HomePage
