import React from 'react'
import MultiStepForm from '../../src/Components/Multiform/Multiform'
import FAQSection from '../../src/Components/Faqs/Faqs'
import AnimatedServiceSVG from '../../src/assets/AnimatedSvg/fix'

const Repair_Booking = () => {
  return (
    <>
    <div>

    <div className='flex flex-col items-center justify-center mt-16 '>
       <AnimatedServiceSVG />
    </div>
        <MultiStepForm />
        <FAQSection />
    </div>
    </>
  )
}

export default Repair_Booking
