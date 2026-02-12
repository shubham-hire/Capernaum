import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-navy-950/80 backdrop-blur-md">
      <Link to="/" className="text-2xl font-bold tracking-wider text-cyan-400">
        CAPERNUM
      </Link>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
        <Link to="/" className="hover:text-cyan-400 transition-colors">HOME</Link>
        <Link to="/about" className="hover:text-cyan-400 transition-colors">ABOUT US</Link>
        <a href="#" className="hover:text-cyan-400 transition-colors">SERVICES</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">CONTACT</a>
      </div>
      <button className="hidden md:block px-6 py-2 border border-gray-500 rounded-md text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all">
        SIGN IN
      </button>
    </nav>
  );
};

export default Navbar;
