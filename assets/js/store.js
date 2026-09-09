/* ============================================================
   MadhavPrem — store.js
   Single source of truth for cart + wishlist state.
   Replaces the old per-folder cart.js duplicates.
   ============================================================ */

const CART_KEY = 'madhavprem-cart';           // kept identical to the original key
const WISHLIST_KEY = 'madhavprem-wishlist';

const Store = {
  cart: JSON.parse(localStorage.getItem(CART_KEY) || '[]'),
  wishlist: JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'),
  listeners: [],

  onChange(fn) { this.listeners.push(fn); },
  emit() { this.listeners.forEach(fn => fn()); },

  save() {
    localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(this.wishlist));
    this.emit();
  },

  addToCart(item) {
    const existing = this.cart.find(i => i.name === item.name);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      this.cart.push({ ...item, qty: 1 });
    }
    this.save();
    toast(`${item.name} added to cart`);
  },

  updateQty(name, delta) {
    const line = this.cart.find(i => i.name === name);
    if (!line) return;
    line.qty = (line.qty || 1) + delta;
    if (line.qty <= 0) this.cart = this.cart.filter(i => i.name !== name);
    this.save();
  },

  removeFromCart(name) {
    this.cart = this.cart.filter(i => i.name !== name);
    this.save();
  },

  cartTotal() {
    return this.cart.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.qty || 1), 0);
  },

  cartCount() {
    return this.cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  },

  isWishlisted(name) {
    return this.wishlist.some(i => i.name === name);
  },

  toggleWishlist(item) {
    if (this.isWishlisted(item.name)) {
      this.wishlist = this.wishlist.filter(i => i.name !== item.name);
      toast(`${item.name} removed from wishlist`);
    } else {
      this.wishlist.push(item);
      toast(`${item.name} added to wishlist`);
    }
    this.save();
  },

  moveWishlistItemToCart(name) {
    const item = this.wishlist.find(i => i.name === name);
    if (!item) return;
    this.addToCart(item);
    this.wishlist = this.wishlist.filter(i => i.name !== name);
    this.save();
  },
};

/* -------- Toast -------- */
function toast(message) {
  let stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, 2200);
}