// Mock data shaped like a future API response — swap fetchFooterData's body
// for a real request without touching any component. Company name and email
// live in src/config/site.js instead, so they stay in sync across sections.
// The address/phone below are placeholders — swap for real ones.

const mockFooter = {
  company: {
    address: '480 Harbor Way, Suite 210, Portland, OR 97201',
    phone: '+1 (555) 010-2984',
  },
  socialLinks: [
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'x', label: 'X (Twitter)' },
    { id: 'facebook', label: 'Facebook' },
  ],
}

export async function fetchFooterData() {
  return mockFooter
}
