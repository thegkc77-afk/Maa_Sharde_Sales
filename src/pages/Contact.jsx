import React, { useState } from 'react'
import { Input } from '../components/common/FormControls'
import { Button } from '../components/common/Button'

export const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && email && message) {
      setSubmitted(true)
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form submissions */}
          <div className="lg:col-span-7 bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 shadow-sm">
            <h2 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-4 border-b border-outline-variant pb-2">
              Send an Inquiry
            </h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-[10px] text-center my-4">
                <span className="material-symbols-outlined text-4xl mb-2 text-green-500">check_circle</span>
                <p className="text-sm font-bold">Inquiry Sent Successfully!</p>
                <p className="text-xs mt-1">Our support staff will review and email you a ticket number within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Your Name" id="name" value={name} onChange={setName} required />
                  <Input label="Email Address" id="email" type="email" value={email} onChange={setEmail} required />
                </div>
                <Input label="Subject / Topic" id="subject" value={subject} onChange={setSubject} placeholder="e.g. Faucet Sizing question" />
                
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="msg" className="text-sm font-semibold text-text-dark">Message Details <span className="text-success">*</span></label>
                  <textarea
                    id="msg"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-[10px] text-sm text-text-dark bg-surface-lowest border border-outline-variant placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Describe your faucet configuration, dimensions, or order questions..."
                  />
                </div>

                <Button label="Submit Message" variant="primary" type="submit" size="md" className="w-full sm:w-auto" />
              </form>
            )}
          </div>

          {/* Right Column: Support and address coordinates */}
          <div className="lg:col-span-5 space-y-6">
            {/* Urgent Phone Hotline */}
            <div className="bg-primary text-white p-6 rounded-[16px] shadow-sm flex gap-4">
              <span className="material-symbols-outlined text-secondary text-3xl mt-0.5">phone_in_talk</span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider">Urgent Phone Support</h3>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Call our live desk to speak directly with an authorized product engineer.
                </p>
                <a href="tel:18002345677" className="text-lg font-extrabold text-secondary hover:underline mt-2 block">
                  1-800-234-5677
                </a>
                <p className="text-[10px] text-gray-400 mt-0.5">Toll-Free Mon-Fri 8:00 AM - 6:00 PM EST</p>
              </div>
            </div>

            {/* Warehouse showroom */}
            <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2">
                Showroom Headquarters
              </h3>
              
              <div className="flex gap-3 text-xs text-text-muted">
                <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
                <div>
                  <p className="font-bold text-text-dark">Maa Sharde Showroom & Depot</p>
                  <p className="mt-1">100 Industrial Parkway, Suite A</p>
                  <p>Detroit, MI 48201</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs text-text-muted">
                <span className="material-symbols-outlined text-secondary text-lg">schedule</span>
                <div>
                  <p className="font-bold text-text-dark">Operating Hours</p>
                  <p className="mt-1">Mon - Fri: 7:00 AM - 5:00 PM</p>
                  <p>Saturday: 8:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              {/* Visual map placeholder */}
              <div className="h-40 bg-gray-100 border border-outline-variant rounded-[10px] flex items-center justify-center text-text-muted text-xs select-none">
                <div className="text-center">
                  <span className="material-symbols-outlined text-2xl text-gray-400">map</span>
                  <p className="mt-1 font-semibold">Interactive Map Placeholder</p>
                  <p className="text-[10px]">Lat: 42.3314, Lon: -83.0458</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default Contact
