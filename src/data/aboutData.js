// Mock data shaped like a future API response — swap fetchAboutData's body
// for a real request without touching any component. The team roster now
// comes live from the "staff" table (see staffData.js); the company blurb
// is still mock on purpose.

const mockAbout = {
  company: {
    description:
      'We have delivered residential and mixed-use projects across the region since 1998. On this project, our team manages every phase — from sitework to final walkthrough — so you always know exactly where things stand.',
  },
}

export async function fetchAboutData() {
  return mockAbout
}
