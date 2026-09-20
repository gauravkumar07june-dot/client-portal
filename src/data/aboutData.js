// Mock data shaped like a future API response — swap fetchAboutData's body
// for a real request without touching any component.

const mockAbout = {
  company: {
    description:
      'We have delivered residential and mixed-use projects across the region since 1998. On this project, our team manages every phase — from sitework to final walkthrough — so you always know exactly where things stand.',
  },
  team: [
    { id: 'member-01', name: 'Alex Rivera', role: 'Project Executive' },
    { id: 'member-02', name: 'Maria Chen', role: 'Project Manager' },
    { id: 'member-03', name: 'Devon Brooks', role: 'Site Superintendent' },
    { id: 'member-04', name: 'Priya Patel', role: 'Structural Engineer' },
    { id: 'member-05', name: 'Sam Okafor', role: 'MEP Coordinator' },
    { id: 'member-06', name: 'Jordan Lee', role: 'Quality & Safety Manager' },
  ],
}

export async function fetchAboutData() {
  return mockAbout
}
