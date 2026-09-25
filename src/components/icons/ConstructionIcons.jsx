// Minimal line-style construction icons, used for section headers and
// empty states in place of generic checkmarks/dots.

export function CraneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 17.5V4m0 0 8 3.5M4 4l3-2M4 7.5h9.5M13.5 7.5 12 17.5m1.5-10 3 2-3 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function HammerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m11 7-6.5 6.5a1.4 1.4 0 0 0 2 2L13 9m-2-2 2.5-2.5a3 3 0 0 1 2-1l1.5-.2a.5.5 0 0 1 .5.7L16.5 6a3 3 0 0 1-1 2L13 10.5M11 7l2 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BlueprintIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3 7h3M3 11h2M6 3v3M6 3H3M10 3v14M14 3v14M6 17v-6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function HardHatIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 15.5h14a1 1 0 0 0 1-1v-.25c0-.41-.34-.75-.75-.75H2.75c-.41 0-.75.34-.75.75v.25a1 1 0 0 0 1 1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 13.5a5.5 5.5 0 0 1 11 0M10 8V5.5m-2.5 0h5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
