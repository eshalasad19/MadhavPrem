/* ============================================================
   MadhavPrem — ui.js
   Navbar, cart/wishlist drawers, product grid + toolbar,
   quick-view modal. Works off Store + CATALOG.
   ============================================================ */

/* -------- Navbar -------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 12);
  });

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobileMenu?.classList.toggle('open');
  });

  document.querySelectorAll('[data-nav-search]').forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        sessionStorage.setItem('mp-search-query', input.value.trim());
        const onProductsPage = document.querySelector('.product-grid[data-catalog]');
        if (onProductsPage) {
          location.hash = '#products';
          location.reload();
        } else {
          location.href = 'earrings/index.html';
        }
      }
    });
  });
}

/* -------- Badges (cart + wishlist counts) -------- */
function refreshBadges() {
  document.querySelectorAll('#cartCount, [data-cart-count]').forEach(el => el.textContent = Store.cartCount());
  document.querySelectorAll('[data-wishlist-count]').forEach(el => el.textContent = Store.wishlist.length);
}

/* -------- Drawers -------- */
function initDrawers() {
  const overlay = document.querySelector('.drawer-overlay');
  const cartDrawer = document.getElementById('cartPanel');
  const wishDrawer = document.getElementById('wishlistPanel');

  function closeAll() {
    cartDrawer?.classList.remove('open');
    wishDrawer?.classList.remove('open');
    overlay?.classList.remove('open');
  }
  function openDrawer(el) {
    closeAll();
    el?.classList.add('open');
    overlay?.classList.add('open');
  }

  document.getElementById('cartToggle')?.addEventListener('click', () => openDrawer(cartDrawer));
  document.getElementById('wishlistToggle')?.addEventListener('click', () => openDrawer(wishDrawer));
  document.getElementById('mobileCartToggle')?.addEventListener('click', () => openDrawer(cartDrawer));
  document.getElementById('mobileWishlistToggle')?.addEventListener('click', () => openDrawer(wishDrawer));
  document.getElementById('closeCart')?.addEventListener('click', closeAll);
  document.getElementById('closeWishlist')?.addEventListener('click', closeAll);
  overlay?.addEventListener('click', closeAll);

  renderCart();
  renderWishlist();
  Store.onChange(() => { renderCart(); renderWishlist(); refreshBadges(); });
}

function renderCart() {
  const box = document.getElementById('cartItems');
  const totalBox = document.getElementById('cartTotal');
  if (!box) return;
  if (!Store.cart.length) {
    box.innerHTML = '<div class="drawer-empty">Your cart is empty.<br>Explore the collection to add pieces you love.</div>';
    if (totalBox) totalBox.textContent = '';
    return;
  }
  box.innerHTML = Store.cart.map(item => `
    <div class="line-item">
      ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
      <div class="li-info">
        <h5>${item.name}</h5>
        <div class="li-price">₹${item.price}</div>
        <div class="li-actions">
          <div class="qty-stepper">
            <button type="button" data-qty-down="${item.name}">−</button>
            <span>${item.qty || 1}</span>
            <button type="button" data-qty-up="${item.name}">+</button>
          </div>
          <button type="button" class="li-remove" data-remove="${item.name}">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  box.querySelectorAll('[data-qty-up]').forEach(b => b.addEventListener('click', () => Store.updateQty(b.dataset.qtyUp, 1)));
  box.querySelectorAll('[data-qty-down]').forEach(b => b.addEventListener('click', () => Store.updateQty(b.dataset.qtyDown, -1)));
  box.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => Store.removeFromCart(b.dataset.remove)));

  if (totalBox) totalBox.innerHTML = `<span>Subtotal</span><span>₹${Store.cartTotal()}</span>`;
}

function renderWishlist() {
  const box = document.getElementById('wishlistItems');
  if (!box) return;
  if (!Store.wishlist.length) {
    box.innerHTML = '<div class="drawer-empty">No saved pieces yet.<br>Tap the ♡ on any product to save it here.</div>';
    return;
  }
  box.innerHTML = Store.wishlist.map(item => `
    <div class="line-item">
      ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ''}
      <div class="li-info">
        <h5>${item.name}</h5>
        <div class="li-price">₹${item.price}</div>
        <div class="li-actions">
          <button type="button" class="add-btn" data-move="${item.name}">Move to cart</button>
          <button type="button" class="li-remove" data-unwish="${item.name}">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  box.querySelectorAll('[data-move]').forEach(b => b.addEventListener('click', () => Store.moveWishlistItemToCart(b.dataset.move)));
  box.querySelectorAll('[data-unwish]').forEach(b => b.addEventListener('click', () => Store.toggleWishlist({ name: b.dataset.unwish })));
}

/* -------- Product grid + toolbar (search / filter / sort) -------- */
function stars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function cardHTML(item) {
  const wished = Store.isWishlisted(item.name);
  return `
    <article class="product-card" data-name="${item.name}">
      <div class="product-media" data-quickview="${item.name}">
        ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
        <button type="button" class="wishlist-btn ${wished ? 'active' : ''}" data-wish="${item.name}" aria-label="Save to wishlist">${wished ? '♥' : '♡'}</button>
        <img src="${item.image}" alt="${item.name}" loading="lazy" decoding="async">
        <button type="button" class="quickview-btn" data-quickview="${item.name}">Quick View</button>
      </div>
      <div class="product-info">
        <h4>${item.name}</h4>
        <div class="product-rating">${stars(item.rating || 4.5)} <span>(${item.rating || 4.5})</span></div>
        <div class="product-price-row">
          <span class="price">₹${item.price}</span>
          <button type="button" class="add-btn" data-add="${item.name}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(gridEl, items) {
  gridEl.innerHTML = items.length
    ? items.map(cardHTML).join('')
    : '<div class="no-results">No pieces match your search — try a different keyword or filter.</div>';

  gridEl.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items.find(i => i.name === btn.dataset.add);
      if (item) Store.addToCart(item);
    });
  });
  gridEl.querySelectorAll('[data-wish]').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = items.find(i => i.name === btn.dataset.wish);
      if (item) { Store.toggleWishlist(item); renderProductGrid(gridEl, items); }
    });
  });
  gridEl.querySelectorAll('[data-quickview]').forEach(el => {
    el.addEventListener('click', () => {
      const item = items.find(i => i.name === el.dataset.quickview);
      if (item) openQuickView(item);
    });
  });
}

function initProductPage(categoryKey) {
  const gridEl = document.querySelector('.product-grid[data-catalog]');
  if (!gridEl) return;
  const all = CATALOG[categoryKey] || [];
  const searchInput = document.getElementById('toolbarSearch');
  const sortSelect = document.getElementById('toolbarSort');
  const chips = document.querySelectorAll('.chip[data-tag]');
  const resultCount = document.getElementById('resultCount');

  let activeTag = 'all';
  const savedQuery = sessionStorage.getItem('mp-search-query') || '';
  if (searchInput && savedQuery) searchInput.value = savedQuery;
  sessionStorage.removeItem('mp-search-query');

  function apply() {
    const q = (searchInput?.value || '').trim().toLowerCase();
    let list = all.filter(i => i.name.toLowerCase().includes(q));
    if (activeTag !== 'all') list = list.filter(i => i.tags.includes(activeTag));

    const sortBy = sortSelect?.value;
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));

    renderProductGrid(gridEl, list);
    if (resultCount) resultCount.textContent = `${list.length} piece${list.length === 1 ? '' : 's'}`;
  }

  searchInput?.addEventListener('input', apply);
  sortSelect?.addEventListener('change', apply);
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeTag = chip.dataset.tag;
    apply();
  }));

  apply();
}

/* -------- Quick view modal -------- */
function openQuickView(item) {
  let modal = document.querySelector('.modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  const wished = Store.isWishlisted(item.name);
  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-media">
        <button type="button" class="modal-close" data-close>✕</button>
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="modal-body">
        <h3>${item.name}</h3>
        <div class="product-rating">${stars(item.rating || 4.5)} <span>(${item.rating || 4.5} rating)</span></div>
        <div class="price">₹${item.price}</div>
        <p class="desc">Handcrafted artificial jewelry piece finished to a premium standard — lightweight, tarnish-resistant, and made for weddings, festive events, and everyday elegance.</p>
        <div class="modal-actions">
          <button type="button" class="btn btn-primary" data-modal-add>Add to Cart</button>
          <button type="button" class="btn btn-ghost" data-modal-wish>${wished ? '♥ Saved' : '♡ Save to Wishlist'}</button>
        </div>
      </div>
    </div>
  `;
  requestAnimationFrame(() => modal.classList.add('open'));

  function close() { modal.classList.remove('open'); }
  modal.querySelector('[data-close]').addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  modal.querySelector('[data-modal-add]').addEventListener('click', () => { Store.addToCart(item); close(); });
  modal.querySelector('[data-modal-wish]').addEventListener('click', () => { Store.toggleWishlist(item); close(); });
}

/* -------- Scroll reveal -------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach(e => io.observe(e));
}

/* -------- Boot -------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDrawers();
  refreshBadges();
  initReveal();
  const cat = document.body.dataset.category;
  if (cat) initProductPage(cat);

  // Home page "Add to Cart" buttons on the featured-collections cards
  document.querySelectorAll('.card-actions [data-name]').forEach(btn => {
    btn.addEventListener('click', () => {
      Store.addToCart({ name: btn.dataset.name, price: Number(btn.dataset.price), image: btn.closest('.cat-card')?.querySelector('img')?.getAttribute('src') || '' });
    });
  });
});