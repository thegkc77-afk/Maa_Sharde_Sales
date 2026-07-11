import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const [openSections, setOpenSections] = useState({
    shop: false,
    customer: false,
    account: false,
    contact: false,
  })
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="w-full bg-[#0d2b45] text-white pt-16 pb-8 border-t border-gray-800">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-gray-800">
          {/* Corporate Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-2xl">plumbing</span>
              <span className="text-lg font-bold tracking-tight">MAA SHARDE</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Premium B2C and Pro contractor plumbing supply ecommerce. Supplying high-quality faucets, fittings, pipes, and valves across the country.
            </p>
            {/* Certifications badges */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[9px] bg-gray-800 border border-gray-700 text-gray-300 font-bold px-1.5 py-1 rounded">
                Lead-Free NSF
              </span>
              <span className="text-[9px] bg-gray-800 border border-gray-700 text-gray-300 font-bold px-1.5 py-1 rounded">
                WaterSense
              </span>
              <span className="text-[9px] bg-gray-800 border border-gray-700 text-gray-300 font-bold px-1.5 py-1 rounded">
                ADA Compliant
              </span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleSection('shop')}
              className="flex items-center justify-between w-full md:cursor-default text-sm font-bold tracking-wider uppercase text-secondary mb-3 md:mb-4 focus:outline-none"
            >
              <span>Shop Departments</span>
              <span className="material-symbols-outlined md:hidden">
                {openSections.shop ? 'remove' : 'add'}
              </span>
            </button>
            <div className={`${openSections.shop ? 'block' : 'hidden'} md:block flex flex-col gap-2 text-xs text-gray-400`}>
              <Link to="/categories/kitchen" className="hover:text-secondary transition-colors">Kitchen Faucets</Link>
              <Link to="/categories/bathroom" className="hover:text-secondary transition-colors">Bathroom Fixtures</Link>
              <Link to="/categories/pipes" className="hover:text-secondary transition-colors">Pipes & Tubing</Link>
              <Link to="/categories/valves" className="hover:text-secondary transition-colors">Valves & Brass Fittings</Link>
              <Link to="/categories/tools" className="hover:text-secondary transition-colors">Wrenches & Hardware</Link>
              <Link to="/categories/all" className="hover:text-secondary transition-colors">All Categories</Link>
            </div>
          </div>

          {/* Customer Service Column */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleSection('customer')}
              className="flex items-center justify-between w-full md:cursor-default text-sm font-bold tracking-wider uppercase text-secondary mb-3 md:mb-4 focus:outline-none"
            >
              <span>Customer Service</span>
              <span className="material-symbols-outlined md:hidden">
                {openSections.customer ? 'remove' : 'add'}
              </span>
            </button>
            <div className={`${openSections.customer ? 'block' : 'hidden'} md:block flex flex-col gap-2 text-xs text-gray-400`}>
              <Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link>
              <Link to="/support" className="hover:text-secondary transition-colors">Shipping & Returns Policy</Link>
              <Link to="/support" className="hover:text-secondary transition-colors">Warranty & Fitment Guides</Link>
              <Link to="/support" className="hover:text-secondary transition-colors">FAQ</Link>
              <Link to="/track-order" className="hover:text-secondary transition-colors">Order Tracking</Link>
            </div>
          </div>

          {/* Account & Newsletter Column */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleSection('account')}
              className="flex items-center justify-between w-full md:cursor-default text-sm font-bold tracking-wider uppercase text-secondary mb-3 md:mb-4 focus:outline-none"
            >
              <span>My Account</span>
              <span className="material-symbols-outlined md:hidden">
                {openSections.account ? 'remove' : 'add'}
              </span>
            </button>
            <div className={`${openSections.account ? 'block' : 'hidden'} md:block flex flex-col gap-2 text-xs text-gray-400`}>
              <Link to="/account" className="hover:text-secondary transition-colors">Login / Dashboard</Link>
              <Link to="/account?tab=orders" className="hover:text-secondary transition-colors">Order Invoices</Link>
              <Link to="/account?tab=wishlist" className="hover:text-secondary transition-colors">Project Wishlist</Link>
              
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase text-white">Join Newsletter</span>
                <form onSubmit={handleSubscribe} className="flex rounded-[10px] overflow-hidden border border-gray-700 bg-gray-900">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="px-3 py-1.5 text-xs text-white bg-transparent outline-none flex-grow placeholder:text-gray-600"
                    required
                  />
                  <button type="submit" className="bg-secondary text-text-dark hover:bg-orange-500 font-bold text-xs px-3 transition-colors">
                    Go
                  </button>
                </form>
                {subscribed && (
                  <span className="text-[10px] text-green-400 font-medium">Subscribed successfully!</span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleSection('contact')}
              className="flex items-center justify-between w-full md:cursor-default text-sm font-bold tracking-wider uppercase text-secondary mb-3 md:mb-4 focus:outline-none"
            >
              <span>Contact Us</span>
              <span className="material-symbols-outlined md:hidden">
                {openSections.contact ? 'remove' : 'add'}
              </span>
            </button>
            <div className={`${openSections.contact ? 'block' : 'hidden'} md:block flex flex-col gap-2.5 text-xs text-gray-400`}>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-secondary mt-0.5">phone</span>
                <div>
                  <p className="font-bold text-white">1-800-234-5677</p>
                  <p className="text-[10px] text-gray-500">Toll-Free Mon-Fri 8am-6pm EST</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-secondary mt-0.5">email</span>
                <p>support@maashardeplumbing.com</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-secondary mt-0.5">store</span>
                <p>100 Industrial Parkway, Suite A, Detroit, MI 48201</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[10px] text-gray-500">
          <p>© 2026 Maa Sharde Plumbing Supply Pro. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link to="/support" className="hover:text-secondary">Privacy Policy</Link>
            <span>•</span>
            <Link to="/support" className="hover:text-secondary">Terms of Service</Link>
            <span>•</span>
            <Link to="/support" className="hover:text-secondary">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
