import React from 'react'

export const Button = ({
  label,
  variant = 'primary',
  size = 'md',
  isDisabled = false,
  isLoading = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-[10px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  }

  const variantStyles = {
    primary: 'bg-text-dark text-white hover:bg-secondary hover:text-text-dark border border-transparent shadow-[0_2px_4px_rgba(0,0,0,0.06)] active:scale-98',
    secondary: 'border-2 border-primary text-primary bg-transparent hover:bg-surface-high active:scale-98',
    ghost: 'text-text-dark bg-transparent hover:bg-surface-high',
    icon: 'p-2 text-text-dark bg-transparent hover:bg-surface-high rounded-full',
  }

  const disabledStyles = 'opacity-30 cursor-not-allowed pointer-events-none'
  const loadingStyles = 'cursor-wait'

  const buttonClasses = `
    ${baseStyles}
    ${sizeStyles[size] || sizeStyles.md}
    ${variantStyles[variant] || variantStyles.primary}
    ${isDisabled ? disabledStyles : ''}
    ${isLoading ? loadingStyles : ''}
    ${className}
  `.trim()

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && icon && (
        <span className="material-symbols-outlined text-[1.25em]" aria-hidden="true">
          {icon}
        </span>
      )}
      {variant !== 'icon' && <span>{label}</span>}
    </button>
  )
}
