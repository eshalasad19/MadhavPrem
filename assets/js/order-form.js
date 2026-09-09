/* ============================================================
   MadhavPrem — order-form.js
   Keeps the FormSubmit order form in sync with Store.cart.
   Same behavior as the original main.js, wired to the shared store.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const orderForm       = document.getElementById('orderForm');
  if (!orderForm) return; // this page has no order form (category pages)

  const quantityInput   = document.getElementById('quantity');
  const discountBox     = document.getElementById('discountBox');
  const discountField   = document.getElementById('discountField');
  const cartSummaryBox  = document.getElementById('cartSummaryBox');
  const cartSummaryField = document.getElementById('cartSummaryField');
  const itemsTextarea   = document.getElementById('items');
  const submitBtn       = document.getElementById('submitBtn');
  const successMessage  = document.getElementById('successMessage');

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

  function syncCartToForm() {
    const cart = Store.cart;
    if (!cart.length) {
      cartSummaryBox.textContent = 'Cart is empty — or type your items above.';
      cartSummaryBox.classList.remove('active');
      if (cartSummaryField) cartSummaryField.value = '';
      return;
    }
    const lines = cart.map(item => `${item.name} × ${item.qty || 1} — ₹${item.price}`);
    if (cartSummaryField) cartSummaryField.value = lines.join(', ');
    if (itemsTextarea && (!itemsTextarea.dataset.manual || itemsTextarea.dataset.manual === 'false')) {
      itemsTextarea.value = lines.join('\n');
    }
    if (quantityInput && !quantityInput.dataset.manual) {
      quantityInput.value = cart.reduce((s, i) => s + (i.qty || 1), 0);
      updateDiscount();
    }
    cartSummaryBox.textContent = `🛒 Cart ready: ${lines.join(', ')}`;
    cartSummaryBox.classList.add('active');
  }

  itemsTextarea?.addEventListener('input', () => { itemsTextarea.dataset.manual = 'true'; });
  quantityInput?.addEventListener('input', () => { quantityInput.dataset.manual = 'true'; updateDiscount(); });

  orderForm.addEventListener('submit', () => {
    const cart = Store.cart;
    const summary = cart.map(item => `${item.name} × ${item.qty || 1} — ₹${item.price}`).join(', ');
    if (cartSummaryField) cartSummaryField.value = summary || 'Customer typed items manually';
    if (itemsTextarea && !itemsTextarea.value.trim() && cart.length) {
      itemsTextarea.value = cart.map(item => `${item.name} — ₹${item.price}`).join('\n');
    }
    if (quantityInput && !quantityInput.dataset.manual && cart.length) {
      quantityInput.value = cart.reduce((s, i) => s + (i.qty || 1), 0);
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
  });

  (function checkSuccess() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1') {
      successMessage.classList.add('show');
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      Store.cart = [];
      Store.save();
      window.history.replaceState({}, document.title, window.location.pathname + '#order');
    }
  })();

  Store.onChange(syncCartToForm);
  updateDiscount();
  syncCartToForm();
});