// Mock data shaped like a future API response — swap fetchTasksData's body
// for a real request without touching any component.

const mockTasks = [
  { id: 'pkg-01', packageName: 'Sitework & Excavation', status: 'completed', owner: 'Maria Chen', targetDate: '2026-03-10' },
  { id: 'pkg-02', packageName: 'Foundation', status: 'completed', owner: 'Maria Chen', targetDate: '2026-04-22' },
  { id: 'pkg-03', packageName: 'Structural Steel', status: 'on-track', owner: 'Devon Brooks', targetDate: '2026-06-05' },
  { id: 'pkg-04', packageName: 'Building A Framing', status: 'on-track', owner: 'Priya Patel', targetDate: '2026-07-18' },
  { id: 'pkg-05', packageName: 'Building B Framing', status: 'delayed', owner: 'Priya Patel', targetDate: '2026-07-30' },
  { id: 'pkg-06', packageName: 'Roofing', status: 'on-track', owner: 'Sam Okafor', targetDate: '2026-08-12' },
  { id: 'pkg-07', packageName: 'MEP Rough-in', status: 'delayed', owner: 'Jordan Lee', targetDate: '2026-09-02' },
  { id: 'pkg-08', packageName: 'Exterior Envelope', status: 'on-track', owner: 'Devon Brooks', targetDate: '2026-09-20' },
  { id: 'pkg-09', packageName: 'Interior Finishes', status: 'on-track', owner: 'Maria Chen', targetDate: '2026-11-01' },
  { id: 'pkg-10', packageName: 'Parking Structure', status: 'delayed', owner: 'Sam Okafor', targetDate: '2026-10-15' },
]

export async function fetchTasksData() {
  return mockTasks
}
