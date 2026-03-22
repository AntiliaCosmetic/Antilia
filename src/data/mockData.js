export const initialProducts = [
  {
    id: 'p1',
    name: 'Oud Silk Mood',
    brand: 'Maison Francis Kurkdjian',
    category: 'Oriental',
    price: 27600,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    description: 'A delicate and silky interpretation of oud wood.'
  },
  {
    id: 'p2',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    category: 'Floral',
    price: 29750,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1615397323136-bd06aa3fb524?auto=format&fit=crop&q=80&w=800',
    description: 'Luminous and sophisticated, lays on the skin like an amber floral and woody breeze.'
  },
  {
    id: 'p3',
    name: 'Aventus',
    brand: 'Creed',
    category: 'Fresh',
    price: 42000,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1588669460012-70bbed0edfe1?auto=format&fit=crop&q=80&w=800',
    description: 'Inspired by the dramatic life of a historic emperor, celebrating strength, power and success.'
  },
  {
    id: 'p4',
    name: 'Lost Cherry',
    brand: 'Tom Ford',
    category: 'Fruity',
    price: 33500,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    description: 'A full-bodied journey into the once-forbidden.'
  },
  {
    id: 'p5',
    name: 'Black Orchid',
    brand: 'Tom Ford',
    category: 'Floral',
    price: 12750,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
    description: 'Iconic. Elusive. Seductive. A luxurious and sensual fragrance of rich, dark accords.'
  },
  {
    id: 'p6',
    name: 'Santal 33',
    brand: 'Le Labo',
    category: 'Woody',
    price: 27200,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: 'A perfume that introduces cardamom, iris, violet, ambient which crackle in the formula.'
  },
  {
    id: 'p7',
    name: 'Gypsy Water',
    brand: 'Byredo',
    category: 'Woody',
    price: 21500,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1594913366159-1832fa7ab4ed?auto=format&fit=crop&q=80&w=800',
    description: 'An ode to the beauty of Romani culture, its unique customs, intimate beliefs and distinguished way of living.'
  },
  {
    id: 'p8',
    name: 'Angels Share',
    brand: 'Kilian',
    category: 'Oriental',
    price: 18500,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1582211594533-25b88c072444?auto=format&fit=crop&q=80&w=800',
    description: 'Contains the essence of Cognac derived from the liquor to lend it a natural caramel color.'
  },
  {
    id: 'p9',
    name: 'Portrait of a Lady',
    brand: 'Frederic Malle',
    category: 'Floral',
    price: 36000,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1523293115678-02bb1470bd49?auto=format&fit=crop&q=80&w=800',
    description: 'A baroque, sumptuous and symphonic perfume.'
  },
  {
    id: 'p10',
    name: 'Nuit de Sable',
    brand: 'BDK Parfums',
    category: 'Oriental',
    price: 15400,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800',
    description: 'Inspired by a walk in the gardens of the Palais Royal.'
  }
];

export const initialUsers = [
  { id: 'u1', name: 'Admin User', email: 'admin@antilia.com', role: 'admin' },
  { id: 'u2', name: 'John Doe', email: 'john@example.com', role: 'customer' }
];

export const initialOrders = [
  {
    id: 'o1',
    userId: 'u2',
    customerName: 'John Doe',
    date: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { productId: 'p1', name: 'Oud Silk Mood', price: 27600, quantity: 1 }
    ],
    total: 27600,
    status: 'Delivered'
  }
];
