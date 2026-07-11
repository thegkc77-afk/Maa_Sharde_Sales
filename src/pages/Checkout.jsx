import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { useUserStore } from '../store/useUserStore'
import { Input } from '../components/common/FormControls'
import { Button } from '../components/common/Button'

export const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, clearCart } = useCartStore()
  const { userSession } = useUserStore()

  // States for flow
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  // Form Fields
  const [fulfillmentType, setFulfillmentType] = useState('ship') // 'ship' or 'pickup'
  const [fullName, setFullName] = useState(userSession.isLoggedIn ? userSession.name : '')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [taxId, setTaxId] = useState(userSession.taxExemptId || '')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  // Calculation Metrics
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const shippingFee = fulfillmentType === 'pickup' || cartSubtotal >= 150 ? 0 : 12.99
  const taxRate = taxId ? 0 : 0.06 // 6% tax unless tax-exempt certificate is applied
  const estimatedTax = cartSubtotal * taxRate
  const totalAmount = cartSubtotal + shippingFee + estimatedTax

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    if (cartItems.length === 0) return

    // Simulate ordering success
    const randomOrder = 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    setOrderNumber(randomOrder)
    setIsSuccess(true)
    clearCart()
  }

  if (isSuccess) {
    return (
      <div className="w-full bg-background py-16">
        <div className="w-full max-w-[600px] mx-auto px-10">
          <div className="bg-white border border-outline-variant rounded-[16px] p-8 text-center shadow-sm flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h1 className="text-2xl font-extrabold text-text-dark tracking-tight">Order Confirmed!</h1>
            <p className="text-sm text-text-muted">
              Thank you for shopping with us. Your order has been registered and is currently being processed.
            </p>

            <div className="bg-gray-50 border border-outline-variant rounded-[10px] p-4 w-full text-xs text-left space-y-2 mt-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Order Number:</span>
                <span className="font-bold text-text-dark">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Fulfillment:</span>
                <span className="font-bold text-text-dark capitalize">
                  {fulfillmentType === 'pickup' ? 'Warehouse Pickup (2 hours)' : 'Standard Ground Delivery'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Status:</span>
                <span className="font-bold text-green-600">Pending Courier Dispatch</span>
              </div>
            </div>

            <Button
              label="Track Your Order"
              variant="primary"
              onClick={() => navigate(`/track-order?id=${orderNumber}&email=${encodeURIComponent(email || 'customer@gmail.com')}`)}
              className="w-full mt-4"
            />
            <Button
              label="Return to Homepage"
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight mb-8">Secure Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-outline-variant rounded-[16px] p-8 text-center text-text-muted shadow-sm flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-5xl text-gray-300">shopping_cart_checkout</span>
            <p className="text-sm font-bold text-text-dark">No items in cart to checkout.</p>
            <Button label="Browse products" variant="primary" onClick={() => navigate('/categories/all')} />
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Details */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Fulfillment Type */}
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-4 border-b border-outline-variant pb-2">
                  1. Choose Fulfillment
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-[10px] cursor-pointer transition-all ${
                      fulfillmentType === 'ship' ? 'border-primary bg-surface-high/20' : 'border-outline-variant bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      value="ship"
                      checked={fulfillmentType === 'ship'}
                      onChange={() => setFulfillmentType('ship')}
                      className="accent-primary cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-bold text-text-dark">Home/Jobsite Delivery</p>
                      <p className="text-[10px] text-text-muted mt-0.5">Ships same-day</p>
                    </div>
                  </label>
                  
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-[10px] cursor-pointer transition-all ${
                      fulfillmentType === 'pickup' ? 'border-primary bg-surface-high/20' : 'border-outline-variant bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfillment"
                      value="pickup"
                      checked={fulfillmentType === 'pickup'}
                      onChange={() => setFulfillmentType('pickup')}
                      className="accent-primary cursor-pointer"
                    />
                    <div>
                      <p className="text-xs font-bold text-text-dark">Warehouse Pickup</p>
                      <p className="text-[10px] text-text-muted mt-0.5">Ready in 2 hours (Free)</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Delivery / Shipping details */}
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2">
                  2. Contact & Address Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" id="name" value={fullName} onChange={setFullName} required />
                  <Input label="Email Address" id="email" type="email" value={email} onChange={setEmail} required />
                </div>
                {fulfillmentType === 'ship' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input label="Street Address" id="addr" value={address} onChange={setAddress} className="sm:col-span-2" required />
                    <Input label="City" id="city" value={city} onChange={setCity} required />
                  </div>
                )}
              </div>

              {/* Contractor Tax Exemption Cert */}
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2 flex items-center gap-2">
                  <span>3. Contractor Exemptions</span>
                  <span className="text-[9px] bg-primary text-white font-bold px-1.5 py-0.5 rounded uppercase">PRO</span>
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Have a tax-exempt certificate? Enter your Tax Exemption ID below. The 6% regional sales tax will be deducted automatically from the total.
                </p>
                <div className="max-w-[300px]">
                  <Input
                    label="Tax Exemption Certificate ID"
                    id="taxId"
                    placeholder="e.g. TX-PRO-7789"
                    value={taxId}
                    onChange={setTaxId}
                  />
                </div>
                {taxId && (
                  <span className="inline-block text-[10px] text-green-600 font-bold mt-1">
                    ✓ Tax Exempt Status Verified - 6% sales tax waived.
                  </span>
                )}
              </div>

              {/* Payment Info */}
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2">
                  4. Payment Details
                </h3>
                <Input
                  label="Credit Card Number"
                  id="cc"
                  placeholder="0000 0000 0000 0000"
                  value={cardNum}
                  onChange={setCardNum}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiration (MM/YY)" id="exp" placeholder="12/28" value={cardExpiry} onChange={setCardExpiry} required />
                  <Input label="Security Code (CVV)" id="cvv" placeholder="123" value={cardCvv} onChange={setCardCvv} required />
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Review */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2">
                  Order Summary
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-48 overflow-y-auto mb-2 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="truncate max-w-[180px]">
                        <p className="font-bold text-text-dark truncate">{item.title}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-outline-variant" />

                <div className="space-y-2 text-xs text-text-muted">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-text-dark">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fulfillment ({fulfillmentType === 'pickup' ? 'Pickup' : 'Shipping'}):</span>
                    <span className="font-bold text-text-dark">
                      {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Tax (6%):</span>
                    <span className={`font-bold ${taxId ? 'line-through text-green-600' : 'text-text-dark'}`}>
                      ${estimatedTax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <hr className="border-outline-variant" />

                <div className="flex justify-between text-sm items-baseline">
                  <span className="font-bold text-text-dark">Order Total:</span>
                  <span className="font-extrabold text-primary text-base">${totalAmount.toFixed(2)}</span>
                </div>

                <Button
                  label="Place Your Order"
                  variant="primary"
                  size="md"
                  type="submit"
                  className="w-full mt-4"
                />
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}
export default Checkout
