const cartPanel = document.getElementById('cartPanel');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const addButtons = document.querySelectorAll('[data-name]');
const CART_STORAGE_KEY = 'madhavprem-cart';

let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function renderCart() {
  cartItems.innerHTML = '';
  if (!cart.length) {
    cartItems.innerHTML = '<div class="cart-empty">No items yet.</div>';
    cartCount.textContent = '0';
    return;
  }
  cartCount.textContent = cart.length;
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
    cartItems.appendChild(row);
  });
  cartItems.querySelectorAll('[data-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(Number(btn.getAttribute('data-index')), 1);
      saveCart();
      renderCart();
    });
  });
}

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    cart.push({ name: button.getAttribute('data-name'), price: button.getAttribute('data-price') });
    saveCart();
    renderCart();
    cartPanel.classList.add('open');
  });
});

cartToggle.addEventListener('click', () => cartPanel.classList.add('open'));
closeCart.addEventListener('click', () => cartPanel.classList.remove('open'));

renderCart();
