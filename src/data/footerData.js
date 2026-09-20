// Mock data shaped like a future API response — swap fetchFooterData's body
// for a real request without touching any component. Contact details below
// are placeholders (reserved .example domain, 555 phone) — swap for real ones.

const mockFooter = {
  company: {
    name: 'Meridian Construction Group',
    address: '480 Harbor Way, Suite 210, Portland, OR 97201',
    email: 'projects@meridianconstruction.example',
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
