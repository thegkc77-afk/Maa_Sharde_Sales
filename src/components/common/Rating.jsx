import React from 'react'

export const Rating = ({ score = 0, size = 'sm' }) => {
  const roundedScore = Math.round(score * 2) / 2 // round to nearest 0.5
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedScore) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-tertiary select-none"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      )
    } else if (i - 0.5 === roundedScore) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-tertiary select-none"
        >
          star_half
        </span>
      )
    } else {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-gray-300 select-none"
          style={{ fontVariationSettings: "'FILL' 0" }}
        >
          star
        </span>
      )
    }
  }

  const sizeClass = size === 'md' ? 'text-lg gap-0.5' : 'text-sm gap-0.5'

  return (
    <div className={`flex items-center ${sizeClass}`} aria-label={`Rating: ${score} out of 5 stars`}>
      {stars}
    </div>
  )
}
