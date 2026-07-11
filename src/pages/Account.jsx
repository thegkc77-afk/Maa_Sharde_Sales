import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUserStore } from '../store/useUserStore'
import { useCartStore } from '../store/useCartStore'
import { products } from '../data/mockData'
import { Input } from '../components/common/FormControls'
import { Button } from '../components/common/Button'

export const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { userSession, loginUser, logoutUser, wishlistItems, toggleWishlistItem } = useUserStore()
  const { addToCart } = useCartStore()

  // Tabs: 'profile', 'orders', 'boards', 'wishlist'
  const activeTab = searchParams.get('tab') || 'profile'

  // Form mock input states
  const [loginName, setLoginName] = useState('')
  const [isProCheck, setIsProCheck] = useState(false)
  const [taxIdInput, setTaxIdInput] = useState('')

  // Project Boards mock states
  const [boards, setBoards] = useState([
    { name: 'Detroit Bathroom Remodel', skuList: ['DELTA-B-101', 'PLUMB-SL-12', 'PLUMB-PP-14'] },
    { name: 'Monroe Street Pipe Repair', skuList: ['PEX-12-100', 'VALVE-BR-12', 'PLUMB-TT-50'] },
  ])
  const [newBoardName, setNewBoardName] = useState('')

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName })
  }

  const handleCustomLogin = (e) => {
    e.preventDefault()
    if (loginName.trim()) {
      loginUser(loginName.trim(), isProCheck, taxIdInput)
    }
  }

  const handleQuickLogin = (role) => {
    if (role === 'diy') {
      loginUser('Sarah Jenkins (DIYer)', false, '')
    } else {
      loginUser('Apex Plumbing Contractors', true, 'TX-PRO-4491')
    }
  }

  const handleCreateBoard = (e) => {
    e.preventDefault()
    if (newBoardName.trim()) {
      setBoards([...boards, { name: newBoardName.trim(), skuList: [] }])
      setNewBoardName('')
    }
  }

  const handleAddBoardItemToCart = (sku) => {
    const prod = products.find(p => p.sku === sku)
    if (prod) {
      addToCart(prod, 1)
    }
  }

  // Wishlist items filtered from global catalog
  const wishlistedProducts = products.filter(p => wishlistItems.includes(p.id))

  const invoices = [
    { id: 'INV-2026-0041', date: '2026-07-05', total: 184.49, status: 'paid', itemsCount: 3 },
    { id: 'INV-2026-0028', date: '2026-06-18', total: 434.50, status: 'paid', itemsCount: 12 },
  ]

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight mb-8">
          {userSession.isLoggedIn ? `${userSession.name} Dashboard` : 'Account Access'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical tabs navigation */}
          <div className="lg:col-span-3 bg-white border border-outline-variant rounded-[16px] overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-outline-variant flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">account_circle</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-text-dark truncate">
                  {userSession.isLoggedIn ? userSession.name : 'Guest Account'}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">
                  {userSession.isProContractor ? 'Contractor Tier' : 'Standard DIY'}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col text-xs font-semibold text-text-dark">
              <button
                onClick={() => handleTabChange('profile')}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-high border-l-4 transition-all ${
                  activeTab === 'profile' ? 'bg-surface-high/35 border-l-primary font-bold text-primary' : 'border-l-transparent text-text-muted'
                }`}
              >
                <span className="material-symbols-outlined text-base">person</span>
                <span>Session Credentials Simulator</span>
              </button>
              
              <button
                onClick={() => handleTabChange('orders')}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-high border-l-4 transition-all ${
                  activeTab === 'orders' ? 'bg-surface-high/35 border-l-primary font-bold text-primary' : 'border-l-transparent text-text-muted'
                }`}
              >
                <span className="material-symbols-outlined text-base">receipt_long</span>
                <span>Invoice History</span>
              </button>

              <button
                onClick={() => handleTabChange('boards')}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-high border-l-4 transition-all ${
                  activeTab === 'boards' ? 'bg-surface-high/35 border-l-primary font-bold text-primary' : 'border-l-transparent text-text-muted'
                }`}
              >
                <span className="material-symbols-outlined text-base">folder_open</span>
                <span>Saved Project Boards</span>
              </button>

              <button
                onClick={() => handleTabChange('wishlist')}
                className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-high border-l-4 transition-all ${
                  activeTab === 'wishlist' ? 'bg-surface-high/35 border-l-primary font-bold text-primary' : 'border-l-transparent text-text-muted'
                }`}
              >
                <span className="material-symbols-outlined text-base">favorite</span>
                <span>General Wishlist ({wishlistItems.length})</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tab View Contents */}
          <div className="lg:col-span-9">
            
            {/* 1. Session / login simulation Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                
                {/* Simulator Intro Card */}
                <div className="bg-surface-lowest border-2 border-primary/20 rounded-[16px] p-6 sm:p-8 shadow-sm">
                  <h3 className="text-base font-bold text-text-dark flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-secondary">tune</span>
                    <span>Evaluation Simulator Settings</span>
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Verify the platform's response to different user classes. By toggling contractor credentials, you can instantly apply tax waivers (6% waived) and check customer dashboard changes.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <button
                      onClick={() => handleQuickLogin('diy')}
                      className="bg-white border-2 border-outline-variant hover:border-primary text-text-dark p-5 rounded-[12px] flex flex-col items-center gap-2 text-center transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-3xl text-gray-500">face</span>
                      <div>
                        <p className="text-xs font-bold">Sign In as DIYer</p>
                        <p className="text-[10px] text-text-muted mt-1">Normal prices, default checkout rates</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleQuickLogin('pro')}
                      className="bg-primary hover:bg-[#071b2c] text-white p-5 rounded-[12px] flex flex-col items-center gap-2 text-center transition-all shadow-md"
                    >
                      <span className="material-symbols-outlined text-3xl text-secondary">engineering</span>
                      <div>
                        <p className="text-xs font-bold text-secondary">Sign In as Pro Plumber</p>
                        <p className="text-[10px] text-gray-300 mt-1">Verifies Tax-Exempt ID and flags Pro invoices</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Custom login form */}
                <div className="bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 shadow-sm">
                  <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider mb-4 border-b border-outline-variant pb-2">
                    Custom Account Creation
                  </h3>
                  
                  {userSession.isLoggedIn ? (
                    <div className="space-y-4">
                      <div className="bg-gray-50 border border-outline-variant rounded-[10px] p-4 text-xs space-y-2">
                        <p><strong>Active Session:</strong> {userSession.name}</p>
                        <p><strong>Professional Contractor:</strong> {userSession.isProContractor ? 'Yes' : 'No'}</p>
                        {userSession.isProContractor && <p><strong>Tax Exempt Certificate ID:</strong> {userSession.taxExemptId}</p>}
                      </div>
                      <Button label="Sign Out / Terminate Session" variant="secondary" onClick={logoutUser} />
                    </div>
                  ) : (
                    <form onSubmit={handleCustomLogin} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Account Display Name"
                          id="accName"
                          placeholder="e.g. Apex Plumbers LLC"
                          value={loginName}
                          onChange={setLoginName}
                          required
                        />
                        <div className="flex flex-col gap-2 mt-7 justify-center">
                          <label className="flex items-center gap-2 text-xs font-bold text-text-dark cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isProCheck}
                              onChange={(e) => setIsProCheck(e.target.checked)}
                              className="accent-primary rounded"
                            />
                            <span>This is a Pro Contractor Account</span>
                          </label>
                        </div>
                      </div>
                      
                      {isProCheck && (
                        <div className="max-w-[300px]">
                          <Input
                            label="Tax Exemption Certificate ID"
                            id="tId"
                            placeholder="e.g. TX-PRO-7789"
                            value={taxIdInput}
                            onChange={setTaxIdInput}
                          />
                        </div>
                      )}

                      <Button label="Login & Establish Session" variant="primary" type="submit" />
                    </form>
                  )}
                </div>

              </div>
            )}

            {/* 2. Order Invoice History */}
            {activeTab === 'orders' && (
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2">
                  Invoice Registry logs
                </h3>
                
                <div className="space-y-4">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="border border-outline-variant rounded-[10px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-text-dark">{inv.id}</p>
                        <p className="text-text-muted">Purchased on {inv.date}</p>
                        <p className="text-[10px] text-text-muted">Invoice contains {inv.itemsCount} SKU units</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-text-muted">Amount Paid:</p>
                          <p className="text-sm font-bold text-primary">${inv.total.toFixed(2)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => alert(`Simulating PDF generation for ${inv.id}`)}
                          className="flex items-center gap-1.5 text-xs text-secondary hover:text-orange-600 font-bold uppercase tracking-wider"
                        >
                          <span className="material-symbols-outlined text-sm select-none">download</span>
                          <span>PDF Spec</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Saved Project Boards */}
            {activeTab === 'boards' && (
              <div className="space-y-6">
                
                {/* Project Board creation form */}
                <div className="bg-white border border-outline-variant rounded-[16px] p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2 mb-4">
                    Create New Project Board
                  </h3>
                  <form onSubmit={handleCreateBoard} className="flex gap-4 max-w-[500px]">
                    <Input
                      placeholder="e.g. Westside Kitchen Installation"
                      id="bName"
                      value={newBoardName}
                      onChange={setNewBoardName}
                      className="flex-grow"
                    />
                    <Button label="Create Board" variant="primary" type="submit" className="mt-7" />
                  </form>
                </div>

                {/* Boards list mapping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {boards.map((board, idx) => (
                    <div key={idx} className="bg-white border border-outline-variant rounded-[16px] p-5 shadow-sm space-y-4">
                      <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                        <h4 className="text-xs sm:text-sm font-bold text-text-dark truncate">{board.name}</h4>
                        <span className="text-[10px] bg-surface-high text-primary font-bold px-2 py-0.5 rounded-[4px]">
                          {board.skuList.length} Items
                        </span>
                      </div>
                      
                      {board.skuList.length === 0 ? (
                        <p className="text-xs text-text-muted py-2">No hardware added to this board yet. Browse inventory to pin items.</p>
                      ) : (
                        <div className="space-y-2">
                          {board.skuList.map((sku) => {
                            const p = products.find(prod => prod.sku === sku)
                            return p ? (
                              <div key={sku} className="flex items-center justify-between gap-3 text-xs">
                                <span className="font-semibold text-text-dark truncate max-w-[180px]">{p.title}</span>
                                <button
                                  onClick={() => handleAddBoardItemToCart(sku)}
                                  className="text-secondary hover:text-orange-600 flex items-center"
                                  aria-label="Add to cart"
                                >
                                  <span className="material-symbols-outlined text-base">add_shopping_cart</span>
                                </button>
                              </div>
                            ) : null
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* 4. Wishlist items */}
            {activeTab === 'wishlist' && (
              <div className="bg-white border border-outline-variant rounded-[16px] p-6 sm:p-8 shadow-sm">
                <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-2 mb-6">
                  My Project Wishlist
                </h3>
                
                {wishlistedProducts.length === 0 ? (
                  <div className="text-center py-8 text-text-muted text-xs">
                    No items in wishlist yet. Click hearts on product cards to store items!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {wishlistedProducts.map((p) => (
                      <div key={p.id} className="border border-outline-variant rounded-[10px] p-4 flex gap-3">
                        <img
                          src={p.imageSrc}
                          alt=""
                          className="w-12 h-12 object-cover rounded bg-gray-50 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-grow">
                          <p className="text-xs font-bold text-text-dark truncate">{p.title}</p>
                          <p className="text-[10px] text-text-muted mt-0.5">SKU: {p.sku}</p>
                          <p className="text-xs font-extrabold text-primary mt-1">${p.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col gap-2 justify-between">
                          <button
                            onClick={() => toggleWishlistItem(p.id)}
                            className="text-success hover:text-red-500 self-end"
                            aria-label="Remove wishlist"
                          >
                            <span className="material-symbols-outlined text-sm select-none">close</span>
                          </button>
                          <button
                            onClick={() => handleAddBoardItemToCart(p.sku)}
                            className="text-secondary hover:text-orange-600"
                            aria-label="Add to cart"
                          >
                            <span className="material-symbols-outlined text-base select-none">add_shopping_cart</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
export default Account
