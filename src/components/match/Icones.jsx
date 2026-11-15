// Petites icônes utilisées dans les blocs de match (dessinées en SVG, sans bibliothèque).

export function IconeAlerte() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 5.5v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function IconeCadenas() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <rect x="4" y="9" width="12" height="8.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
