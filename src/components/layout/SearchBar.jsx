import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { products, categories } from '../../data/mockData'

export const SearchBar = ({ placeholder = 'Search by SKU, product name, or brand...' }) => {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const navigate = useNavigate()
  const searchRef = useRef(null)

  // Close suggestion dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter suggestions dynamically
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    const delayDebounce = setTimeout(() => {
      const q = query.toLowerCase()
      const filtered = products.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        const matchesQuery = 
          product.title.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          (product.specifications.material && product.specifications.material.toLowerCase().includes(q)) ||
          (product.specifications.finish && product.specifications.finish.toLowerCase().includes(q))
        
        return matchesCategory && matchesQuery
      })
      setSuggestions(filtered.slice(0, 5)) // cap at 5 suggestions
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(delayDebounce)
  }, [query, selectedCategory])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsOpen(false)
    if (query.trim()) {
      navigate(`/categories/${selectedCategory}?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate(`/categories/${selectedCategory}`)
    }
  }

  const handleSuggestionClick = (product) => {
    setQuery('')
    setIsOpen(false)
    navigate(`/categories/${product.category}/${product.id}`)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-[600px] flex-grow z-40">
      <form onSubmit={handleSubmit} className="flex items-stretch bg-surface-lowest border border-outline-variant rounded-[10px] shadow-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary overflow-hidden">
        {/* Category Scope Selection */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-50 text-text-dark text-xs font-semibold px-3 py-2 border-r border-outline-variant outline-none cursor-pointer hover:bg-gray-100 transition-colors"
          aria-label="Search category scope"
        >
          <option value="all">All Departments</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name.split(' ')[0]} {/* short name */}
            </option>
          ))}
        </select>

        {/* Search Text Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="flex-grow px-4 py-2 text-sm text-text-dark bg-transparent outline-none placeholder:text-text-muted"
        />

        {/* Submit Action Button */}
        <button
          type="submit"
          className="bg-primary text-white hover:bg-secondary hover:text-text-dark px-5 flex items-center justify-center transition-all duration-200"
          aria-label="Submit Search"
        >
          {isLoading ? (
            <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <span className="material-symbols-outlined select-none text-base">search</span>
          )}
        </button>
      </form>

      {/* Autocomplete Popover (Level 3 shadow) */}
      {isOpen && (query.trim().length >= 2 || suggestions.length > 0) && (
        <div className="absolute left-0 right-0 mt-1 bg-surface-lowest border border-outline-variant rounded-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.18)] z-50 overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-sm text-text-muted text-center flex items-center justify-center gap-2">
              <span className="animate-pulse">Searching catalog...</span>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="flex flex-col">
              <div className="bg-gray-50 px-4 py-1.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider border-b border-outline-variant">
                Matching Products
              </div>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSuggestionClick(product)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-high transition-colors text-left w-full border-b border-outline-variant last:border-0"
                >
                  <img
                    src={product.imageSrc}
                    alt=""
                    className="w-10 h-10 object-cover rounded bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-grow overflow-hidden">
                    <div className="text-xs font-semibold text-text-dark truncate">
                      {product.title}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-text-muted">
                      <span>SKU: {product.sku}</span>
                      <span>•</span>
                      <span className="capitalize">{product.brand}</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-primary flex-shrink-0">
                    ${product.price.toFixed(2)}
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-center py-2 text-xs font-semibold text-primary hover:bg-gray-50 transition-colors uppercase tracking-wider border-t border-outline-variant"
              >
                See all matching results
              </button>
            </div>
          ) : (
            <div className="p-4 text-sm text-text-muted text-center">
              No direct matches found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}
export default SearchBar
