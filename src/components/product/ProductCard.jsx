import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '../common/Rating'
import { WishlistIcon } from '../common/WishlistIcon'
import { Button } from '../common/Button'

export const ProductCard = ({
  id,
  title,
  price,
  originalPrice,
  imageSrc,
  rating,
  reviewCount,
  isProGrade = false,
  isSale = false,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  variant = 'grid',
  sku = '',
  specifications = {},
}) => {
  
  if (variant === 'list') {
    // Compact Spec-Sheet Table Row Format (for Pro Contractors)
    return (
      <div className="w-full bg-surface-lowest border border-outline-variant hover:bg-surface-high transition-colors rounded-[10px] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Product image and basic text details */}
        <div className="flex items-center gap-4 w-full md:w-2/5">
          <Link to={`/categories/${specifications.category || 'all'}/${id}`} className="flex-shrink-0">
            <img
              src={imageSrc}
              alt={title}
              className="w-16 h-16 object-cover rounded-[10px] bg-gray-50 border border-outline-variant"
            />
          </Link>
          <div className="min-w-0">
            <div className="flex gap-2 mb-1 flex-wrap">
              {isProGrade && (
                <span className="bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider">
                  PRO GRADE
                </span>
              )}
              {isSale && (
                <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider">
                  SALE
                </span>
              )}
            </div>
            <Link
              to={`/categories/${specifications.category || 'all'}/${id}`}
              className="text-sm font-bold text-text-dark hover:text-secondary hover:underline transition-all block truncate"
            >
              {title}
            </Link>
            <p className="text-[11px] text-text-muted mt-0.5">SKU: <span className="font-semibold">{sku}</span></p>
          </div>
        </div>

        {/* Tech Specs block */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 w-full md:w-2/5 text-xs text-text-muted border-t md:border-t-0 pt-3 md:pt-0 border-outline-variant">
          <div>Material: <span className="font-semibold text-text-dark">{specifications.material || 'N/A'}</span></div>
          <div>Size/Dia: <span className="font-semibold text-text-dark">{specifications.size || specifications.diameter || 'N/A'}</span></div>
          <div>Conn Type: <span className="font-semibold text-text-dark text-[10px]">{specifications.connectionType || 'N/A'}</span></div>
          {specifications.finish && (
            <div className="col-span-2">Finish: <span className="font-semibold text-text-dark">{specifications.finish}</span></div>
          )}
        </div>

        {/* Pricing and Quick Add to Cart CTA */}
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-1/5 border-t md:border-t-0 pt-3 md:pt-0 border-outline-variant">
          <div className="text-right">
            {originalPrice && (
              <p className="text-[10px] text-text-muted line-through">${originalPrice.toFixed(2)}</p>
            )}
            <p className="text-base font-bold text-primary">${price.toFixed(2)}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <WishlistIcon
              productId={id}
              isWishlisted={isWishlisted}
              onToggle={onToggleWishlist}
            />
            <Button
              label="Quick Add"
              variant="primary"
              size="sm"
              icon="add_shopping_cart"
              onClick={() => onAddToCart(id)}
            />
          </div>
        </div>
      </div>
    )
  }

  // Standard Consumer Grid View Card Format (with rich hover animations)
  return (
    <div className="group relative bg-surface-lowest border border-outline-variant rounded-[10px] overflow-hidden flex flex-col h-full hover-lift custom-shadow hover:custom-shadow-hover transition-all duration-200">
      
      {/* Absolute Badges Block */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {isProGrade && (
          <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
            PRO GRADE
          </span>
        )}
        {isSale && (
          <span className="bg-[#EF4444] text-white text-[9px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
            SALE
          </span>
        )}
      </div>

      {/* Absolute Wishlist Button */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistIcon
          productId={id}
          isWishlisted={isWishlisted}
          onToggle={onToggleWishlist}
        />
      </div>

      {/* Product Image Panel */}
      <Link
        to={`/categories/${specifications.category || 'all'}/${id}`}
        className="w-full h-[240px] bg-gray-50 flex items-center justify-center overflow-hidden border-b border-outline-variant"
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Product Information Panel */}
      <div className="p-4 flex flex-col flex-grow gap-2.5">
        {/* Brand Tag */}
        {specifications.brand && (
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none">
            {specifications.brand}
          </span>
        )}
        
        {/* Title */}
        <Link
          to={`/categories/${specifications.category || 'all'}/${id}`}
          className="text-sm font-semibold text-text-dark group-hover:text-secondary transition-colors duration-150 line-clamp-2 h-10 overflow-hidden leading-snug"
        >
          {title}
        </Link>

        {/* Rating stars display */}
        <div className="flex items-center gap-1.5">
          <Rating score={rating} />
          <span className="text-[11px] text-text-muted font-medium">({reviewCount})</span>
        </div>

        {/* Price layout */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-bold text-primary">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-xs text-text-muted line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Dynamic CTA Button */}
        <Button
          label="Add to Cart"
          variant="primary"
          size="sm"
          icon="shopping_cart"
          className="w-full mt-2 group-hover:bg-secondary group-hover:text-text-dark transition-colors duration-250"
          onClick={() => onAddToCart(id)}
        />
      </div>
    </div>
  )
}
export default ProductCard
