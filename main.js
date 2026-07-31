/* ============================================================
   MadhavPrem – main.js
   Handles: cart, discount, form sync, success detection
   ============================================================ */

const CART_STORAGE_KEY = 'madhavprem-cart';

// ── DOM refs ──────────────────────────────────────────────────
const cartPanel      = document.getElementById('cartPanel');
const cartToggle     = document.getElementById('cartToggle');
const closeCart      = document.getElementById('closeCart');
const cartItemsEl    = document.getElementById('cartItems');
const cartCountEl    = document.getElementById('cartCount');
const checkoutBtn    = document.getElementById('checkoutBtn');
const addToCartBtns  = document.querySelectorAll('[data-name]');

const quantityInput  = document.getElementById('quantity');
const discountBox    = document.getElementById('discountBox');
const discountField  = document.getElementById('discountField');
const cartSummaryBox = document.getElementById('cartSummaryBox');
const cartSummaryField = document.getElementById('cartSummaryField');
const itemsTextarea  = document.getElementById('items');
const submitBtn      = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const orderForm      = document.getElementById('orderForm');

// ── Cart state ────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// ── Sync cart into order form fields ─────────────────────────
function syncCartToForm() {
  if (!cart.length) {
    cartSummaryBox.textContent = 'Cart is empty — or type your items above.';
    cartSummaryBox.classList.remove('active');
    if (cartSummaryField) cartSummaryField.value = '';
    return;
  }

  const lines = cart.map(item => `${item.name} — ₹${item.price}`);
  const summary = lines.join(', ');

  // Fill hidden field sent to email
  if (cartSummaryField) cartSummaryField.value = summary;

  // Fill visible textarea if empty or was set by cart previously
  if (itemsTextarea && (!itemsTextarea.dataset.manual || itemsTextarea.dataset.manual === 'false')) {
    itemsTextarea.value = lines.join('\n');
  }

  // Update quantity
  if (quantityInput && !quantityInput.dataset.manual) {
    quantityInput.value = cart.length;
    updateDiscount();
  }

  // Show cart summary badge
  cartSummaryBox.textContent = `🛒 Cart ready: ${summary}`;
  cartSummaryBox.classList.add('active');
}

// Mark textarea as manually edited so we don't overwrite the user's text
if (itemsTextarea) {
  itemsTextarea.addEventListener('input', () => {
    itemsTextarea.dataset.manual = 'true';
  });
}
if (quantityInput) {
  quantityInput.addEventListener('input', () => {
    quantityInput.dataset.manual = 'true';
    updateDiscount();
  });
}

// ── Render cart sidebar ───────────────────────────────────────
function renderCart() {
  cartItemsEl.innerHTML = '';

  if (!cart.length) {
    cartItemsEl.innerHTML = '<div class="cart-empty">No items in your cart yet.</div>';
    cartCountEl.textContent = '0';
    syncCartToForm();
    return;
  }

  cartCountEl.textContent = cart.length;

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div>₹${item.price}</div>
      </div>
      <button class="cart-btn secondary" type="button" data-index="${index}">Remove</button>
    `;
    cartItemsEl.appendChild(row);
  });

  cartItemsEl.querySelectorAll('[data-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(Number(btn.getAttribute('data-index')), 1);
      saveCart();
      renderCart();
    });
  });

  syncCartToForm();
}

// ── Add to cart ───────────────────────────────────────────────
function addItemToCart(name, price) {
  cart.push({ name, price: Number(price) });
  saveCart();
  renderCart();
  cartPanel.classList.add('open');
}

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    addItemToCart(btn.getAttribute('data-name'), btn.getAttribute('data-price'));
  });
});

// ── Cart panel open / close ───────────────────────────────────
cartToggle.addEventListener('click', () => cartPanel.classList.add('open'));
closeCart.addEventListener('click',  () => cartPanel.classList.remove('open'));

checkoutBtn.addEventListener('click', () => {
  if (!cart.length) {
    cartItemsEl.innerHTML = '<div class="cart-empty">Add at least one item first.</div>';
    return;
  }
  syncCartToForm();
  cartPanel.classList.remove('open');
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
});

// ── Discount logic ────────────────────────────────────────────
function updateDiscount() {
  const qty = parseInt(quantityInput.value, 10) || 0;
  if (qty > 5) {
    discountBox.textContent = '🎉 30% discount applied — ordering more than 5 pieces!';
    discountBox.classList.add('active');
    if (discountField) discountField.value = '30% discount applied';
  } else {
    discountBox.textContent = 'Order 6 or more pieces and get 30% off.';
    discountBox.classList.remove('active');
    if (discountField) discountField.value = 'No discount';
  }
}

// ── Pre-submit: finalise hidden fields before POST ────────────
orderForm.addEventListener('submit', function (e) {
  // Ensure latest cart summary is in the hidden field
  const summary = cart.map(item => `${item.name} — ₹${item.price}`).join(', ');
  if (cartSummaryField) cartSummaryField.value = summary || 'Customer typed items manually';

  // If items textarea is still empty, fill it from cart
  if (itemsTextarea && !itemsTextarea.value.trim() && cart.length) {
    itemsTextarea.value = cart.map(item => `${item.name} — ₹${item.price}`).join('\n');
  }

  // Sync quantity from cart if not manually set
  if (quantityInput && !quantityInput.dataset.manual && cart.length) {
    quantityInput.value = cart.length;
  }

  // Disable button to prevent double-submit
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  // Allow the native POST to proceed (no e.preventDefault())
  // FormSubmit will redirect to _next URL with ?success=1
});

// ── Show success banner if redirected back with ?success=1 ────
(function checkSuccess() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('success') === '1') {
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Clear cart after successful order
    cart = [];
    saveCart();
    renderCart();

    // Clean URL without reloading
    window.history.replaceState({}, document.title, window.location.pathname + '#order');
  }
})();

// ── Init ──────────────────────────────────────────────────────
updateDiscount();
renderCart();
