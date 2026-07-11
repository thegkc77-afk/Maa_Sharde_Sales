import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Input } from '../components/common/FormControls'
import { Button } from '../components/common/Button'

export const TrackOrder = () => {
  const [searchParams] = useSearchParams()
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [trackResult, setTrackResult] = useState(null)

  const queryId = searchParams.get('id') || ''
  const queryEmail = searchParams.get('email') || ''

  useEffect(() => {
    if (queryId && queryEmail) {
      setOrderId(queryId)
      setEmail(queryEmail)
      handleTrackQuery(queryId, queryEmail)
    }
  }, [queryId, queryEmail])

  const handleTrackQuery = (id, mail) => {
    if (id && mail) {
      // Simulate order lookup results
      setTrackResult({
        id,
        email: mail,
        date: '2026-07-10',
        shippingAddress: '123 Main St, Detroit, MI 48201',
        courier: 'UPS Ground',
        trackingNumber: '1Z999AA10123456784',
        steps: [
          { name: 'Order Registered & Verified', date: 'July 10, 08:30 AM', status: 'done' },
          { name: 'Warehouse Picked & Inspected', date: 'July 10, 11:15 AM', status: 'done' },
          { name: 'Package Packaged & Boxed', date: 'July 10, 02:00 PM', status: 'done' },
          { name: 'Out for Courier Delivery', date: 'July 11, 07:00 AM', status: 'active' },
          { name: 'Arrived at Destination', date: 'Pending Delivery', status: 'pending' },
        ],
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleTrackQuery(orderId, email)
  }

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[800px] mx-auto px-10">
        
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest leading-none">Shipping & Logistics</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight mt-1">Track Your Order</h1>
        </div>

        {/* Input Form card */}
        <div className="bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <Input
              label="Order ID / SKU Code"
              id="orderId"
              placeholder="e.g. ORD-394821"
              value={orderId}
              onChange={setOrderId}
              required
            />
            <Input
              label="Billing Email"
              id="email"
              type="email"
              placeholder="e.g. plumber@gmail.com"
              value={email}
              onChange={setEmail}
              required
            />
            <div className="sm:col-span-2">
              <Button label="Search Shipment Status" variant="primary" type="submit" className="w-full" />
            </div>
          </form>
        </div>

        {/* Results Details stepper */}
        {trackResult && (
          <div className="bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
            <div className="border-b border-outline-variant pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm">
              <div>
                <h3 className="font-bold text-text-dark">Order Status: {trackResult.id}</h3>
                <p className="text-[11px] text-text-muted mt-0.5">Purchased on {trackResult.date}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-text-muted">Courier: <span className="font-bold text-text-dark">{trackResult.courier}</span></p>
                <p className="text-[11px] text-text-muted mt-0.5">Tracking Code: <span className="font-semibold text-secondary hover:underline select-all">{trackResult.trackingNumber}</span></p>
              </div>
            </div>

            {/* Stepper Grid vertical layout */}
            <div className="relative pl-6 border-l-2 border-gray-200 ml-4 py-2 space-y-6">
              {trackResult.steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-start gap-1">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-9 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      step.status === 'done'
                        ? 'bg-primary border-primary text-white'
                        : step.status === 'active'
                        ? 'bg-white border-secondary text-secondary animate-pulse'
                        : 'bg-white border-gray-300 text-gray-300'
                    }`}
                  >
                    {step.status === 'done' ? (
                      <span className="material-symbols-outlined text-sm font-bold select-none">done</span>
                    ) : (
                      <span className="h-2 h-2 w-2 rounded-full bg-current" />
                    )}
                  </div>

                  <h4 className={`text-xs sm:text-sm font-bold ${
                    step.status === 'done' ? 'text-primary' : step.status === 'active' ? 'text-secondary' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-text-muted font-medium leading-none mt-0.5">{step.date}</p>
                </div>
              ))}
            </div>

            <hr className="border-outline-variant" />

            <div className="text-xs text-text-muted space-y-1">
              <p><strong>Shipping Destination Address:</strong> {trackResult.shippingAddress}</p>
              <p className="text-[11px]">Need delivery redirect? Connect with courier helpline or call our customer desk at 1-800-234-5677.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
export default TrackOrder
