// Import all Balaji images
import balaji1 from '../assets/ourcreation/murti/balaji/a251c6b4-8e74-4c4d-bd86-dc4cca8b2626.png'
import balaji2 from '../assets/ourcreation/murti/balaji/f6708097-7393-4cac-83f4-2c7690e2167c.png'

export const balajiProducts = [
  {
    id: 'balaji-1',
    name: 'Balaji 12" | Swiss White (Imported)',
    sku: 'MT-1501',
    price: 50000,
    material: 'Swiss White (Imported)',
    size: '12 Inches',
    images: [balaji1, balaji2],
    isPreOrder: false,
    description: 'Exquisitely crafted Balaji statue in Swiss White marble, featuring intricate detailing and traditional design. This divine statue embodies divine grace, protection, and spiritual blessings.'
  },
  {
    id: 'balaji-2',
    name: 'Balaji 12" | Premium Marble',
    sku: 'MT-1502',
    price: 48000,
    material: 'Premium Marble',
    size: '12 Inches',
    images: [balaji2, balaji1],
    isPreOrder: true,
    description: 'Beautiful Balaji statue crafted in premium marble with traditional detailing. This statue represents divine protection and spiritual devotion.'
  }
]

