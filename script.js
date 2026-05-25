const products = [
  {
    id: "tee-phare",
    name: "T-shirt Phare Orbital",
    type: "mockup-shirt",
    label: "PHARE\nBREIZH",
    description: "Coton bio premium, coupe unisexe, visuel phare et vagues Planète Breizh.",
    price: 29.9,
  },
  {
    id: "cap-ancre",
    name: "Casquette Ancre-toi",
    type: "mockup-cap",
    label: "PB",
    description: "Casquette marine brodée, réglable, pensée pour les jours de vent et de soleil.",
    price: 24.9,
  },
  {
    id: "bottle-ouest",
    name: "Gourde Grand Ouest",
    type: "mockup-bottle",
    label: "BREIZH",
    description: "Gourde inox 500 ml, durable, légère et prête pour les randonnées côtières.",
    price: 26.9,
  },
];

const cart = new Map();
const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const grid = document.querySelector("[data-product-grid]");
const cartPanel = document.querySelector("[data-cart-panel]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartTotal = document.querySelector("[data-cart-total]");
const checkout = document.querySelector("[data-checkout]");

function renderProducts() {
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-art">
            <div class="mockup ${product.type}">
              <span>${product.label.replace("\n", "<br />")}</span>
            </div>
          </div>
          <div class="product-content">
            <div>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
            </div>
            <div class="product-meta">
              <span class="price">${formatter.format(product.price)}</span>
              <button class="add-button" type="button" data-add="${product.id}">Ajouter</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const quantity = cart.get(productId)?.quantity || 0;
  cart.set(productId, { product, quantity: quantity + 1 });
  renderCart();
  openCart();
}

function removeFromCart(productId) {
  const item = cart.get(productId);
  if (!item) return;

  if (item.quantity <= 1) {
    cart.delete(productId);
  } else {
    cart.set(productId, { ...item, quantity: item.quantity - 1 });
  }

  renderCart();
}

function renderCart() {
  const items = [...cart.values()];
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatter.format(total);

  cartItems.innerHTML = items.length
    ? items
        .map(
          ({ product, quantity }) => `
            <div class="cart-item">
              <div>
                <strong>${product.name}</strong>
                <span>${quantity} x ${formatter.format(product.price)}</span>
              </div>
              <button type="button" data-remove="${product.id}">Retirer</button>
            </div>
          `
        )
        .join("")
    : "<p>Ton panier est vide pour le moment.</p>";

  const orderLines = items
    .map(({ product, quantity }) => `${quantity} x ${product.name} - ${formatter.format(product.price)}`)
    .join("%0D%0A");
  checkout.href = `mailto:contact@planetebreizh.fr?subject=Commande%20Plan%C3%A8te%20Breizh&body=${orderLines}`;
}

function openCart() {
  cartPanel.classList.add("is-open");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const removeButton = event.target.closest("[data-remove]");

  if (addButton) addToCart(addButton.dataset.add);
  if (removeButton) removeFromCart(removeButton.dataset.remove);
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]")) closeCart();
  if (event.target === cartPanel) closeCart();
});

renderProducts();
renderCart();
