import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories } from '../../data/mockData'

export const StickyNavBar = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMegaMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCategorySelect = (catId) => {
    setIsMegaMenuOpen(false)
    navigate(`/categories/${catId}`)
  }

  return (
    <nav className="w-full bg-primary text-white sticky top-[90px] lg:top-[90px] z-20 shadow-md">
      <div className="w-full max-w-[1320px] mx-auto px-10 h-14 flex items-center justify-between relative">
        {/* Left: Mega Menu Trigger */}
        <div ref={menuRef} className="h-full flex items-center">
          <button
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            className="flex items-center gap-2 h-full px-5 bg-secondary text-text-dark font-bold text-sm hover:bg-orange-500 transition-colors duration-200 focus:outline-none select-none"
            aria-expanded={isMegaMenuOpen}
            aria-haspopup="true"
          >
            <span className="material-symbols-outlined select-none text-xl">menu</span>
            <span>SHOP BY CATEGORY</span>
            <span className="material-symbols-outlined select-none text-sm">
              {isMegaMenuOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>

          {/* Mega Menu Dropdown Overlay */}
          {isMegaMenuOpen && (
            <div className="absolute left-10 top-14 w-80 bg-surface-lowest border border-outline-variant rounded-b-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.18)] z-50 py-3 text-text-dark animate-fadeIn">
              <div className="px-4 py-1.5 text-[10px] font-bold text-text-muted uppercase tracking-wider border-b border-outline-variant mb-2">
                All Departments
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-high transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl select-none">
                      {cat.icon}
                    </span>
                    <span className="text-sm font-semibold">{cat.name}</span>
                  </div>
                  <span className="material-symbols-outlined text-text-muted text-sm select-none">
                    chevron_right
                  </span>
                </button>
              ))}
              <hr className="my-2 border-outline-variant" />
              <button
                onClick={() => handleCategorySelect('all')}
                className="w-full text-center py-2 text-xs font-bold text-secondary hover:text-orange-600 transition-colors uppercase tracking-wider"
              >
                Browse All Products
              </button>
            </div>
          )}
        </div>

        {/* Center: Scrollable Category links */}
        <div className="flex items-center h-full overflow-x-auto scrollbar-none gap-6 px-4 md:px-0">
          <Link
            to="/categories/kitchen"
            className="text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-secondary h-full flex items-center border-b-2 border-transparent hover:border-secondary transition-all"
          >
            Kitchen
          </Link>
          <Link
            to="/categories/bathroom"
            className="text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-secondary h-full flex items-center border-b-2 border-transparent hover:border-secondary transition-all"
          >
            Bathroom
          </Link>
          <Link
            to="/categories/pipes"
            className="text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-secondary h-full flex items-center border-b-2 border-transparent hover:border-secondary transition-all"
          >
            Pipes & Fittings
          </Link>
          <Link
            to="/categories/valves"
            className="text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-secondary h-full flex items-center border-b-2 border-transparent hover:border-secondary transition-all"
          >
            Water Heaters & Valves
          </Link>
          <Link
            to="/categories/tools"
            className="text-xs font-semibold uppercase tracking-wider text-gray-200 hover:text-secondary h-full flex items-center border-b-2 border-transparent hover:border-secondary transition-all"
          >
            Tools & Brands
          </Link>
        </div>

        {/* Right: Deals Link */}
        <Link
          to="/deals"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary hover:text-orange-400 h-full border-b-2 border-transparent hover:border-secondary transition-all"
        >
          <span className="material-symbols-outlined text-sm select-none animate-pulse">
            local_offer
          </span>
          <span>DEALS</span>
        </Link>
      </div>
    </nav>
  )
}
export default StickyNavBar
