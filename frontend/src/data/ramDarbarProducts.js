// Import all Ram Darbar images
import ramDarbar1 from '../assets/ourcreation/murti/ram darbar/839e5190-5d4d-4f63-8f05-b42880126a77.png'
import ramDarbar2 from '../assets/ourcreation/murti/ram darbar/eaed5661-217c-4cde-ab1f-5b22cdf42bac.png'
import ramDarbar3 from '../assets/ourcreation/murti/ram darbar/2965d005-a876-48f8-b008-975e4781ac75.png'

export const ramDarbarProducts = [
  {
    id: 'ram-darbar-1',
    name: 'Ram Darbar 12" | Swiss White (Imported)',
    sku: 'MT-1001',
    price: 55000,
    material: 'Swiss White (Imported)',
    size: '12 Inches',
    images: [ramDarbar1, ramDarbar2, ramDarbar3],
    isPreOrder: false,
    description: 'Exquisitely crafted Ram Darbar statue in Swiss White marble, featuring Lord Ram, Sita, Lakshman, and Hanuman. This divine statue embodies righteousness, devotion, and divine grace.'
  },
  {
    id: 'ram-darbar-2',
    name: 'Ram Darbar 12" | Premium Marble',
    sku: 'MT-1002',
    price: 52000,
    material: 'Premium Marble',
    size: '12 Inches',
    images: [ramDarbar2, ramDarbar3, ramDarbar1],
    isPreOrder: true,
    description: 'Beautiful Ram Darbar statue crafted in premium marble with intricate detailing. This statue represents the divine family and spiritual harmony.'
  },
  {
    id: 'ram-darbar-3',
    name: 'Ram Darbar 12" | Cultured Marble',
    sku: 'MT-1003',
    price: 28000,
    material: 'Cultured Marble',
    size: '12 Inches',
    images: [ramDarbar3, ramDarbar1, ramDarbar2],
    isPreOrder: false,
    description: 'Elegant Ram Darbar statue in cultured marble, perfect for home worship and spiritual spaces.'
  }
]

