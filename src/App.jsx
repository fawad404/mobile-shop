import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from '../Pages/Shop/Shop';
import Home from '../Pages/Home/Home';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import About from '../Pages/About/About';


const App = () => {
  return (
    <>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/product/:id" element={<ProductDetail />} />
        <Route path='/about' element={<About />} />
      
      </Routes>
    </Router>
    </>
  );
};

export default App;
