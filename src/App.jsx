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
import Checkoutt from '../Pages/CheckOut/Checkoutt';
import Login from '../Pages/Login/Login';

const App = () => {
  return (
    <Router>
    <div>
      <Navbar />
         
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/product/:id" element={<ProductDetail />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/repair-booking' element={<Repair_Booking />} />
          <Route path='/repair-tracker' element={<Repair_Track />} />
          <Route path='/check-out' element={<Checkoutt />} />
        </Routes>
    

    </div>
    </Router>
  );
};

export default App;

