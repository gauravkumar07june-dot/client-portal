// Mock data shaped like a future API response — swap fetchDashboardData's
// body for a real request without touching any component. Progress by
// building now comes live from the "packages" table (see packagesData.js);
// these fields are still mock on purpose (submittal status and material
// delivery aren't wired to Supabase yet).

const mockDashboardData = {
  overallProgress: 62,
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
