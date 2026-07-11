import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { products, categories, brands } from '../data/mockData'
import { ProductCard } from '../components/product/ProductCard'
import { useCartStore } from '../store/useCartStore'
import { useUserStore } from '../store/useUserStore'

export const ProductListing = () => {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { wishlistItems, toggleWishlistItem } = useUserStore()

  // State controls
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('popular') // 'popular', 'price-asc', 'price-desc', 'rating'
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter Facets States
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [selectedFinishes, setSelectedFinishes] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedConnections, setSelectedConnections] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [onlyPro, setOnlyPro] = useState(false)
  const [onlySale, setOnlySale] = useState(false)
  const [maxPrice, setMaxPrice] = useState(500)

  // Reset filters on category changes
  useEffect(() => {
    setSelectedMaterials([])
    setSelectedFinishes([])
    setSelectedBrands([])
    setSelectedConnections([])
    setSelectedSizes([])
    setOnlyPro(false)
    setOnlySale(false)
    setMaxPrice(500)
    setCurrentPage(1)
  }, [categoryId])

  // Get active query parameters
  const searchQuery = searchParams.get('q') || ''
  const brandQuery = searchParams.get('brand') || ''

  useEffect(() => {
    if (brandQuery) {
      setSelectedBrands([brandQuery])
    }
  }, [brandQuery])

  // Extract department details
  const activeCategory = categories.find((cat) => cat.id === categoryId)
  const categoryTitle = activeCategory ? activeCategory.name : 'All Products'

  // Apply filters
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (categoryId && categoryId !== 'all' && product.category !== categoryId) {
      return false
    }

    // 2. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const match =
        product.title.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        (product.specifications.material && product.specifications.material.toLowerCase().includes(q)) ||
        (product.specifications.finish && product.specifications.finish.toLowerCase().includes(q))
      if (!match) return false
    }

    // 3. Faceted Filter Sidebars
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.specifications.material)) {
      return false
    }
    if (selectedFinishes.length > 0 && !selectedFinishes.includes(product.specifications.finish)) {
      return false
    }
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false
    }
    if (selectedConnections.length > 0 && !selectedConnections.includes(product.specifications.connectionType)) {
      return false
    }
    const sizeVal = product.specifications.size || product.specifications.diameter
    if (selectedSizes.length > 0 && !selectedSizes.includes(sizeVal)) {
      return false
    }

    // 4. Badges and price ranges
    if (onlyPro && !product.isProGrade) return false
    if (onlySale && !product.isSale) return false
    if (product.price > maxPrice) return false

    return true
  })

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return b.reviewCount - a.reviewCount // popular defaults
  })

  // Pagination bounds
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleAddToCart = (id) => {
    const product = products.find((p) => p.id === id)
    if (product) {
      addToCart(product, 1)
    }
  }

  // Gather filter checklist options from current inventory dynamically
  const uniqueMaterials = [...new Set(products.map((p) => p.specifications.material).filter(Boolean))]
  const uniqueFinishes = [...new Set(products.map((p) => p.specifications.finish).filter(Boolean))]
  const uniqueConnections = [...new Set(products.map((p) => p.specifications.connectionType).filter(Boolean))]
  const uniqueSizes = [...new Set(products.map((p) => p.specifications.size || p.specifications.diameter).filter(Boolean))]

  const toggleFacet = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
    setCurrentPage(1)
  }

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-6 uppercase tracking-wider font-semibold">
          <button onClick={() => navigate('/')} className="hover:text-secondary">Home</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <button onClick={() => navigate('/categories')} className="hover:text-secondary">Departments</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-text-dark">{categoryTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 1. Faceted Filter Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface-lowest border border-outline-variant rounded-[10px] p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
                <span className="text-xs font-bold text-text-dark uppercase tracking-wider">Filters</span>
                <button
                  onClick={() => {
                    setSelectedMaterials([])
                    setSelectedFinishes([])
                    setSelectedBrands([])
                    setSelectedConnections([])
                    setSelectedSizes([])
                    setOnlyPro(false)
                    setOnlySale(false)
                    setMaxPrice(500)
                    setCurrentPage(1)
                  }}
                  className="text-[10px] text-secondary hover:underline font-bold uppercase"
                >
                  Clear All
                </button>
              </div>

              {/* Price range filter */}
              <div className="mb-6">
                <label className="text-xs font-bold text-text-dark uppercase block mb-2">Max Price (${maxPrice})</label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
              </div>

              {/* Badges Toggles */}
              <div className="space-y-2 mb-6">
                <label className="flex items-center gap-2 text-xs font-bold text-text-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyPro}
                    onChange={(e) => {
                      setOnlyPro(e.target.checked)
                      setCurrentPage(1)
                    }}
                    className="accent-primary rounded"
                  />
                  <span>PRO CONTRACTOR GRADE</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-text-dark cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlySale}
                    onChange={(e) => {
                      setOnlySale(e.target.checked)
                      setCurrentPage(1)
                    }}
                    className="accent-primary rounded"
                  />
                  <span>SALE clearance ONLY</span>
                </label>
              </div>

              {/* Brand filter list */}
              <div className="mb-6">
                <span className="text-xs font-bold text-text-dark uppercase tracking-wider block mb-2">Brand</span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {brands.map((b) => (
                    <label key={b.id} className="flex items-center gap-2 text-xs text-text-dark cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b.id)}
                        onChange={() => toggleFacet(selectedBrands, setSelectedBrands, b.id)}
                        className="accent-primary rounded"
                      />
                      <span className="capitalize">{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material filter list */}
              {uniqueMaterials.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-bold text-text-dark uppercase tracking-wider block mb-2">Material</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {uniqueMaterials.map((mat) => (
                      <label key={mat} className="flex items-center gap-2 text-xs text-text-dark cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(mat)}
                          onChange={() => toggleFacet(selectedMaterials, setSelectedMaterials, mat)}
                          className="accent-primary rounded"
                        />
                        <span>{mat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Finish filter list */}
              {uniqueFinishes.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-bold text-text-dark uppercase tracking-wider block mb-2">Finish Color</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {uniqueFinishes.map((f) => (
                      <label key={f} className="flex items-center gap-2 text-xs text-text-dark cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFinishes.includes(f)}
                          onChange={() => toggleFacet(selectedFinishes, setSelectedFinishes, f)}
                          className="accent-primary rounded"
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Connection Type */}
              {uniqueConnections.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-bold text-text-dark uppercase tracking-wider block mb-2">Connection Type</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {uniqueConnections.map((conn) => (
                      <label key={conn} className="flex items-center gap-2 text-xs text-text-dark cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedConnections.includes(conn)}
                          onChange={() => toggleFacet(selectedConnections, setSelectedConnections, conn)}
                          className="accent-primary rounded"
                        />
                        <span>{conn}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes / Diameters */}
              {uniqueSizes.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-text-dark uppercase tracking-wider block mb-2">Size / Dimension</span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {uniqueSizes.map((sz) => (
                      <label key={sz} className="flex items-center gap-2 text-xs text-text-dark cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(sz)}
                          onChange={() => toggleFacet(selectedSizes, setSelectedSizes, sz)}
                          className="accent-primary rounded"
                        />
                        <span>{sz}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Main Product display grid */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Listing Header Controls */}
            <div className="bg-surface-lowest border border-outline-variant rounded-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="text-xs text-text-muted font-semibold">
                Showing <span className="text-text-dark font-bold">{filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of <span className="text-text-dark font-bold">{filteredProducts.length}</span> Products
                {searchQuery && (
                  <span> matching "<span className="text-secondary font-bold">{searchQuery}</span>"</span>
                )}
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                {/* Sorting Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sorting-list" className="text-xs text-text-muted font-bold uppercase">Sort By:</label>
                  <select
                    id="sorting-list"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="bg-gray-50 border border-outline-variant text-xs font-bold px-3 py-1.5 rounded-[6px] text-text-dark outline-none cursor-pointer"
                  >
                    <option value="popular">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Average Reviews</option>
                  </select>
                </div>

                {/* View toggle layout buttons */}
                <div className="flex items-center border border-outline-variant rounded-[6px] overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 flex items-center justify-center transition-colors focus:outline-none ${
                      viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-200'
                    }`}
                    aria-label="Grid layout view"
                  >
                    <span className="material-symbols-outlined text-base">grid_view</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 flex items-center justify-center transition-colors focus:outline-none ${
                      viewMode === 'list' ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-200'
                    }`}
                    aria-label="Compact spec list view"
                  >
                    <span className="material-symbols-outlined text-base">view_list</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product items display list */}
            {paginatedProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    imageSrc={product.imageSrc}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    isProGrade={product.isProGrade}
                    isSale={product.isSale}
                    sku={product.sku}
                    specifications={product.specifications}
                    variant={viewMode}
                    isWishlisted={wishlistItems.includes(product.id)}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={toggleWishlistItem}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-surface-lowest border border-outline-variant rounded-[10px] p-12 text-center text-text-muted shadow-sm flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-5xl text-gray-300">search_off</span>
                <h4 className="font-bold text-text-dark text-sm">No items found matching filters.</h4>
                <p className="text-xs">Adjust your checkboxes or drag pricing ranges higher.</p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-outline-variant hover:bg-surface-high rounded-[6px] text-text-dark disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  aria-label="Previous page"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pg = index + 1
                  return (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className={`h-9 w-9 text-xs font-bold rounded-[6px] transition-all ${
                        currentPage === pg
                          ? 'bg-primary text-white'
                          : 'border border-outline-variant text-text-dark hover:bg-surface-high'
                      }`}
                    >
                      {pg}
                    </button>
                  )
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-outline-variant hover:bg-surface-high rounded-[6px] text-text-dark disabled:opacity-20 disabled:pointer-events-none transition-colors"
                  aria-label="Next page"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductListing
