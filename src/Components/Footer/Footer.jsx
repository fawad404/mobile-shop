import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, Home } from 'lucide-react';
import logo from '../../assets/Images/logo.png';
import tempImg from '../../assets/Images/temp.png';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-16 px-6 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className='w-14 h-14'/>
            </div>
            <p className="text-base text-gray-500">
              The one-stop shop for mobile phones, accessories and repairs
            </p>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Get in touch</h3>
              <p className="text-base">Company Number: 15283128</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-base hover:underline">Blog</a></li>
              <li><a href="#" className="text-base hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-base hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="text-base hover:underline">Shipping & Refunds Policy</a></li>
              <li><a href="#" className="text-base hover:underline">Return Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-x-6 space-y-4 text-base flex flex-col">
              <div className="flex items-center space-x-3 justify-center">
                <MapPin className="h-6 w-6 flex-shrink-0" />
                <p>Store Location: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet accusantium velit fugiat harum aperiam sit unde veniam quia numquam?</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 flex-shrink-0" />
                <p>+12  34 71928743</p>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 flex-shrink-0" />
                <p>contact@temp.co.uk</p>
              </div>
            </div>
          </div>

          {/* We Accept */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">We Accept</h3>
            <div className="grid grid-cols-4 gap-3">
              {['Visa', 'PayPal', 'Mastercard', 'American Express', 'Discover', 'Diners Club', 'JCB', 'Union Pay'].map((card) => (
                <img key={card} src={tempImg} alt={card} className="object-contain h-10" />
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Customer Service:</p>
                  <p className="text-base">Monday – Saturday from 9:00am to 6:00pm</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Home className="h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Company Address:</p>
                  <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, a?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

