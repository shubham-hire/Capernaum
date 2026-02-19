// import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#0a0f1e]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-5">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full border-2 border-amber-400 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-lg">C</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-wider leading-none">
                    CAPERNAUM<sup className="text-[8px] ml-0.5">™</sup>
                  </h3>
                  <p className="text-[9px] text-amber-400/80 tracking-[0.2em] uppercase leading-none mt-0.5">
                    Solutions Pvt Ltd
                  </p>
                  <p className="text-[7px] text-gray-500 tracking-[0.15em] italic mt-0.5">
                    — Place of Support —
                  </p>
                </div>
              </Link>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We are committed to transparency, integrity, and clear communication, forming long-term partnerships through trust, consistency, and excellence in service.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  label: 'Facebook',
                  path: 'M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z',
                },
                {
                  label: 'Instagram',
                  path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
                },
                {
                  label: 'LinkedIn',
                  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full border border-amber-400/40 flex items-center justify-center hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Menu Column */}
          <div>
            <h4 className="text-amber-400 font-bold text-sm tracking-wider mb-6 uppercase">
              Menu
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', to: '/' },
                { name: 'About Us', to: '/about' },
                { name: 'Contact Us', to: '/contact' },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="text-gray-400 text-sm hover:text-cyan-400 hover:pl-1 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-amber-400 font-bold text-sm tracking-wider mb-6 uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                'Customer Support',
                'Quality Assurance',
                'Lead Generation',
                'IT Solution',
                'Digital Marketing',
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to="/services"
                    className="text-gray-400 text-sm hover:text-cyan-400 hover:pl-1 transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links Column */}
          <div>
            <h4 className="text-amber-400 font-bold text-sm tracking-wider mb-6 uppercase">
              More Links
            </h4>
            <ul className="space-y-3">
              {['Careers', 'Privacy Policy', 'Cookie Policy'].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-400 text-sm hover:text-cyan-400 hover:pl-1 transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">
            © Copyright 2025 capernaum.in. All Rights Reserved
          </p>
          <p className="text-gray-500 text-xs">
            Powered by{' '}
            <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">
              Logobigo India
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
