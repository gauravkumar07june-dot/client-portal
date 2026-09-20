// Mock data shaped like a future API response — swap fetchDashboardData's
// body for a real request without touching any component.

const mockDashboardData = {
  overallProgress: 62,
  buildingProgress: [
    { id: 'building-a', label: 'Building A', percent: 78 },
    { id: 'building-b', label: 'Building B', percent: 54 },
    { id: 'parking-structure', label: 'Parking Structure', percent: 41 },
    { id: 'clubhouse', label: 'Clubhouse', percent: 88 },
    { id: 'site-utilities', label: 'Site Utilities', percent: 65 },
  ],
  submittals: {
    approved: 142,
    underReview: 37,
    rejected: 9,
  },
  materialDeliveries: [
    { id: 'delivered', label: 'Delivered', count: 58, status: 'good' },
    { id: 'in-transit', label: 'In Transit', count: 12, status: 'warning' },
    { id: 'delayed', label: 'Delayed', count: 3, status: 'critical' },
  ],
}

export async function fetchDashboardData() {
  return mockDashboardData
}
