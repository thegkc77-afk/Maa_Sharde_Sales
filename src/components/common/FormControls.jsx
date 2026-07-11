import React from 'react'

export const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  errorMsg,
  onChange,
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-dark">
          {label} {required && <span className="text-success">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-4 py-2.5 rounded-[10px] text-sm text-text-dark bg-surface-lowest border border-outline-variant
          placeholder:text-text-muted transition-all duration-200
          disabled:bg-gray-100 disabled:text-text-muted disabled:cursor-not-allowed
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
          ${errorMsg ? 'border-success ring-1 ring-success focus:ring-success focus:border-success' : ''}
        `.trim()}
        {...props}
      />
      {errorMsg && (
        <span className="text-xs text-success font-medium">
          {errorMsg}
        </span>
      )}
    </div>
  )
}

export const Dropdown = ({
  id,
  label,
  options = [],
  selectedValue,
  onChange,
  className = '',
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-dark">
          {label} {required && <span className="text-success">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={selectedValue}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full px-4 py-2.5 rounded-[10px] text-sm text-text-dark bg-surface-lowest border border-outline-variant
            appearance-none transition-all duration-200 cursor-pointer
            disabled:bg-gray-100 disabled:text-text-muted disabled:cursor-not-allowed
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
          `.trim()}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted select-none">
          keyboard_arrow_down
        </span>
      </div>
    </div>
  )
}
