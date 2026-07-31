/* ============================================================
   MadhavPrem Chatbot — Pure JS, no external API
   Full product knowledge base + smart keyword matching
   ============================================================ */

// ── KNOWLEDGE BASE ────────────────────────────────────────────
const KB = {
  brand: {
    name: 'MadhavPrem',
    tagline: 'Premium Artificial Jewelry',
    email: 'madhavprem3aug@gmail.com',
    description: 'MadhavPrem is a premium artificial jewelry brand offering elegant, lightweight, and affordable jewelry for weddings, festive events, parties, and daily wear. Every piece is crafted to look luxurious without the premium price tag.',
  },

  categories: [
    { name: 'Earrings', count: 45, priceRange: '₹200 – ₹270', link: 'earings/earrings.html',
      desc: 'A wide collection of Jhumkas, chandbalis, statement drops, and ethnic designs. Perfect for daily wear, festive occasions, weddings, and parties.' },
    { name: 'Bangles / Bracelets', count: 8, priceRange: '₹549 – ₹1099', link: 'Bangles/',
      desc: 'Classic gold, temple-style, kundan, meenakari, stone-work, bridal, and daily-wear bangles. Blends tradition with modern charm.' },
    { name: 'Necklaces', count: 8, priceRange: '₹749 – ₹1299', link: 'Neckales/',
      desc: 'Layered necklaces, choker sets, pendant necklaces, kundan neckpieces, royal pearl sets, and festive long necklaces.' },
    { name: 'Bridal Sets', count: null, priceRange: '₹1899+', link: 'index.html#order',
      desc: 'Complete bridal jewelry sets for your special day. Custom and bulk orders welcome.' },
  ],

  earrings: [
    { name: 'Classic Gold Jhumka',         price: 200 },
    { name: 'Antique Pearl Jhumka',         price: 200 },
    { name: 'Royal Stone Jhumka',           price: 200 },
    { name: 'Meenakari Gold Jhumka',        price: 200 },
    { name: 'Temple Style Jhumka',          price: 200 },
    { name: 'Traditional Bridal Jhumka',    price: 200 },
    { name: 'Kundan Gold Jhumka',           price: 250 },
    { name: 'Floral Designer Jhumka',       price: 250 },
    { name: 'Multi-Stone Party Jhumka',     price: 250 },
    { name: 'Ethnic Gold Drop Jhumka',      price: 250 },
    { name: 'Heavy Wedding Jhumka',         price: 250 },
    { name: 'Designer Pearl Jhumka',        price: 250 },
    { name: 'Classic South Indian Jhumka',  price: 250 },
    { name: 'Elegant Daily Wear Jhumka',    price: 250 },
    { name: 'Grand Festival Jhumka',        price: 250 },
    { name: 'Royal Heritage Jhumka',        price: 250 },
    { name: 'Traditional Handcrafted Jhumka', price: 250 },
    { name: 'Luxury Party Wear Jhumka',     price: 250 },
    { name: 'Designer Ethnic Jhumka',       price: 250 },
    { name: 'Royal Kundan Jhumka',          price: 250 },
    { name: 'Golden Blossom Jhumka',        price: 250 },
    { name: 'Classic Bridal Drop Jhumka',   price: 250 },
    { name: 'Ethnic Charm Jhumka',          price: 250 },
    { name: 'Vintage Gold Jhumka',          price: 250 },
    { name: 'Signature MadhavPrem Jhumka (x20)', price: '200 – 270' },
  ],

  bangles: [
    { name: 'Classic Gold Bangle',    price: 599 },
    { name: 'Temple Style Bangle',    price: 699 },
    { name: 'Wedding Kundan Bangle',  price: 899 },
    { name: 'Meenakari Bangle',       price: 799 },
    { name: 'Stone Work Bangle',      price: 749 },
    { name: 'Daily Wear Bangle',      price: 549 },
    { name: 'Bridal Luxe Bangle',     price: 1099 },
    { name: 'Royal Pearl Bangle',     price: 849 },
  ],

  necklaces: [
    { name: 'Classic Layered Necklace', price: 799 },
    { name: 'Bridal Choker Set',        price: 1099 },
    { name: 'Temple Pendant Necklace',  price: 899 },
    { name: 'Kundan Neckpiece',         price: 1299 },
    { name: 'Minimal Party Necklace',   price: 749 },
    { name: 'Stone Drop Necklace',      price: 849 },
    { name: 'Royal Pearl Set',          price: 949 },
    { name: 'Festive Long Necklace',    price: 899 },
  ],

  offers: {
    discount: '30%',
    condition: 'Order more than 5 pieces',
    detail: 'Order any 6 or more pieces in a single order and get a flat 30% discount on the total. This applies across all categories — earrings, bangles, necklaces, and bridal sets.',
  },

  ordering: {
    how: 'You can place an order directly on our website by filling the "Order Your Favorite Pieces" form on the homepage. Enter your name, email, phone, delivery address, the items you want, and submit. We will confirm your order via phone/WhatsApp.',
    email: 'madhavprem3aug@gmail.com',
    payment: 'Payment details are shared after order confirmation via phone or WhatsApp.',
    delivery: 'Delivery is available across India. Delivery timeline and charges are shared at order confirmation.',
    custom: 'Yes, we accept custom and bulk orders. Mention your requirements in the Notes field while placing the order or contact us directly.',
    image: 'You can upload a reference image in the order form to show us the design or style you want.',
  },

  faqs: [
    { q: 'Is the jewelry real gold or silver?', a: 'All our jewelry is premium quality artificial / fashion jewelry. It looks luxurious and is designed to last, but is not made of real gold or silver. This keeps it affordable while looking stunning.' },
    { q: 'Are the pieces hypoallergenic?', a: 'Most of our pieces are made with skin-friendly alloys. If you have specific metal sensitivities, please mention it in the order notes or contact us before ordering.' },
    { q: 'Can I return or exchange an item?', a: 'We accept exchange requests for damaged or incorrect items. Contact us at madhavprem3aug@gmail.com within 48 hours of receiving your order.' },
    { q: 'How do I care for the jewelry?', a: 'Keep away from water, perfume, and sweat. Store in a dry pouch or box. Wipe gently with a soft cloth after use.' },
    { q: 'Do you do bulk orders for events?', a: 'Absolutely! We specialise in bulk orders for weddings, mehndi, sangeet, and corporate gifting. Orders above 5 pieces get 30% off. Contact us for even larger quantities.' },
  ],
};

// ── RESPONSE ENGINE ───────────────────────────────────────────
function getResponse(raw) {
  const msg = raw.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|namaste|hii+|helo|good morning|good evening|good afternoon|greetings)/.test(msg)) {
    return `Namaste! 🙏 Welcome to <strong>MadhavPrem</strong>!<br><br>I'm your jewelry assistant. I can help you with:<br>
• 💍 Product details & pricing<br>
• 🛍️ How to place an order<br>
• 🎉 Discounts & offers<br>
• 📦 Delivery & custom orders<br><br>What would you like to know? 😊`;
  }

  // About brand
  if (/\b(what is madhavprem|about|who are you|tell me about|brand|company|store)\b/.test(msg)) {
    return `<strong>MadhavPrem</strong> is a premium artificial jewelry brand. 💎<br><br>
${KB.brand.description}<br><br>
📧 Contact: <strong>${KB.brand.email}</strong>`;
  }

  // All categories / what do you sell
  if (/\b(categories|collections|what do you sell|what products|all products|full list|everything|catalogue|catalog)\b/.test(msg)) {
    let r = `We have <strong>4 main collections</strong> at MadhavPrem: 💎<br><br>`;
    KB.categories.forEach(c => {
      r += `<strong>${c.name}</strong><br>📌 ${c.desc}<br>💰 Price range: ${c.priceRange}<br><br>`;
    });
    r += `Ask me about any specific category for full product details!`;
    return r;
  }

  // Earrings
  if (/\b(earring|jhumka|jhumki|chandbali|ear ring|ear-ring|earings|earrings)\b/.test(msg)) {
    if (/price|cost|rate|how much|cheapest|expensive|budget/.test(msg)) {
      return `💍 <strong>Earrings Pricing at MadhavPrem:</strong><br><br>
• <strong>₹200</strong> — Classic Gold Jhumka, Antique Pearl, Royal Stone, Meenakari Gold, Temple Style, Traditional Bridal, and 8+ Signature Jhumkas<br>
• <strong>₹250</strong> — Kundan Gold, Floral Designer, Multi-Stone Party, Ethnic Gold Drop, Heavy Wedding, Designer Pearl, South Indian, Daily Wear, Festival, Heritage, Luxury Party Wear, Bridal Drop, and more<br>
• <strong>₹270</strong> — Special Signature Jhumka (limited)<br><br>
💡 <strong>Most affordable starting at ₹200!</strong><br>
🎉 Order 6+ pieces → get 30% OFF`;
    }
    if (/bridal|wedding/.test(msg)) {
      return `👰 <strong>Bridal Earrings at MadhavPrem:</strong><br><br>
• Traditional Bridal Jhumka — ₹200<br>
• Heavy Wedding Jhumka — ₹250<br>
• Classic Bridal Drop Jhumka — ₹250<br>
• Royal Heritage Jhumka — ₹250<br>
• Luxury Party Wear Jhumka — ₹250<br><br>
All are lightweight, elegant, and perfect for your special day! 💍<br>
📍 <a href="earings/earrings.html" style="color:#1e7a5f;font-weight:600;">Browse Full Earrings Collection →</a>`;
    }
    let r = `✨ <strong>Earrings Collection — ${KB.earrings.length}+ designs:</strong><br><br>`;
    const sample = KB.earrings.slice(0, 12);
    sample.forEach(e => { r += `• ${e.name} — <strong>₹${e.price}</strong><br>`; });
    r += `• ...and <strong>20+ more Signature Jhumkas</strong> (₹200–₹270)<br><br>`;
    r += `💰 Price range: ₹200 – ₹270<br>`;
    r += `🎉 Order 6+ pieces → 30% OFF<br>`;
    r += `📍 <a href="earings/earrings.html" style="color:#1e7a5f;font-weight:600;">View All Earrings →</a>`;
    return r;
  }

  // Bangles
  if (/\b(bangle|bangles|bracelet|bracelets|kangan|kada)\b/.test(msg)) {
    if (/price|cost|rate|how much|cheapest|expensive/.test(msg)) {
      let r = `💰 <strong>Bangles Pricing:</strong><br><br>`;
      KB.bangles.forEach(b => { r += `• ${b.name} — <strong>₹${b.price}</strong><br>`; });
      r += `<br>Range: ₹549 – ₹1099 | 🎉 6+ pieces → 30% OFF`;
      return r;
    }
    let r = `📿 <strong>Bangles Collection (8 designs):</strong><br><br>`;
    KB.bangles.forEach(b => { r += `• ${b.name} — <strong>₹${b.price}</strong><br>`; });
    r += `<br>💡 Perfect for weddings, parties, and daily wear!<br>`;
    r += `📍 <a href="Bangles/" style="color:#1e7a5f;font-weight:600;">View All Bangles →</a>`;
    return r;
  }

  // Necklaces
  if (/\b(necklace|necklaces|neckpiece|haar|choker|pendant|mala|neckales)\b/.test(msg)) {
    if (/price|cost|rate|how much|cheapest|expensive/.test(msg)) {
      let r = `💰 <strong>Necklace Pricing:</strong><br><br>`;
      KB.necklaces.forEach(n => { r += `• ${n.name} — <strong>₹${n.price}</strong><br>`; });
      r += `<br>Range: ₹749 – ₹1299 | 🎉 6+ pieces → 30% OFF`;
      return r;
    }
    let r = `📿 <strong>Necklace Collection (8 designs):</strong><br><br>`;
    KB.necklaces.forEach(n => { r += `• ${n.name} — <strong>₹${n.price}</strong><br>`; });
    r += `<br>💡 From minimal party pieces to full bridal choker sets!<br>`;
    r += `📍 <a href="Neckales/" style="color:#1e7a5f;font-weight:600;">View All Necklaces →</a>`;
    return r;
  }

  // Bridal
  if (/\b(bridal|bride|wedding|shaadi|dulhan|dulha|marriage)\b/.test(msg)) {
    return `👰 <strong>Bridal Jewelry at MadhavPrem:</strong><br><br>
We have beautiful bridal pieces across all categories:<br><br>
<strong>Earrings:</strong><br>
• Traditional Bridal Jhumka — ₹200<br>
• Heavy Wedding Jhumka — ₹250<br>
• Classic Bridal Drop Jhumka — ₹250<br><br>
<strong>Bangles:</strong><br>
• Wedding Kundan Bangle — ₹899<br>
• Bridal Luxe Bangle — ₹1099<br>
• Royal Pearl Bangle — ₹849<br><br>
<strong>Necklaces:</strong><br>
• Bridal Choker Set — ₹1099<br>
• Kundan Neckpiece — ₹1299<br>
• Royal Pearl Set — ₹949<br><br>
<strong>Bridal Set (complete):</strong> ₹1899+<br><br>
🎉 Order 6+ pieces → flat <strong>30% OFF!</strong><br>
📦 Custom bridal sets available on request.<br>
📧 Contact: madhavprem3aug@gmail.com`;
  }

  // Discount / offers
  if (/\b(discount|offer|off|deal|promo|coupon|sale|saving|cheap)\b/.test(msg)) {
    return `🎉 <strong>Special Offer at MadhavPrem:</strong><br><br>
<strong>Order more than 5 pieces → flat 30% OFF</strong> on your entire order!<br><br>
📌 This applies to all categories — earrings, bangles, necklaces, bridal sets.<br>
📌 Mix and match across categories — any 6 pieces total.<br>
📌 Discount is automatically applied when you enter 6+ in the quantity field on the order form.<br><br>
💡 <strong>Example:</strong> 3 bangles + 3 earrings = 6 pieces → 30% off!`;
  }

  // Price / cost (general)
  if (/\b(price|pricing|cost|rate|how much|budget|affordable|expensive|cheapest|costliest)\b/.test(msg)) {
    return `💰 <strong>MadhavPrem Price Summary:</strong><br><br>
<strong>Earrings:</strong> ₹200 – ₹270 (45+ designs)<br>
<strong>Bangles:</strong> ₹549 – ₹1099 (8 designs)<br>
<strong>Necklaces:</strong> ₹749 – ₹1299 (8 designs)<br>
<strong>Bridal Sets:</strong> ₹1899+<br><br>
🎉 <strong>Best value:</strong> Order 6+ pieces → get 30% OFF!<br><br>
Ask me about a specific category or item for exact pricing.`;
  }

  // How to order
  if (/\b(order|how to order|place order|buy|purchase|booking|book)\b/.test(msg)) {
    return `🛍️ <strong>How to Place an Order:</strong><br><br>
<strong>Step 1 —</strong> Browse our collections (Earrings, Bangles, Necklaces)<br>
<strong>Step 2 —</strong> Click <em>"Add to Cart"</em> on items you like<br>
<strong>Step 3 —</strong> Click the Cart button → <em>"Send Cart to Order"</em> to auto-fill the form<br>
<strong>Step 4 —</strong> Fill in your Name, Email, Phone, Delivery Address<br>
<strong>Step 5 —</strong> Click <em>"Send Order Request"</em><br><br>
📧 Your order goes directly to: <strong>madhavprem3aug@gmail.com</strong><br>
📲 We confirm via <strong>phone / WhatsApp</strong><br><br>
💡 You can also upload a <strong>reference image</strong> if you have a specific design in mind!`;
  }

  // Delivery / shipping
  if (/\b(delivery|shipping|ship|dispatch|courier|time|days|how long|when will|arrive)\b/.test(msg)) {
    return `📦 <strong>Delivery Information:</strong><br><br>
• We deliver <strong>across India</strong> 🇮🇳<br>
• Delivery timeline and charges are confirmed at the time of order via phone/WhatsApp<br>
• Orders are dispatched after payment confirmation<br>
• You can track your order through the courier details shared after dispatch<br><br>
For urgent orders or specific delivery dates, mention it in the <em>Notes</em> field while ordering.`;
  }

  // Payment
  if (/\b(payment|pay|upi|gpay|paytm|phonepe|bank|transfer|cash|cod|online payment)\b/.test(msg)) {
    return `💳 <strong>Payment at MadhavPrem:</strong><br><br>
Payment details are shared after your order is confirmed via phone/WhatsApp.<br><br>
We accept:<br>
• UPI (GPay, PhonePe, Paytm)<br>
• Bank Transfer (NEFT/IMPS)<br>
• Other modes as mutually agreed<br><br>
📲 Contact us at <strong>madhavprem3aug@gmail.com</strong> for any payment queries.`;
  }

  // Custom / bulk order
  if (/\b(custom|bulk|wholesale|large order|gifting|event|corporate|mehndi|sangeet|quantity)\b/.test(msg)) {
    return `🎁 <strong>Custom & Bulk Orders:</strong><br><br>
Yes! We absolutely take custom and bulk orders! 🙌<br><br>
• Weddings, mehndi, sangeet, haldi functions<br>
• Corporate gifting<br>
• Festival & event gifting<br>
• Custom designs based on your reference image<br><br>
🎉 <strong>Bulk discount:</strong> Order 6+ pieces → 30% OFF automatically<br>
💬 For larger quantities, contact us directly:<br>
📧 <strong>madhavprem3aug@gmail.com</strong><br><br>
Mention your requirements in the <em>Notes</em> section of the order form.`;
  }

  // Contact
  if (/\b(contact|email|phone|whatsapp|reach|call|message|support|help)\b/.test(msg)) {
    return `📞 <strong>Contact MadhavPrem:</strong><br><br>
📧 Email: <strong>madhavprem3aug@gmail.com</strong><br><br>
You can also:<br>
• Place an order via the website form and we'll reach out on WhatsApp<br>
• Upload a reference image or describe your requirement in the order notes<br><br>
We respond quickly! 🙏`;
  }

  // Material / quality
  if (/\b(material|quality|real|gold|silver|metal|alloy|hypoallergenic|skin|safe|fake|artificial|imitation)\b/.test(msg)) {
    return KB.faqs[0].a + '<br><br>' + KB.faqs[1].a;
  }

  // Return / exchange
  if (/\b(return|exchange|refund|replace|damage|wrong item|broken)\b/.test(msg)) {
    return `🔄 <strong>Return & Exchange Policy:</strong><br><br>
${KB.faqs[2].a}<br><br>
📧 Contact us within <strong>48 hours</strong> of receiving your order at:<br><strong>madhavprem3aug@gmail.com</strong>`;
  }

  // Care
  if (/\b(care|maintain|clean|store|wash|water|wear|last|durable|tarnish)\b/.test(msg)) {
    return `✨ <strong>Jewelry Care Tips:</strong><br><br>
${KB.faqs[3].a}`;
  }

  // Thank you
  if (/\b(thank|thanks|thank you|thnks|thx|great|awesome|perfect|nice)\b/.test(msg)) {
    return `You're most welcome! 😊 Happy shopping at <strong>MadhavPrem</strong>! 💎<br><br>Feel free to ask anything else or <a href="index.html#order" style="color:#1e7a5f;font-weight:600;">place your order here →</a>`;
  }

  // Goodbye
  if (/\b(bye|goodbye|see you|later|cya|take care)\b/.test(msg)) {
    return `Goodbye! 👋 Thank you for visiting <strong>MadhavPrem</strong>. Come back anytime! 💍`;
  }

  // Fallback
  return `I'm not sure about that, but I can help you with:<br><br>
💍 <strong>Products</strong> — Ask about earrings, bangles, necklaces, or bridal sets<br>
💰 <strong>Pricing</strong> — "How much are the bangles?"<br>
🎉 <strong>Offers</strong> — "Any discounts available?"<br>
🛍️ <strong>Ordering</strong> — "How do I place an order?"<br>
📦 <strong>Delivery</strong> — "How long does delivery take?"<br>
📞 <strong>Contact</strong> — "How to reach MadhavPrem?"<br><br>
Try asking any of the above! 😊`;
}

// ── BUILD UI ──────────────────────────────────────────────────
(function initChatbot() {
  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #mp-chat-fab {
      position: fixed; bottom: 1.6rem; right: 1.6rem; z-index: 9000;
      width: 58px; height: 58px; border-radius: 50%;
      background: linear-gradient(135deg, #0d4a3a, #1e7a5f);
      border: none; cursor: pointer; box-shadow: 0 6px 24px rgba(13,74,58,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      font-size: 1.5rem;
    }
    #mp-chat-fab:hover { transform: scale(1.1); box-shadow: 0 8px 30px rgba(13,74,58,0.55); }
    #mp-chat-fab .mp-fab-badge {
      position: absolute; top: -4px; right: -4px;
      background: #c9a84c; color: #fff; border-radius: 50%;
      width: 18px; height: 18px; font-size: 0.65rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    #mp-chat-window {
      position: fixed; bottom: 5rem; right: 1.6rem; z-index: 9001;
      width: min(92vw, 380px); height: 520px;
      background: #faf6ef; border-radius: 20px;
      box-shadow: 0 20px 60px rgba(13,74,58,0.22);
      display: flex; flex-direction: column; overflow: hidden;
      border: 1.5px solid rgba(201,168,76,0.22);
      transform: scale(0.9) translateY(20px); opacity: 0;
      transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
      pointer-events: none;
      font-family: 'Jost', 'Poppins', sans-serif;
    }
    #mp-chat-window.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
    #mp-chat-head {
      background: linear-gradient(135deg, #0d4a3a, #1e7a5f);
      padding: 1rem 1.2rem; display: flex; align-items: center; gap: 0.8rem;
      flex-shrink: 0;
    }
    #mp-chat-head .mp-avatar {
      width: 38px; height: 38px; border-radius: 50%; background: rgba(201,168,76,0.25);
      display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
      border: 1.5px solid rgba(201,168,76,0.4); flex-shrink: 0;
    }
    #mp-chat-head .mp-head-info { flex: 1; }
    #mp-chat-head .mp-head-info strong { display: block; color: #e2c97e; font-size: 0.95rem; }
    #mp-chat-head .mp-head-info span { color: rgba(250,246,239,0.65); font-size: 0.75rem; }
    #mp-chat-close {
      background: none; border: none; color: rgba(250,246,239,0.7);
      font-size: 1.3rem; cursor: pointer; padding: 0.2rem; line-height: 1;
      transition: color 0.2s;
    }
    #mp-chat-close:hover { color: #e2c97e; }
    #mp-chat-messages {
      flex: 1; overflow-y: auto; padding: 1rem; display: flex;
      flex-direction: column; gap: 0.75rem;
      scrollbar-width: thin; scrollbar-color: #c9a84c33 transparent;
    }
    .mp-msg { display: flex; flex-direction: column; max-width: 88%; }
    .mp-msg.bot { align-self: flex-start; }
    .mp-msg.user { align-self: flex-end; }
    .mp-bubble {
      padding: 0.7rem 0.95rem; border-radius: 14px; font-size: 0.875rem;
      line-height: 1.55; word-break: break-word;
    }
    .mp-msg.bot .mp-bubble {
      background: #fff; color: #1a2e27;
      border: 1px solid rgba(13,74,58,0.1);
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(13,74,58,0.07);
    }
    .mp-msg.user .mp-bubble {
      background: linear-gradient(135deg, #0d4a3a, #1e7a5f);
      color: #e2c97e; border-bottom-right-radius: 4px;
    }
    .mp-time { font-size: 0.68rem; color: #a0b8b0; margin-top: 0.2rem; }
    .mp-msg.user .mp-time { text-align: right; }
    .mp-chips {
      padding: 0.6rem 1rem 0; display: flex; flex-wrap: wrap; gap: 0.45rem; flex-shrink: 0;
    }
    .mp-chip {
      background: rgba(13,74,58,0.08); border: 1px solid rgba(13,74,58,0.2);
      color: #0d4a3a; border-radius: 999px; padding: 0.3rem 0.75rem;
      font-size: 0.75rem; cursor: pointer; font-weight: 600; font-family: inherit;
      transition: background 0.2s, color 0.2s;
    }
    .mp-chip:hover { background: #0d4a3a; color: #e2c97e; }
    #mp-chat-input-row {
      padding: 0.7rem; display: flex; gap: 0.5rem; flex-shrink: 0;
      border-top: 1px solid rgba(13,74,58,0.1); background: #fff;
    }
    #mp-chat-input {
      flex: 1; border: 1.5px solid rgba(13,74,58,0.18); border-radius: 10px;
      padding: 0.6rem 0.85rem; font-size: 0.88rem; font-family: inherit;
      background: #faf6ef; color: #1a2e27; outline: none;
      transition: border-color 0.2s;
    }
    #mp-chat-input:focus { border-color: #1e7a5f; }
    #mp-chat-send {
      background: linear-gradient(135deg, #0d4a3a, #1e7a5f);
      border: none; border-radius: 10px; width: 40px; height: 40px;
      color: #e2c97e; font-size: 1.1rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: opacity 0.2s;
    }
    #mp-chat-send:hover { opacity: 0.85; }
    .mp-typing { display: flex; gap: 4px; align-items: center; padding: 0.2rem 0; }
    .mp-typing span {
      width: 7px; height: 7px; border-radius: 50%;
      background: #c9a84c; animation: mp-bounce 1.2s infinite;
    }
    .mp-typing span:nth-child(2) { animation-delay: 0.2s; }
    .mp-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes mp-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
    @media (max-width: 480px) {
      #mp-chat-window { bottom: 4.5rem; right: 0.8rem; width: calc(100vw - 1.6rem); height: 480px; }
      #mp-chat-fab { bottom: 1rem; right: 1rem; }
    }
  `;
  document.head.appendChild(style);

  // Build HTML
  const fab = document.createElement('button');
  fab.id = 'mp-chat-fab';
  fab.setAttribute('aria-label', 'Open chat assistant');
  fab.innerHTML = `💬<span class="mp-fab-badge">?</span>`;

  const win = document.createElement('div');
  win.id = 'mp-chat-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'MadhavPrem Chat Assistant');
  win.innerHTML = `
    <div id="mp-chat-head">
      <div class="mp-avatar">🪄</div>
      <div class="mp-head-info">
        <strong>MadhavPrem Assistant</strong>
        <span>🟢 Online — Ask me anything!</span>
      </div>
      <button id="mp-chat-close" aria-label="Close chat">✕</button>
    </div>
    <div id="mp-chat-messages" aria-live="polite"></div>
    <div class="mp-chips" id="mp-chips"></div>
    <div id="mp-chat-input-row">
      <input id="mp-chat-input" type="text" placeholder="Ask about products, prices, orders…" autocomplete="off" />
      <button id="mp-chat-send" aria-label="Send message">➤</button>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(win);

  // ── Logic ────────────────────────────────────────────────────
  const msgs    = document.getElementById('mp-chat-messages');
  const input   = document.getElementById('mp-chat-input');
  const sendBtn = document.getElementById('mp-chat-send');
  const closeBtn= document.getElementById('mp-chat-close');
  const chips   = document.getElementById('mp-chips');

  const QUICK = [
    'What do you sell?', 'Earrings prices', 'Bangles collection',
    'Necklace collection', 'Any discounts?', 'How to order?',
    'Bridal jewelry', 'Delivery info', 'Contact details',
  ];

  function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function addMsg(text, who, animate) {
    const wrap = document.createElement('div');
    wrap.className = `mp-msg ${who}`;
    const bubble = document.createElement('div');
    bubble.className = 'mp-bubble';
    bubble.innerHTML = text;
    const time = document.createElement('div');
    time.className = 'mp-time';
    time.textContent = now();
    wrap.appendChild(bubble);
    wrap.appendChild(time);
    if (animate) { wrap.style.opacity = '0'; wrap.style.transform = 'translateY(8px)'; }
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    if (animate) {
      requestAnimationFrame(() => {
        wrap.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        wrap.style.opacity = '1'; wrap.style.transform = 'translateY(0)';
      });
    }
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'mp-msg bot'; wrap.id = 'mp-typing-indicator';
    wrap.innerHTML = `<div class="mp-bubble"><div class="mp-typing"><span></span><span></span><span></span></div></div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('mp-typing-indicator');
    if (t) t.remove();
  }

  function sendMessage(text) {
    const q = text || input.value.trim();
    if (!q) return;
    input.value = '';
    addMsg(q, 'user', true);
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg(getResponse(q), 'bot', true);
    }, 600 + Math.random() * 400);
  }

  function buildChips() {
    chips.innerHTML = '';
    QUICK.forEach(q => {
      const chip = document.createElement('button');
      chip.className = 'mp-chip';
      chip.textContent = q;
      chip.addEventListener('click', () => {
        sendMessage(q);
        chips.innerHTML = '';
      });
      chips.appendChild(chip);
    });
  }

  // Open / close
  fab.addEventListener('click', () => {
    const isOpen = win.classList.toggle('open');
    fab.querySelector('.mp-fab-badge').style.display = isOpen ? 'none' : 'flex';
    if (isOpen && !msgs.children.length) {
      setTimeout(() => {
        addMsg(`Namaste! 🙏 Welcome to <strong>MadhavPrem</strong>!<br><br>I'm your jewelry assistant. Ask me about products, pricing, discounts, orders, delivery — anything! 💎`, 'bot', true);
        buildChips();
      }, 200);
    }
    if (isOpen) input.focus();
  });

  closeBtn.addEventListener('click', () => {
    win.classList.remove('open');
    fab.querySelector('.mp-fab-badge').style.display = 'flex';
  });

  sendBtn.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

  // Show badge pulse after 3s to draw attention
  setTimeout(() => {
    fab.style.animation = 'none';
    fab.style.boxShadow = '0 6px 24px rgba(13,74,58,0.45), 0 0 0 0 rgba(201,168,76,0.6)';
    const pulse = document.createElement('style');
    pulse.textContent = `
      @keyframes mp-pulse { 0%{box-shadow:0 6px 24px rgba(13,74,58,.45),0 0 0 0 rgba(201,168,76,.5)} 70%{box-shadow:0 6px 24px rgba(13,74,58,.45),0 0 0 14px rgba(201,168,76,0)} 100%{box-shadow:0 6px 24px rgba(13,74,58,.45),0 0 0 0 rgba(201,168,76,0)} }
      #mp-chat-fab { animation: mp-pulse 2s 3; }
    `;
    document.head.appendChild(pulse);
  }, 3000);

})();
