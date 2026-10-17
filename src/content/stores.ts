import type { Store } from '@/domain'

export const stores: Store[] = [
  {
    id: 's-copenhagen-atelier',
    name: 'MOSSEN Copenhagen Sanctuary & Tea House',
    address: 'Bredgade 34',
    city: 'Copenhagen',
    country: 'Denmark',
    phone: '+45 33 12 45 80',
    hours: [
      'Tuesday – Friday: 11:00 – 18:00',
      'Saturday: 10:00 – 17:00',
      'Sunday – Monday: Closed for Foraging & Dyeing',
    ],
  },
  {
    id: 's-stockholm-archipelago',
    name: 'MOSSEN Stockholm Wool & Flax Archive',
    address: 'Mäster Samuelsgatan 10',
    city: 'Stockholm',
    country: 'Sweden',
    phone: '+46 8 611 20 40',
    hours: ['Monday – Friday: 10:30 – 18:30', 'Saturday: 11:00 – 17:00', 'Sunday: 12:00 – 16:00'],
  },
  {
    id: 's-kyoto-botanical',
    name: 'MOSSEN Kyoto Natural Dye Pavilion',
    address: '421 Shimokoriki-cho, Nakagyo-ku',
    city: 'Kyoto',
    country: 'Japan',
    phone: '+81 75 221 8890',
    hours: ['Wednesday – Monday: 11:00 – 19:00', 'Tuesday: Closed for Garden Rest'],
  },
]
