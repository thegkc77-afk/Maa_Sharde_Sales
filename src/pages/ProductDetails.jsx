import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products, reviews } from '../data/mockData'
import { useCartStore } from '../store/useCartStore'
import { useUserStore } from '../store/useUserStore'
import { Rating } from '../components/common/Rating'
import { Button } from '../components/common/Button'

export const ProductDetails = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleCart } = useCartStore()
  const { wishlistItems, toggleWishlistItem } = useUserStore()

  // Quantities selection
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('specs') // 'specs' or 'reviews'

  // Retrieve current product
  const product = products.find((p) => p.id === productId)

  // Track selected bundle checkbox states
  const [selectedCompanions, setSelectedCompanions] = useState(
    product && product.compatibleItems
      ? product.compatibleItems.reduce((acc, id) => ({ ...acc, [id]: true }), {})
      : {}
  )

  if (!product) {
    return (
      <div className="w-full bg-background py-16 text-center text-text-muted">
        <span className="material-symbols-outlined text-5xl text-gray-300">production_quantity_limits</span>
        <h2 className="text-lg font-bold text-text-dark mt-2">Product Not Found</h2>
        <p className="text-xs">It might have been discontinued or out of stock.</p>
        <Button label="Back to Shop" variant="primary" size="sm" onClick={() => navigate('/categories/all')} className="mt-4" />
      </div>
    )
  }

  // Retrieve companion items details
  const companions = products.filter((p) => product.compatibleItems?.includes(p.id))

  const handleCompanionCheckboxChange = (id) => {
    setSelectedCompanions((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddToCart = () => {
    addToCart(product, qty)
    toggleCart()
  }

  const handleAddBundleToCart = () => {
    // Add primary product
    addToCart(product, qty)
    
    // Add selected companions
    companions.forEach((comp) => {
      if (selectedCompanions[comp.id]) {
        addToCart(comp, 1)
      }
    })
    toggleCart()
  }

  const isWishlisted = wishlistItems.includes(product.id)

  // Calculate bundle total price
  const bundleTotalPrice = product.price + companions.reduce((acc, comp) => {
    return acc + (selectedCompanions[comp.id] ? comp.price : 0)
  }, 0)

  // Filter reviews
  const productReviews = reviews.filter((r) => r.productId === product.id)

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-8 uppercase tracking-wider font-semibold">
          <button onClick={() => navigate('/')} className="hover:text-secondary">Home</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <button onClick={() => navigate(`/categories/${product.category}`)} className="hover:text-secondary capitalize">{product.category}</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-text-dark font-bold truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* Main Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-6 bg-surface-lowest border border-outline-variant rounded-[16px] overflow-hidden p-6 sm:p-10 flex items-center justify-center h-[340px] sm:h-[480px] shadow-sm">
            <img
              src={product.imageSrc}
              alt={`High-resolution photo of ${product.title}`}
              className="max-h-full max-w-full object-contain rounded-[10px] filter drop-shadow"
            />
          </div>

          {/* Right Column: Buying info, titles */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* SKU and stock indicators */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-text-muted font-semibold">SKU: <span className="font-bold text-text-dark">{product.sku}</span></span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-bold text-green-600">In Stock (Est. {product.stockCount} units)</span>
              </div>
            </div>

            {/* Badges and Title */}
            <div>
              <div className="flex gap-2 mb-2">
                {product.isProGrade && (
                  <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
                    PRO GRADE
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
                    SALE
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-text-dark tracking-tight leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Star ratings summary */}
            <div className="flex items-center gap-2 pb-3 border-b border-outline-variant">
              <Rating score={product.rating} size="md" />
              <span className="text-xs text-text-dark font-bold">{product.rating} / 5.0</span>
              <span className="text-xs text-text-muted">({product.reviewCount} customer reviews)</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-text-muted line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description intro */}
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Compliance badges icons */}
            {product.certifications?.length > 0 && (
              <div className="flex items-center gap-3 py-2">
                {product.certifications.map((cert) => (
                  <span key={cert} className="text-[10px] bg-surface-high text-primary font-bold px-2 py-1 rounded-[6px] border border-outline-variant/40">
                    {cert}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity and Cart buttons row */}
            <div className="flex items-center gap-4 border-y border-outline-variant py-4 my-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-text-muted uppercase">Quantity</span>
                <div className="flex items-center border border-outline-variant rounded-[10px] bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-5 font-bold text-sm text-text-dark">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-grow flex items-end gap-2 h-full mt-5">
                <Button
                  label="Add to Cart"
                  variant="primary"
                  size="md"
                  icon="shopping_cart"
                  className="flex-grow"
                  onClick={handleAddToCart}
                />
                <button
                  onClick={() => toggleWishlistItem(product.id)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-3.5 border border-outline-variant rounded-[10px] hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center ${
                    isWishlisted ? 'text-red-500 border-red-200 bg-red-50' : 'text-text-muted bg-white'
                  }`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}>
                    favorite
                  </span>
                </button>
              </div>
            </div>

            {/* Warranty Info */}
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="material-symbols-outlined text-sm text-secondary">verified</span>
              <span>{product.warranty || 'Limited Warranty'}</span>
            </div>
          </div>
        </div>

        {/* 3. "Required for Installation" Dynamic Bundle Widget */}
        {companions.length > 0 && (
          <div className="bg-surface-lowest border-2 border-primary/20 rounded-[16px] p-6 sm:p-8 mb-12 shadow-sm">
            <div className="flex items-center gap-2 mb-4 border-b border-outline-variant pb-3">
              <span className="material-symbols-outlined text-secondary">extension</span>
              <div>
                <h3 className="text-base font-bold text-text-dark">Required & Recommended for Installation</h3>
                <p className="text-[11px] text-text-muted mt-0.5">Forget nothing! Check supply hoses, thread tapes, and sealants before beginning.</p>
              </div>
            </div>

            {/* Companion checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
              {companions.map((comp) => (
                <label
                  key={comp.id}
                  className={`flex items-start gap-3 p-3 border rounded-[10px] cursor-pointer transition-all duration-200 ${
                    selectedCompanions[comp.id]
                      ? 'border-primary bg-surface-high/20'
                      : 'border-outline-variant bg-white hover:border-gray-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCompanions[comp.id] || false}
                    onChange={() => handleCompanionCheckboxChange(comp.id)}
                    className="accent-primary rounded mt-1 cursor-pointer"
                  />
                  <img
                    src={comp.imageSrc}
                    alt=""
                    className="w-12 h-12 object-cover rounded bg-gray-50 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-text-dark truncate">{comp.title}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">SKU: {comp.sku}</p>
                    <p className="text-xs font-bold text-primary mt-1">${comp.price.toFixed(2)}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Total pricing and bundle add CTA */}
            <div className="bg-gray-50 border border-outline-variant rounded-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-text-muted">Total Bundle Price ({1 + Object.values(selectedCompanions).filter(Boolean).length} items):</p>
                <p className="text-xl font-extrabold text-primary">${bundleTotalPrice.toFixed(2)}</p>
              </div>
              <Button
                label="Add Installation Bundle to Cart"
                variant="primary"
                size="md"
                icon="library_add"
                onClick={handleAddBundleToCart}
              />
            </div>
          </div>
        )}

        {/* 4. Tabbed details spec sheets and review sheets */}
        <div className="bg-surface-lowest border border-outline-variant rounded-[16px] overflow-hidden shadow-sm">
          {/* Tabs bar */}
          <div className="flex border-b border-outline-variant bg-gray-50">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider focus:outline-none transition-colors border-r border-outline-variant ${
                activeTab === 'specs' ? 'bg-white text-primary border-t-2 border-t-primary' : 'text-text-muted hover:text-primary'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider focus:outline-none transition-colors ${
                activeTab === 'reviews' ? 'bg-white text-primary border-t-2 border-t-primary' : 'text-text-muted hover:text-primary'
              }`}
            >
              Customer Reviews ({productReviews.length})
            </button>
          </div>

          {/* Tab contents */}
          <div className="p-6 sm:p-8">
            {activeTab === 'specs' ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-text-dark mb-3">Product Overview</h4>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{product.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-text-dark mb-3">Specifications Table</h4>
                  <div className="border border-outline-variant rounded-[10px] overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, val], idx) => (
                          <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-4 py-2.5 font-bold text-text-dark capitalize border-r border-outline-variant/60 w-1/3">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </td>
                            <td className="px-4 py-2.5 text-text-muted capitalize">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60">
                  <h4 className="text-sm font-bold text-text-dark">User Feedback</h4>
                  <span className="text-xs text-text-muted">Showing {productReviews.length} reviews</span>
                </div>

                {productReviews.length === 0 ? (
                  <div className="text-center py-6 text-text-muted text-xs">
                    No reviews yet. Be the first to review this product!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map((rev) => (
                      <div key={rev.id} className="pb-4 border-b border-outline-variant last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-text-dark">{rev.name}</span>
                            {rev.isPro && (
                              <span className="text-[9px] bg-primary text-white font-bold px-1.5 py-0.5 rounded">
                                PRO PLUMBER
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-text-muted">{rev.date}</span>
                        </div>
                        <Rating score={rev.rating} />
                        <p className="text-xs text-text-muted mt-2 leading-relaxed">
                          {rev.comment}
                        </p>
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
export default ProductDetails
