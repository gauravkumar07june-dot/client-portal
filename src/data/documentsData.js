// Mock data shaped like a future API response — swap fetchDocumentsData's
// body for a real request without touching any component.

const mockDocuments = [
  { id: 'doc-01', name: 'DPR - Week 32.pdf', category: 'DPR', fileType: 'PDF', uploadedDate: '2026-08-10' },
  { id: 'doc-02', name: 'DPR - Week 33.pdf', category: 'DPR', fileType: 'PDF', uploadedDate: '2026-08-17' },
  { id: 'doc-03', name: 'DPR - Week 34.pdf', category: 'DPR', fileType: 'PDF', uploadedDate: '2026-08-24' },

  { id: 'doc-04', name: 'Structural Steel Shop Drawings.pdf', category: 'Submittals', fileType: 'PDF', uploadedDate: '2026-06-02' },
  { id: 'doc-05', name: 'Curtain Wall Submittal.pdf', category: 'Submittals', fileType: 'PDF', uploadedDate: '2026-07-14' },
  { id: 'doc-06', name: 'MEP Submittal Package 3.xlsx', category: 'Submittals', fileType: 'XLSX', uploadedDate: '2026-09-01' },

  { id: 'doc-07', name: 'Building A - Floor Plans.dwg', category: 'Drawings', fileType: 'DWG', uploadedDate: '2026-04-18' },
  { id: 'doc-08', name: 'Site Plan - Rev C.dwg', category: 'Drawings', fileType: 'DWG', uploadedDate: '2026-05-02' },
  { id: 'doc-09', name: 'Foundation Details.pdf', category: 'Drawings', fileType: 'PDF', uploadedDate: '2026-03-22' },
  { id: 'doc-10', name: 'Elevations - Building B.dwg', category: 'Drawings', fileType: 'DWG', uploadedDate: '2026-07-05' },
]

export async function fetchDocumentsData() {
  return mockDocuments
}
