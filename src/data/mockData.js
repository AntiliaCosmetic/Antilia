export const initialProducts = [
  {
    id: 'p1',
    name: 'Midnight Recovery Serum',
    brand: 'Antilia',
    category: 'Serums',
    price: 8500,
    stock: 12,
    image: '/Antilia/assets/products/p1.jpg',
    description: 'A potent nightly serum enriched with botanical oils and retinol to rejuvenate your skin while you sleep.',
    isBestseller: true,
    skinType: ['All Skin Types'],
    ingredients: ['Retinol', 'Squalane', 'Evening Primrose'],
    concern: ['Anti-Aging'],
    usage: 'Apply 2-3 drops before moisturizer at night.'
  },
  {
    id: 'p2',
    name: 'Silk Glow Moisturizer',
    brand: 'Antilia',
    category: 'Creams',
    price: 6200,
    stock: 25,
    image: '/Antilia/assets/products/p2.jpg',
    description: 'A lightweight yet deeply hydrating cream that leaves a velvet-smooth finish and a natural radiance.',
    isBestseller: true,
    skinType: ['Dry to Normal'],
    ingredients: ['Hyaluronic Acid', 'Shea Butter', 'Vitamin E'],
    concern: ['Hydration'],
    usage: 'Morning and evening after serum.'
  },
  {
    id: 'p3',
    name: 'Rose Gold Face Oil',
    brand: 'Antilia',
    category: 'Oils',
    price: 7800,
    stock: 8,
    image: '/Antilia/assets/products/p3.jpg',
    description: 'Infused with real 24k gold flakes and cold-pressed rosehip oil for the ultimate luxury glow.',
    isBestseller: true,
    skinType: ['Normal to Oily'],
    ingredients: ['Rosehip Oil', '24k Gold', 'Vitamin C'],
    concern: ['Radiance'],
    usage: 'Massage into skin as the final step of your routine.'
  },
  {
    id: 'p4',
    name: 'Cloud Cleansing Balm',
    brand: 'Antilia',
    category: 'Cleansers',
    price: 4500,
    stock: 15,
    image: '/Antilia/assets/products/p4.jpg',
    description: 'Transforms from a silky balm to a light oil, melting away makeup and impurities without stripping moisture.',
    isBestseller: false,
    skinType: ['Sensitive'],
    ingredients: ['Camellia Oil', 'Oat Extract', 'Coconut Oil'],
    concern: ['Gentle Cleansing'],
    usage: 'Massage on dry skin, then rinse with warm water.'
  },
  {
    id: 'p5',
    name: 'Advanced Repair Eye Cream',
    brand: 'Antilia',
    category: 'Creams',
    price: 5400,
    stock: 20,
    image: '/Antilia/assets/products/p5.jpg',
    description: 'Targets fine lines and dark circles with a concentrated blend of peptides and caffeine.',
    isBestseller: true,
    skinType: ['All Skin Types'],
    ingredients: ['Peptides', 'Caffeine', 'Niacinamide'],
    concern: ['Dark Circles'],
    usage: 'Gently pat around the eye area.'
  },
  {
    id: 'p6',
    name: 'Pure Vit-C Brightening Serum',
    brand: 'Antilia',
    category: 'Serums',
    price: 7200,
    stock: 10,
    image: '/Antilia/assets/products/p6.jpg',
    description: 'An antioxidant powerhouse that brightens skin tone and prevents environmental damage.',
    isBestseller: false,
    skinType: ['Normal'],
    ingredients: ['Vitamin C', 'Ferulic Acid', 'Vitamin E'],
    concern: ['Brightening'],
    usage: 'Apply in the morning before SPF.'
  },
  {
    id: 'p7',
    name: 'Hydra-Plumping Mask',
    brand: 'Antilia',
    category: 'Masks',
    price: 3800,
    stock: 14,
    image: '/Antilia/assets/products/p7.jpg',
    description: 'An overnight treatment that delivers an intense burst of hydration for plump, rested skin by morning.',
    isBestseller: false,
    skinType: ['Dry'],
    ingredients: ['Hyaluronic Acid', 'Aloe Vera', 'Honey'],
    concern: ['Dehydration'],
    usage: 'Leave on overnight, use 2-3 times a week.'
  },
  {
    id: 'p8',
    name: 'Exfoliating Glow Toner',
    brand: 'Antilia',
    category: 'Toners',
    price: 3200,
    stock: 18,
    image: '/Antilia/assets/products/p8.jpg',
    description: 'A liquid exfoliant with AHAs and BHAs that smooths texture and clears pores.',
    isBestseller: true,
    skinType: ['Normal to Combination'],
    ingredients: ['Glycolic Acid', 'Salicylic Acid', 'Witch Hazel'],
    concern: ['Texture'],
    usage: 'Apply with a cotton pad after cleansing.'
  }
];

export const initialTestimonials = [
  {
    id: 't1',
    name: 'Eleanor V.',
    role: 'Verified Buyer',
    text: 'Antilia has entirely transformed my skincare routine. The Silk Glow Moisturizer leaves my skin feeling like actual silk. The results are visible after just a week!',
    rating: 5
  },
  {
    id: 't2',
    name: 'James L.',
    role: 'Verified Buyer',
    text: 'As someone with sensitive skin, finding effective products is hard. The Cloud Cleansing Balm is a game-changer. So gentle yet so effective.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Sofia R.',
    role: 'Verified Buyer',
    text: 'The Rose Gold Face Oil is pure luxury. It gives me a glow that lasts all day without being greasy. Absolutely worth the investment.',
    rating: 5
  }
];

export const initialUsers = [
  { id: 'u1', name: 'Admin Team', email: 'admin@antilia.com', role: 'admin' },
  { id: 'u2', name: 'Sarah Miller', email: 'sarah@example.com', role: 'customer' }
];

export const initialOrders = [
  {
    id: 'o1',
    userId: 'u2',
    customerName: 'Sarah Miller',
    date: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { productId: 'p1', name: 'Midnight Recovery Serum', price: 8500, quantity: 1 }
    ],
    total: 8500,
    status: 'Delivered'
  },
  {
    id: 'o2',
    userId: 'u2',
    customerName: 'Sarah Miller',
    date: new Date(Date.now() - 172800000).toISOString(),
    items: [
      { productId: 'p2', name: 'Silk Glow Moisturizer', price: 6200, quantity: 1 }
    ],
    total: 6200,
    status: 'Shipped'
  }
];
