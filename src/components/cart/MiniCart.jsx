import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/useCartStore'
import { Button } from '../common/Button'

export const MiniCart = () => {
  const navigate = useNavigate()
  const { cartItems, isCartOpen, removeFromCart, updateQuantity, toggleCart } = useCartStore()
  const drawerRef = useRef(null)

  // Calculate totals
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Prevent background scrolling when cart drawer is active
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  // Handle overlay click to close
  const handleOverlayClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      toggleCart()
    }
  }

  const handleCheckoutClick = () => {
    toggleCart()
    navigate('/checkout')
  }

  const handleViewCartClick = () => {
    toggleCart()
    navigate('/cart')
  }

  if (!isCartOpen) return null

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-[#0d2b45]/60 z-50 flex justify-end transition-opacity duration-300"
    >
      {/* Drawer Body (Level 3 shadow) */}
      <div
        ref={drawerRef}
        className="w-full sm:w-[450px] h-full bg-surface-lowest shadow-[0_20px_40px_rgba(0,0,0,0.18)] flex flex-col animate-slideInRight"
      >
        {/* Header */}
        <div className="p-5 border-b border-outline-variant flex items-center justify-between bg-primary text-white">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined select-none text-secondary">shopping_cart</span>
            <span className="font-bold text-sm uppercase tracking-wider">Your Cart ({totalItemCount})</span>
          </div>
          <button
            onClick={toggleCart}
            aria-label="Close cart drawer"
            className="flex items-center justify-center p-1 hover:text-secondary focus:outline-none transition-colors"
          >
            <span className="material-symbols-outlined select-none text-2xl">close</span>
          </button>
        </div>

        {/* Content list */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center text-text-muted">
              <span className="material-symbols-outlined text-5xl text-gray-300 select-none">
                production_quantity_limits
              </span>
              <p className="text-sm font-semibold">Your shopping cart is empty.</p>
              <p className="text-xs">Add fixtures or plumbing parts to start your project!</p>
              <Button
                label="Browse Catalog"
                variant="secondary"
                size="sm"
                onClick={() => {
                  toggleCart()
                  navigate('/categories/all')
                }}
                className="mt-2"
              />
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 pb-4 border-b border-outline-variant last:border-b-0 last:pb-0"
              >
                <img
                  src={item.imageSrc}
                  alt=""
                  className="w-16 h-16 object-cover rounded bg-gray-100 border border-outline-variant flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-text-dark truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-text-muted mt-0.5">SKU: {item.sku}</p>
                  
                  {/* Quantity and actions */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-outline-variant rounded-[10px] bg-gray-50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-text-muted hover:text-primary transition-colors hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-text-dark">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-text-muted hover:text-primary transition-colors hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-success hover:underline font-semibold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm select-none">delete</span>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-[10px] text-text-muted mt-0.5">
                      (${item.price.toFixed(2)} each)
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-gray-50 border-t border-outline-variant flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">Estimated Subtotal:</span>
              <span className="text-base font-bold text-primary">${cartSubtotal.toFixed(2)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-1">
              <Button
                label="View Cart"
                variant="secondary"
                size="md"
                onClick={handleViewCartClick}
              />
              <Button
                label="Checkout Now"
                variant="primary"
                size="md"
                onClick={handleCheckoutClick}
              />
            </div>
            <p className="text-[10px] text-text-muted text-center leading-normal">
              Taxes and shipping fees calculated during checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default MiniCart
