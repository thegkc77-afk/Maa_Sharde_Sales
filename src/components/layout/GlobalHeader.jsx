import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { useUserStore } from '../../store/useUserStore'
import { SearchBar } from './SearchBar'

export const GlobalHeader = () => {
  const navigate = useNavigate()
  const { cartItems, toggleCart } = useCartStore()
  const { userSession, wishlistItems, logoutUser } = useUserStore()
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  
  const accountRef = useRef(null)

  // Calculate cart metrics
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Close account dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logoutUser()
    setIsAccountOpen(false)
    navigate('/account')
  }

  return (
    <header className="w-full bg-surface-lowest border-b border-outline-variant sticky top-0 z-30 shadow-sm">
      <div className="w-full max-w-[1320px] mx-auto px-10 h-[90px] flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="material-symbols-outlined text-3xl text-secondary select-none">
            plumbing
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-primary leading-none">
              MAA SHARDE
            </span>
            <span className="text-[10px] font-bold tracking-widest text-secondary uppercase leading-none mt-1">
              Plumbing Supply Pro
            </span>
          </div>
        </Link>

        {/* Global Search Box (Desktop) */}
        <div className="hidden lg:block flex-grow max-w-[550px]">
          <SearchBar />
        </div>

        {/* Need Help Phone Contact */}
        <div className="hidden xl:flex flex-col text-right flex-shrink-0">
          <span className="text-[11px] text-text-muted font-medium">Need Expert Help?</span>
          <a href="tel:18002345677" className="text-sm font-bold text-primary hover:text-secondary transition-colors">
            1-800-234-5677
          </a>
        </div>

        {/* Actions Menu */}
        <div className="flex items-center gap-6">
          {/* Account Dropdown */}
          <div ref={accountRef} className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex items-center gap-2 text-text-dark hover:text-secondary transition-colors duration-150 py-1.5 focus:outline-none"
              aria-expanded={isAccountOpen}
              aria-haspopup="true"
            >
              <span className="material-symbols-outlined text-2xl select-none">
                account_circle
              </span>
              <div className="hidden md:flex flex-col text-left text-xs leading-tight">
                <span className="text-text-muted">Hello,</span>
                <span className="font-semibold truncate max-w-[80px]">
                  {userSession.isLoggedIn ? userSession.name : 'Sign In'}
                </span>
              </div>
              <span className="material-symbols-outlined text-sm select-none">
                keyboard_arrow_down
              </span>
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-surface-lowest border border-outline-variant rounded-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.18)] py-2 z-50 animate-fadeIn">
                {userSession.isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 border-b border-outline-variant">
                      <p className="text-xs text-text-muted">Signed in as</p>
                      <p className="text-sm font-bold text-text-dark truncate">{userSession.name}</p>
                      {userSession.isProContractor && (
                        <span className="inline-block mt-1 text-[9px] bg-primary text-white font-bold px-1.5 py-0.5 rounded">
                          PRO CONTRACTOR
                        </span>
                      )}
                    </div>
                    <Link
                      to="/account"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2 text-xs text-text-dark hover:bg-surface-high transition-colors font-medium"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      to="/account?tab=orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2 text-xs text-text-dark hover:bg-surface-high transition-colors font-medium"
                    >
                      Order History
                    </Link>
                    {userSession.isProContractor && (
                      <Link
                        to="/account?tab=boards"
                        onClick={() => setIsAccountOpen(false)}
                        className="block px-4 py-2 text-xs text-text-dark hover:bg-surface-high transition-colors font-medium"
                      >
                        Saved Project Boards
                      </Link>
                    )}
                    <hr className="my-1 border-outline-variant" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs text-success hover:bg-red-50 transition-colors font-semibold"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="p-3 flex flex-col gap-2">
                    <p className="text-xs text-text-muted text-center">Log in to view Pro-Grade prices and order history.</p>
                    <Link
                      to="/account"
                      onClick={() => setIsAccountOpen(false)}
                      className="text-center bg-primary text-white text-xs font-semibold py-2 rounded-[10px] hover:bg-secondary hover:text-text-dark transition-colors duration-200"
                    >
                      Login / Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Link */}
          <Link
            to="/account?tab=wishlist"
            className="relative flex items-center gap-1.5 text-text-dark hover:text-secondary transition-colors duration-150 py-1.5"
            aria-label={`Wishlist: ${wishlistItems.length} items`}
          >
            <span className="material-symbols-outlined text-2xl select-none">
              favorite
            </span>
            <div className="hidden md:flex flex-col text-left text-xs leading-tight">
              <span className="text-text-muted">My</span>
              <span className="font-semibold">Wishlist</span>
            </div>
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 left-4 bg-red-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-1.5 text-text-dark hover:text-secondary transition-colors duration-150 py-1.5 focus:outline-none"
            aria-label={`Open Cart: ${totalItemCount} items`}
          >
            <span className="material-symbols-outlined text-2xl select-none">
              shopping_cart
            </span>
            <div className="hidden md:flex flex-col text-left text-xs leading-tight">
              <span className="text-text-muted">My Cart</span>
              <span className="font-semibold text-primary">
                ${cartSubtotal.toFixed(2)}
              </span>
            </div>
            {totalItemCount > 0 && (
              <span className="absolute -top-0.5 left-4 bg-secondary text-text-dark text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                {totalItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Search Bar Wrapper */}
      <div className="w-full px-10 pb-4 lg:hidden">
        <SearchBar />
      </div>
    </header>
  )
}
export default GlobalHeader
