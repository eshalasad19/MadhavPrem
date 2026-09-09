/* ============================================================
   MadhavPrem — catalog.js
   Product data per category. Adding/removing a product now
   means editing one array here — no HTML duplication needed.
   ============================================================ */

const CATALOG = {
  bangles: [
    { name: 'Classic Gold Bangle',    price: 599,  image: 'Images/Bankales(1).webp',  tags: ['daily', 'gold'],    rating: 4.6, badge: '' },
    { name: 'Temple Style Bangle',    price: 699,  image: 'Images/Bankales(2).webp',  tags: ['festive', 'gold'], rating: 4.7, badge: '' },
    { name: 'Wedding Kundan Bangle',  price: 899,  image: 'Images/Bankales(3).webp',  tags: ['wedding', 'kundan'], rating: 4.8, badge: 'Bestseller' },
    { name: 'Meenakari Bangle',       price: 799,  image: 'Images/Bankales(4).webp',  tags: ['festive', 'meenakari'], rating: 4.5, badge: '' },
    { name: 'Stone Work Bangle',      price: 749,  image: 'Images/Bankales(5).webp',  tags: ['party', 'stone'],  rating: 4.4, badge: '' },
    { name: 'Daily Wear Bangle',      price: 549,  image: 'Images/Bankales(6).webp',  tags: ['daily'],           rating: 4.3, badge: '' },
    { name: 'Bridal Luxe Bangle',     price: 1099, image: 'Images/Bankales(7).webp',  tags: ['wedding', 'bridal'], rating: 4.9, badge: 'Bestseller' },
    { name: 'Royal Pearl Bangle',     price: 849,  image: 'Images/Bankales(8).webp',  tags: ['party', 'pearl'],  rating: 4.6, badge: '' },
    { name: 'Antique Filigree Bangle', price: 949, image: 'Images/Bankales(9).webp',  tags: ['festive', 'antique'], rating: 4.5, badge: 'New' },
    { name: 'Ruby Accent Bangle',     price: 1049, image: 'Images/Bankales(10).webp', tags: ['party', 'stone'],  rating: 4.6, badge: 'New' },
    { name: 'Minimal Everyday Bangle', price: 499, image: 'Images/Bankales(11).webp', tags: ['daily'],          rating: 4.2, badge: '' },
    { name: 'Layered Gold Bangle Set', price: 1199, image: 'Images/Bankales(12).webp', tags: ['wedding', 'gold'], rating: 4.8, badge: '' },
  ],

  necklaces: [
    { name: 'Classic Layered Necklace', price: 799,  image: 'images/Neackales(1).webp', tags: ['daily', 'gold'],   rating: 4.5, badge: '' },
    { name: 'Bridal Choker Set',        price: 1899, image: 'images/Neackales(2).webp', tags: ['wedding', 'bridal'], rating: 4.9, badge: 'Bestseller' },
    { name: 'Kundan Neckpiece',         price: 1299, image: 'images/Neackales(3).webp', tags: ['festive', 'kundan'], rating: 4.7, badge: '' },
    { name: 'Royal Pearl Set',          price: 1449, image: 'images/Neackales(4).webp', tags: ['party', 'pearl'], rating: 4.6, badge: '' },
    { name: 'Festive Long Necklace',    price: 1099, image: 'images/Neackales(5).webp', tags: ['festive'],        rating: 4.4, badge: '' },
    { name: 'Pendant Necklace',         price: 699,  image: 'images/Neackales(6).webp', tags: ['daily'],          rating: 4.3, badge: '' },
    { name: 'Temple Style Choker',      price: 1199, image: 'images/Neackales(7).webp', tags: ['festive', 'gold'], rating: 4.6, badge: 'New' },
    { name: 'Statement Bridal Necklace', price: 1999, image: 'images/Neackales(8).webp', tags: ['wedding', 'bridal'], rating: 4.9, badge: 'Bestseller' },
    { name: 'Meenakari Necklace Set',   price: 1349, image: 'images/Neackales(9).webp', tags: ['festive', 'meenakari'], rating: 4.5, badge: '' },
    { name: 'Delicate Gold Chain',      price: 599,  image: 'images/Neackales(10).webp', tags: ['daily', 'gold'], rating: 4.4, badge: 'New' },
  ],

  earrings: (() => {
    const named = [
      ['Classic Gold Jhumka', 200], ['Antique Pearl Jhumka', 200], ['Royal Stone Jhumka', 200],
      ['Meenakari Gold Jhumka', 200], ['Temple Style Jhumka', 200], ['Traditional Bridal Jhumka', 200],
      ['Kundan Gold Jhumka', 250], ['Floral Designer Jhumka', 250], ['Multi-Stone Party Jhumka', 250],
      ['Ethnic Gold Drop Jhumka', 250], ['Heavy Wedding Jhumka', 250], ['Designer Pearl Jhumka', 250],
      ['Classic South Indian Jhumka', 250], ['Elegant Daily Wear Jhumka', 250], ['Grand Festival Jhumka', 250],
      ['Royal Heritage Jhumka', 250], ['Traditional Handcrafted Jhumka', 250], ['Luxury Party Wear Jhumka', 250],
      ['Designer Ethnic Jhumka', 250], ['Royal Kundan Jhumka', 250], ['Golden Blossom Jhumka', 250],
      ['Classic Bridal Drop Jhumka', 250], ['Ethnic Charm Jhumka', 250], ['Vintage Gold Jhumka', 250],
    ];
    const tagFor = (name) => {
      const n = name.toLowerCase();
      if (n.includes('bridal') || n.includes('wedding')) return ['wedding', 'bridal'];
      if (n.includes('festival') || n.includes('festive') || n.includes('ethnic')) return ['festive'];
      if (n.includes('daily')) return ['daily'];
      if (n.includes('party') || n.includes('luxury')) return ['party'];
      return ['festive'];
    };
    const items = named.map((n, i) => ({
      name: n[0], price: n[1], image: `images/${i + 1}.webp`,
      tags: tagFor(n[0]), rating: +(4.2 + (i % 8) * 0.08).toFixed(1), badge: i < 2 ? 'Bestseller' : '',
    }));
    // Remaining catalog photos (25–45) — signature everyday styles at the same price band.
    for (let i = named.length; i < 45; i++) {
      const price = 200 + (i % 4) * 20;
      items.push({
        name: `Signature MadhavPrem Jhumka #${i + 1}`, price,
        image: `images/${i + 1}.webp`, tags: ['daily', 'festive'],
        rating: +(4.2 + (i % 6) * 0.1).toFixed(1), badge: i === 44 ? 'New' : '',
      });
    }
    return items;
  })(),
};