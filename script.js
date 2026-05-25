const products = [
  {
    id: "femme-tee-logo",
    name: "T-shirt femme Logo Breizh",
    audience: "Femme",
    type: "mockup-shirt mockup-femme mockup-cream",
    description: "Coupe femme, coton doux, logo Planete Breizh imprime cote coeur.",
    price: 29.9,
    sizes: ["XS", "S", "M", "L", "XL"],
    makerUrl: "https://www.printful.com/make-your-own-shirt",
    makerLabel: "Creer sur Printful",
  },
  {
    id: "femme-sweat-logo",
    name: "Sweat femme Logo Phare",
    audience: "Femme",
    type: "mockup-sweat mockup-femme mockup-mist",
    description: "Sweat confortable avec logo Planete Breizh central, parfait pour les soirees fraiches.",
    price: 49.9,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    makerUrl: "https://www.printful.com/custom/womens/sweatshirts",
    makerLabel: "Creer le sweat",
  },
  {
    id: "femme-tank-logo",
    name: "Debardeur femme Vagues",
    audience: "Femme",
    type: "mockup-tank mockup-femme mockup-coral",
    description: "Debardeur leger avec logo Planete Breizh, coupe ete et esprit bord de mer.",
    price: 27.9,
    sizes: ["XS", "S", "M", "L", "XL"],
    makerUrl: "https://www.printful.com/custom/womens/tank-tops",
    makerLabel: "Creer le debardeur",
  },
  {
    id: "homme-tee-logo",
    name: "T-shirt homme Logo Breizh",
    audience: "Homme",
    type: "mockup-shirt mockup-homme mockup-navy",
    description: "T-shirt homme avec logo Planete Breizh poitrine, coupe droite et coton resistant.",
    price: 29.9,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    makerUrl: "https://www.printful.com/make-your-own-shirt",
    makerLabel: "Creer sur Printful",
  },
  {
    id: "homme-sweat-logo",
    name: "Sweat homme Ancre-toi",
    audience: "Homme",
    type: "mockup-sweat mockup-homme mockup-forest",
    description: "Sweat epais avec logo central, pense pour les retours de plage et les matins frais.",
    price: 49.9,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    makerUrl: "https://www.printful.com/custom/mens/sweatshirts",
    makerLabel: "Creer le sweat",
  },
  {
    id: "homme-hoodie-logo",
    name: "Hoodie homme Planete",
    audience: "Homme",
    type: "mockup-hoodie mockup-homme mockup-rust",
    description: "Hoodie a capuche avec logo Planete Breizh, style marin chaud et robuste.",
    price: 54.9,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    makerUrl: "https://www.printful.com/custom/mens/hoodies",
    makerLabel: "Creer le hoodie",
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
const contactEmail = "contact@planetebreizh.fr";

function renderProducts() {
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-art">
            <div class="mockup ${product.type}">
              <img src="assets/planete-breizh-logo-transparent.png" alt="" />
            </div>
          </div>
          <div class="product-content">
            <div>
              <span class="product-audience">${product.audience}</span>
              <h3>${product.name}</h3>
              <p>${product.description}</p>
            </div>
            <label class="size-picker">
              <span>Taille</span>
              <select data-size-for="${product.id}">
                ${product.sizes.map((size) => `<option value="${size}">${size}</option>`).join("")}
              </select>
            </label>
            <div class="product-meta">
              <span class="price">${formatter.format(product.price)}</span>
              <button class="add-button" type="button" data-add="${product.id}">Ajouter</button>
            </div>
            <a class="maker-action" href="${product.makerUrl}" target="_blank" rel="noopener">
              ${product.makerLabel}
            </a>
          </div>
        </article>
      `
    )
    .join("");
}

function addToCart(productId, size) {
  const product = products.find((item) => item.id === productId);
  const selectedSize = size || product.sizes[0];
  const cartKey = `${productId}:${selectedSize}`;
  const quantity = cart.get(cartKey)?.quantity || 0;
  cart.set(cartKey, { product, size: selectedSize, quantity: quantity + 1 });
  renderCart();
  openCart();
}

function removeFromCart(cartKey) {
  const item = cart.get(cartKey);
  if (!item) return;

  if (item.quantity <= 1) {
    cart.delete(cartKey);
  } else {
    cart.set(cartKey, { ...item, quantity: item.quantity - 1 });
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
          ({ product, size, quantity }) => `
            <div class="cart-item">
              <div>
                <strong>${product.name}</strong>
                <span>Taille ${size} - ${quantity} x ${formatter.format(product.price)}</span>
              </div>
              <button type="button" data-remove="${product.id}:${size}">Retirer</button>
            </div>
          `
        )
        .join("")
    : "<p>Ton panier est vide pour le moment.</p>";

  const orderLines = items
    .map(({ product, size, quantity }) => `${quantity} x ${product.name} taille ${size} - ${formatter.format(product.price)}`)
    .join("%0D%0A");
  const details = [
    "Bonjour Planete Breizh,",
    "",
    "Je souhaite commander:",
    orderLines || "Panier vide",
    "",
    `Total: ${formatter.format(total)}`,
    "",
    "Paiement souhaite: lien Stripe securise",
    "Livraison souhaitee: Printful avec suivi",
    "",
    "Nom:",
    "Adresse de livraison:",
    "Telephone:",
  ].join("%0D%0A");
  checkout.href = `mailto:${contactEmail}?subject=Commande%20Planete%20Breizh&body=${details}`;
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

  if (addButton) {
    const size = document.querySelector(`[data-size-for="${addButton.dataset.add}"]`)?.value;
    addToCart(addButton.dataset.add, size);
  }
  if (removeButton) removeFromCart(removeButton.dataset.remove);
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]")) closeCart();
  if (event.target === cartPanel) closeCart();
});

renderProducts();
renderCart();
