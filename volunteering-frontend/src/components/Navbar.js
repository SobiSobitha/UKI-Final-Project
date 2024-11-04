
import React from 'react';
import './Navbar.css';
import logo from '../components/VOLUNTRY.png';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-indigo-900 text-white p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a href="/" className="text-xl font-bold">
            <img src="VOLUNTRY.png" alt="Logo" className="h-10 w-10" />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <a href="#home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact Us
            </a>
          </li>
        </ul>

        {/* Desktop Login Button */}
        <button className="hidden md:inline-flex border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-indigo-900">
          Login
        </button>
      </div>
    </nav>
  );
}

