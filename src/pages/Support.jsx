import React, { useState } from 'react'
import { faqs } from '../data/mockData'
import { Input, Dropdown } from '../components/common/FormControls'
import { Button } from '../components/common/Button'

export const Support = () => {
  const [activeFaq, setActiveFaq] = useState(null)

  // Sizing Calculator states
  const [faucetType, setFaucetType] = useState('single')
  const [pipeSize, setPipeSize] = useState('1/2')
  const [recommendation, setRecommendation] = useState(null)

  // Warranty states
  const [warrantySku, setWarrantySku] = useState('')
  const [warrantyReason, setWarrantyReason] = useState('')
  const [warrantySubmitted, setWarrantySubmitted] = useState(false)

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    let lines = ''
    let accessories = ''
    let explanation = ''

    if (faucetType === 'single') {
      lines = '3/8-inch Compression supply lines (Pair)'
      accessories = 'Teflon Thread Tape'
      explanation = 'Standard single-hole faucets utilize integrated supply lines requiring a 3/8" compression adapter at the shutoff valve.'
    } else if (faucetType === 'centerset') {
      lines = '1/2-inch IPS x 3/8-inch Compression braided steel supply lines (Pair)'
      accessories = 'Plumbers Putty (14 oz) & Teflon Thread Tape'
      explanation = '3-hole centerset faucets have threaded 1/2" IPS inlets underneath the base plate. Standard copper or braided lines connect these to the shutoff valves.'
    } else {
      lines = '1/2-inch NPT connections'
      accessories = 'Silicone Sealant & Teflon Tape'
      explanation = 'Wall-mount faucets require rigid copper or brass pipes threaded directly behind the finished wall plaster.'
    }

    setRecommendation({
      lines,
      accessories,
      size: `${pipeSize}" diameter compatibility`,
      explanation,
    })
  }

  const handleWarrantySubmit = (e) => {
    e.preventDefault()
    if (warrantySku && warrantyReason) {
      setWarrantySubmitted(true)
      setWarrantySku('')
      setWarrantyReason('')
      setTimeout(() => setWarrantySubmitted(false), 4000)
    }
  }

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1000px] mx-auto px-10">
        
        {/* Title */}
        <div className="mb-10 text-center">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest leading-none">Help Center</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight mt-1">Customer Support & FAQs</h1>
        </div>

        {/* Dynamic Compatibility Sizing Calculator */}
        <div className="bg-surface-lowest border-2 border-primary/20 rounded-[16px] p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-outline-variant pb-3">
            <span className="material-symbols-outlined text-secondary">calculate</span>
            <div>
              <h3 className="text-base font-bold text-text-dark">Fitment Sizing Calculator</h3>
              <p className="text-[11px] text-text-muted mt-0.5">Select your faucet layout and shutoff valve size to verify connections.</p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <Dropdown
              label="Faucet Configuration"
              id="fType"
              value={faucetType}
              onChange={setFaucetType}
              options={[
                { label: 'Single-Hole Faucet', value: 'single' },
                { label: '3-Hole Centerset (4" block)', value: 'centerset' },
                { label: 'Wall-Mount Fixture', value: 'wall' },
              ]}
            />
            <Dropdown
              label="Shutoff Valve Pipe Size"
              id="pSize"
              value={pipeSize}
              onChange={setPipeSize}
              options={[
                { label: '3/8-inch shutoff valve', value: '3/8' },
                { label: '1/2-inch shutoff valve', value: '1/2' },
                { label: '3/4-inch supply line', value: '3/4' },
              ]}
            />
            <div className="sm:col-span-2">
              <Button label="Calculate Fitment Needs" variant="primary" type="submit" className="w-full" />
            </div>
          </form>

          {recommendation && (
            <div className="mt-6 bg-gray-50 border border-outline-variant rounded-[10px] p-5 space-y-3 animate-fadeIn text-xs sm:text-sm">
              <h4 className="font-bold text-text-dark border-b border-outline-variant/60 pb-1.5 uppercase text-xs tracking-wider text-secondary">
                Fitment Specifications Recommendation
              </h4>
              <div>
                <p className="text-text-muted font-bold text-[10px] uppercase">Required Supply Hoses:</p>
                <p className="text-text-dark font-semibold mt-0.5">{recommendation.lines}</p>
              </div>
              <div>
                <p className="text-text-muted font-bold text-[10px] uppercase">Required Joint Compounds:</p>
                <p className="text-text-dark font-semibold mt-0.5">{recommendation.accessories}</p>
              </div>
              <div className="text-[11px] text-text-muted leading-relaxed border-t border-outline-variant/60 pt-2">
                <strong>Fitting Logic:</strong> {recommendation.explanation}
              </div>
            </div>
          )}
        </div>

        {/* FAQs list accordion */}
        <div className="bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 mb-12 shadow-sm">
          <h2 className="text-base font-bold text-text-dark mb-6 border-b border-outline-variant pb-3 uppercase tracking-wider">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-outline-variant rounded-[10px] overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 text-left font-bold text-xs sm:text-sm text-text-dark focus:outline-none hover:bg-gray-100 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="material-symbols-outlined select-none text-text-muted">
                    {activeFaq === idx ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-5 py-4 border-t border-outline-variant bg-white text-xs sm:text-sm text-text-muted leading-relaxed animate-slideDown">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Warranty Claim form */}
        <div className="bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-bold text-text-dark mb-4 border-b border-outline-variant pb-3 uppercase tracking-wider">
            Manufacturer Warranty Registration
          </h2>
          {warrantySubmitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-[10px] text-center my-4">
              <span className="material-symbols-outlined text-4xl mb-2 text-green-500">task_alt</span>
              <p className="text-sm font-bold">Warranty Ticket Registered!</p>
              <p className="text-xs mt-1">We will contact the manufacturer brand directly and send you a UPS return label.</p>
            </div>
          ) : (
            <form onSubmit={handleWarrantySubmit} className="space-y-4">
              <div className="max-w-[400px]">
                <Input
                  label="Product SKU Code"
                  id="sku"
                  placeholder="e.g. DELTA-B-101"
                  value={warrantySku}
                  onChange={setWarrantySku}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reason" className="text-sm font-semibold text-text-dark">Reason for Claim <span className="text-success">*</span></label>
                <textarea
                  id="reason"
                  rows="4"
                  value={warrantyReason}
                  onChange={(e) => setWarrantyReason(e.target.value)}
                  placeholder="Describe leaks, finish chipping, or mechanism issues..."
                  className="w-full px-4 py-2.5 rounded-[10px] text-sm text-text-dark bg-surface-lowest border border-outline-variant placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <Button label="Submit Warranty Claim" variant="primary" type="submit" size="md" />
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
export default Support
