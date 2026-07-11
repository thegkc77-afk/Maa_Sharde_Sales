import React from 'react'

export const FeatureCard = ({ iconName, title, description, layout = 'responsive' }) => {
  const containerClasses = layout === 'responsive'
    ? 'flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-5 bg-surface-lowest border border-outline-variant rounded-[10px]'
    : 'flex flex-col items-center text-center gap-3 p-5 bg-surface-lowest border border-outline-variant rounded-[10px]'

  return (
    <div className={containerClasses}>
      {/* Circular icon container */}
      <div className="w-12 h-12 rounded-full bg-surface-high text-primary flex items-center justify-center flex-shrink-0 select-none">
        <span className="material-symbols-outlined text-2xl" aria-hidden="true">
          {iconName}
        </span>
      </div>

      {/* Feature Text Info */}
      <div className="flex flex-col gap-0.5">
        <h4 className="text-xs sm:text-sm font-bold text-text-dark uppercase tracking-wide leading-tight">
          {title}
        </h4>
        <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
export default FeatureCard
