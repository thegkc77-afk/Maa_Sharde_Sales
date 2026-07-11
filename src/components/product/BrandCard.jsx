import React from 'react'

export const BrandCard = ({ brandName, logoUrl, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group w-full h-24 px-6 bg-surface-lowest border border-outline-variant rounded-[10px] flex flex-col items-center justify-center gap-1.5 focus:outline-none select-none transition-all duration-200 hover:border-primary hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] active:scale-98"
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${brandName} official logo`}
          className="h-10 max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-200"
          loading="lazy"
        />
      ) : (
        <span className="material-symbols-outlined text-3xl text-gray-500 group-hover:text-primary transition-colors">
          branding_watermark
        </span>
      )}
      <span className="text-xs font-bold text-[#6b7280] group-hover:text-text-dark transition-colors duration-150">
        {brandName}
      </span>
    </button>
  )
}
export default BrandCard
