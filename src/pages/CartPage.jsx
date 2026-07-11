import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { Button } from '../components/common/Button'

export const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore()

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  
  // Shipping cost: free over $150, else $12.99
  const shippingFee = cartSubtotal >= 150 ? 0 : 12.99
  const totalAmount = cartSubtotal + shippingFee

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight mb-8">
          Shopping Cart ({totalItemCount} Items)
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-outline-variant rounded-[16px] p-12 text-center text-text-muted shadow-sm flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-6xl text-gray-300">shopping_cart</span>
            <p className="text-sm font-bold text-text-dark">Your cart is currently empty.</p>
            <p className="text-xs">Browse our catalog to find pipes, faucets, valves, and more!</p>
            <Button
              label="Start Shopping"
              variant="primary"
              onClick={() => navigate('/categories/all')}
              className="mt-2"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Edit Rows */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm flex flex-col gap-5">
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                  <span className="text-xs font-bold text-text-dark uppercase">Products</span>
                  <button
                    onClick={clearCart}
                    className="text-[10px] font-bold text-success hover:underline uppercase"
                  >
                    Clear All Items
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-outline-variant/60 last:border-b-0 last:pb-0"
                  >
                    {/* Item Details */}
                    <div className="flex items-center gap-4 w-full sm:w-1/2">
                      <img
                        src={item.imageSrc}
                        alt=""
                        className="w-16 h-16 object-cover rounded-[10px] bg-gray-50 border border-outline-variant flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/categories/${item.category || 'all'}/${item.id}`}
                          className="text-xs sm:text-sm font-bold text-text-dark hover:text-secondary hover:underline truncate block"
                        >
                          {item.title}
                        </Link>
                        <p className="text-[10px] text-text-muted mt-0.5">SKU: {item.sku}</p>
                      </div>
                    </div>

                    {/* Quantity selectors and removers */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-1/2">
                      <div className="flex items-center border border-outline-variant rounded-[10px] bg-gray-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm text-text-muted hover:bg-gray-100 hover:text-primary transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 text-xs font-bold text-text-dark">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm text-text-muted hover:bg-gray-100 hover:text-primary transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <p className="text-xs text-text-muted">Total:</p>
                        <p className="text-sm font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 flex items-center justify-center transition-colors"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Order Pricing Summary card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-3 mb-2">
                  Order Summary
                </h3>

                <div className="flex justify-between text-xs text-text-muted">
                  <span>Subtotal:</span>
                  <span className="font-bold text-text-dark">${cartSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-xs text-text-muted">
                  <span>Shipping:</span>
                  <span className="font-bold text-text-dark">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                {shippingFee > 0 && (
                  <div className="text-[10px] bg-surface-high text-primary p-2.5 rounded-[6px] font-semibold text-center border border-outline-variant/30 leading-normal">
                    Add ${(150 - cartSubtotal).toFixed(2)} more to qualify for Free Shipping!
                  </div>
                )}

                <div className="flex justify-between text-xs text-text-muted">
                  <span>Estimated Tax:</span>
                  <span className="font-semibold text-text-dark">Calculated at Checkout</span>
                </div>

                <hr className="border-outline-variant" />

                <div className="flex justify-between text-sm">
                  <span className="font-bold text-text-dark">Estimated Total:</span>
                  <span className="font-extrabold text-primary text-base">${totalAmount.toFixed(2)}</span>
                </div>

                <Button
                  label="Proceed to Checkout"
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-4"
                />

                <Link
                  to="/categories/all"
                  className="text-center text-xs font-bold text-secondary hover:text-orange-600 hover:underline transition-colors mt-1 block uppercase tracking-wider"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Delivery standards badge */}
              <div className="bg-surface-lowest border border-outline-variant rounded-[16px] p-4 flex gap-3 shadow-sm items-start">
                <span className="material-symbols-outlined text-secondary text-lg mt-0.5">local_shipping</span>
                <div className="text-[11px] text-text-muted leading-relaxed">
                  <p className="font-bold text-text-dark uppercase tracking-wider text-[9px] mb-0.5">PRO Courier Service</p>
                  <span>Orders placed before 4:00 PM EST ship same-day. Warehouse pickup available within 2 hours.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default CartPage
