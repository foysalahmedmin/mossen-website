import { PolicyView } from '@/components/editorial/policy-view'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('terms')

const SECTIONS = [
  {
    heading: '1. Storefront Terms & Demo Agreement',
    content: [
      'Welcome to the MOSSEN botanical storefront. By browsing our wardrobe, using the Mirror Try virtual window, or placing simulated orders, you agree to the conditions set forth in this agreement.',
      'This website operates as an educational and technical demonstration showcasing slow-craft luxury e-commerce. Placed orders are simulations and do not result in financial charges or dispatched parcels.',
    ],
  },
  {
    heading: '2. Intellectual Property & Natural Dye Recipes',
    content: [
      'All textile essays, garment imagery, botanical pattern drafts, brand marks, and software code are the proprietary creation of MOSSEN and our collaborating weaving guilds.',
      'Unauthorized reproduction, automated extraction, or commercial repurposing of our content is prohibited.',
    ],
  },
  {
    heading: '3. Pricing & Small-Batch Harvests',
    content: [
      'Garment prices are presented in United States Dollars (USD) as indicative artisanal benchmarks. Due to natural crop variations and seasonal dye batches, pieces are subject to limited availability.',
      'Order confirmations generate proof of reservation within our demonstration framework.',
    ],
  },
  {
    heading: '4. Governing Law & Gentle Resolution',
    content: [
      'These Terms of Service and any agreement arising from your use of this storefront shall be governed by and construed in accordance with the laws of Denmark, without regard to conflict of law principles.',
      'Any dispute or inquiry shall be settled amicably or before the competent civil courts of Copenhagen, Denmark.',
    ],
  },
]

export default function TermsPage() {
  return (
    <PolicyView
      title="Terms of Service & Sanctuary Agreement"
      subtitle="Guiding principles, intellectual property rules, and terms of service."
      lastUpdated="October 2026"
      sections={SECTIONS}
    />
  )
}
