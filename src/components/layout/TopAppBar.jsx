import React from 'react'
import { Link } from 'react-router-dom'

export const TopAppBar = () => {
  return (
    <div className="w-full bg-[#071b2c] text-white text-xs border-b border-gray-800">
      <div className="w-full max-w-[1320px] mx-auto px-10 h-10 flex items-center justify-between">
        {/* Left: Promos & Locator */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-secondary">
              local_shipping
            </span>
            <span>Free Shipping on Orders over $150</span>
          </div>
          <span className="text-gray-600 hidden md:inline">|</span>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-tertiary">
              location_on
            </span>
            <span className="hover:text-secondary cursor-pointer transition-colors duration-150">
              Store Locator
            </span>
          </div>
        </div>

        {/* Right: Info Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-gray-300">
          <Link to="/about" className="hover:text-secondary transition-colors duration-150">
            About Us
          </Link>
          <span className="text-gray-800">|</span>
          <Link to="/track-order" className="hover:text-secondary transition-colors duration-150">
            Track Order
          </Link>
          <span className="text-gray-800">|</span>
          <Link to="/support" className="hover:text-secondary transition-colors duration-150">
            Customer Support
          </Link>
          <span className="text-gray-800">|</span>
          <Link to="/contact" className="hover:text-secondary transition-colors duration-150">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
export default TopAppBar
