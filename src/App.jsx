import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from '../Pages/Shop/Shop';
import Home from '../Pages/Home/Home';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import About from '../Pages/About/About';
import Navbar from './Components/Navbar/Navbar';
import Repair_Booking from '../Pages/Repair Booking/Repair_Booking';
import ContactPage from './Components/Contact/contactcom';
import Contact from '../Pages/Contact/Contact';
import Repair_Track from '../Pages/Repair Track/Repair_Track';

const App = () => {
  return (
    <Router>
    <div>
      <Navbar />
         
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/repair-booking' element={<Repair_Booking />} />
          <Route path='/repair-tracker' element={<Repair_Track />} />
        </Routes>
    

    </div>
    </Router>
  );
};

export default App;

