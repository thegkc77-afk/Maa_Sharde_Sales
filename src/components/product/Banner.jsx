import React from 'react'
import { Button } from '../common/Button'

export const Banner = ({
  title,
  subtitle,
  badgeText,
  imageSrc,
  buttonText,
  variant = 'primary',
  onButtonClick,
}) => {
  const variantStyles = {
    primary: 'bg-[#C2410C] text-white border-transparent', // Darker Rust-Orange for compliant WCAG white-text contrast
    secondary: 'bg-surface-lowest border border-outline-variant text-text-dark',
    dark: 'bg-primary text-white border-transparent', // Deep blue
  }

  const btnVariant = variant === 'secondary' ? 'primary' : 'secondary'

  return (
    <div
      className={`
        relative w-full rounded-[16px] overflow-hidden p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6
        ${variantStyles[variant] || variantStyles.primary}
      `.trim()}
    >
      {/* Background/decorative grid effects */}
      {variant !== 'secondary' && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
      )}

      {/* Left: Text Contents */}
      <div className="flex flex-col items-start gap-3 max-w-[550px] z-10 text-center md:text-left">
        {badgeText && (
          <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-[4px] ${
            variant === 'secondary' ? 'bg-primary text-white' : 'bg-secondary text-text-dark'
          }`}>
            {badgeText}
          </span>
        )}
        <h3 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className={`text-xs sm:text-sm leading-relaxed ${
            variant === 'secondary' ? 'text-text-muted' : 'text-gray-200'
          }`}>
            {subtitle}
          </p>
        )}
        <div className="mt-2 w-full md:w-auto">
          <Button
            label={buttonText}
            variant={btnVariant}
            size="md"
            onClick={onButtonClick}
            className={variant === 'secondary' ? 'w-full md:w-auto' : 'w-full md:w-auto hover:bg-white hover:text-primary'}
          />
        </div>
      </div>

      {/* Right: Graphic / image asset */}
      {imageSrc && (
        <div className="w-full md:w-1/2 max-w-[280px] h-[160px] relative z-10 flex items-center justify-center">
          <img
            src={imageSrc}
            alt=""
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-[10px]"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}
export default Banner
