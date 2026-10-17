import { PolicyView } from '@/components/editorial/policy-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('privacy')

const SECTIONS = [
  {
    heading: '1. Ecological Privacy & Data Stewardship',
    content: [
      'At MOSSEN, we view privacy through the same lens of respect and non-intrusion that guides our botanical agriculture. This policy outlines how we handle personal data when you explore our natural garments or use our Mirror Try virtual window.',
      'We never sell, rent, or trade your personal information or contact details to third-party commercial marketing platforms or data intermediaries.',
    ],
  },
  {
    heading: '2. Personal Information Collected',
    content: [
      'Account & Order Data: Name, postal address, email, and transaction archives necessary to fulfill orders and satisfy customs protocols for international delivery.',
      'Mirror Try Telemetry: Silhouettes and torso anchor calculations within the virtual try-on window are processed strictly in your local device memory during active sessions and disappear upon closing the tab. We never collect or store biometric imagery.',
    ],
  },
  {
    heading: '3. Cookie Practices & Respect',
    content: [
      'We use minimal, strictly necessary cookies to keep your Basket contents safe and remember your currency preferences.',
      'No intrusive behavioral tracking scripts are deployed. You may choose to disable all non-essential cookies in your browser settings at any time without impacting your ability to browse our wardrobe.',
    ],
  },
  {
    heading: '4. Your Consumer Rights & Deletion',
    content: [
      'Under European and international privacy frameworks (including GDPR), you retain full rights to inspect, correct, or request the permanent erasure of your personal data archive.',
      'To make a data request, please send a note to our care desk at concierge@mossen-atelier.com.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <PolicyView
      title="Privacy Policy & Ecological Data Charter"
      subtitle="Our commitments to non-intrusive data stewardship, cookie privacy, and digital quiet."
      lastUpdated="October 2026"
      sections={SECTIONS}
    />
  )
}
