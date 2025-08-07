import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { Facebook, Github, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-200 py-10 px-6">
      {/* Main Grid Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Info */}
        <div>
          <img
            className="h-20 object-contain mb-4"
            src={assets.mainLogo}
            alt="community-logo"
          />
          <p className="mb-2 font-bold text-lg">Community - Let's Connect Together</p>
          <p className="text-sm text-gray-300">
            This platform is a free space to connect with the world and share your thoughts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {["Home", "Public Posts", "About", "Contact", "Terms & Conditions", "Privacy"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Subscribe */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <Link to="/" aria-label="Facebook" className="hover:text-white">
              <Facebook size={20} />
            </Link>
            <Link to="/" aria-label="Instagram" className="hover:text-white">
              <Instagram size={20} />
            </Link>
            <Link to="/" aria-label="Github" className="hover:text-white">
              <Github size={20} />
            </Link>
            <Link to="/" aria-label="Twitter" className="hover:text-white">
              <Twitter size={20} />
            </Link>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Subscribe Now</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 rounded-md text-black flex-1 bg-white"
              required
            />
            <button
              type="submit"
              className="p-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-gray-700 my-8" />

      {/* Copyright */}
      <section className="text-center text-sm text-gray-400">
        <p>
          &copy; 2023 <a href="/" className="text-white hover:underline">Community</a>. All rights reserved | Developed by{" "}
          <a
            href="https://github.com/Subham-Karn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Subham Karn
          </a>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
