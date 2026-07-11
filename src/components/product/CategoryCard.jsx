import React from 'react'

export const CategoryCard = ({
  title,
  imageSrc,
  itemCount,
  onClick,
  variant = 'square',
}) => {
  if (variant === 'circular') {
    return (
      <button
        onClick={onClick}
        className="group flex flex-col items-center text-center gap-3 focus:outline-none select-none"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-outline-variant bg-gray-50 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:border-secondary transition-all duration-200">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-bold text-text-dark group-hover:text-secondary transition-colors duration-150">
            {title}
          </span>
          {itemCount !== undefined && (
            <span className="text-[10px] text-text-muted mt-0.5">{itemCount} items</span>
          )}
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className="group relative w-full h-[180px] rounded-[10px] overflow-hidden shadow-sm hover:shadow-md border border-outline-variant flex items-end justify-start text-left focus:outline-none select-none bg-gray-900"
    >
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-50 transition-all duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-10" />
      
      <div className="relative p-5 z-20 flex flex-col gap-0.5">
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-secondary transition-colors duration-150">
          {title}
        </h3>
        {itemCount !== undefined && (
          <span className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider">{itemCount} Products</span>
        )}
      </div>
    </button>
  )
}
export default CategoryCard
