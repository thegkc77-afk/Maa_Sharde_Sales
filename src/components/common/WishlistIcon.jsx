import React, { useState } from 'react'

export const WishlistIcon = ({
  productId,
  isWishlisted = false,
  onToggle,
  className = '',
}) => {
  const [isBouncing, setIsBouncing] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBouncing(true)
    onToggle(productId, !isWishlisted)
    setTimeout(() => {
      setIsBouncing(false)
    }, 300)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`
        relative p-2 rounded-full bg-white hover:bg-gray-50 text-gray-400 hover:text-red-500
        transition-all duration-200 border border-gray-100 flex items-center justify-center
        ${isBouncing ? 'scale-90 animate-none' : 'hover:scale-110 active:scale-95'}
        ${isWishlisted ? 'text-red-500' : ''}
        ${className}
      `.trim()}
      style={{
        transform: isBouncing ? 'scale(1.15)' : undefined,
        transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.15s ease'
      }}
    >
      <span
        className="material-symbols-outlined select-none"
        style={{
          fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
          color: isWishlisted ? '#EF4444' : undefined // Tailored red
        }}
      >
        favorite
      </span>
    </button>
  )
}
