const products = [
  {
    id: "femme-chemisette-logo",
    name: "Chemisette femme Planète Breizh",
    audience: "Femme",
    image: "assets/products/femme-chemisette-logo.png",
    description: "Chemisette légère, coupe fluide, pour une allure bord de mer chic.",
    prices: { XS: 39, S: 39, M: 39, L: 39, XL: 41, "2XL": 43 },
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: "femme-polo-logo",
    name: "Polo femme Planète Breizh",
    audience: "Femme",
    image: "assets/products/femme-polo-logo.png",
    description: "Polo piqué élégant avec broderie visuelle Planète Breizh côté coeur.",
    prices: { XS: 34, S: 34, M: 34, L: 34, XL: 36, "2XL": 38 },
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: "femme-mariniere-logo",
    name: "Marinière femme Planète Breizh",
    audience: "Femme",
    image: "assets/products/femme-mariniere-logo.png",
    description: "Marinière douce à rayures, esprit côte bretonne et silhouette soignée.",
    prices: { XS: 36, S: 36, M: 36, L: 36, XL: 38, "2XL": 40 },
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: "homme-chemisette-logo",
    name: "Chemisette homme Planète Breizh",
    audience: "Homme",
    image: "assets/products/homme-chemisette-logo.png",
    description: "Chemisette structurée, facile à porter ouverte ou boutonnée.",
    prices: { S: 39, M: 39, L: 39, XL: 41, "2XL": 43, "3XL": 45 },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "homme-polo-logo",
    name: "Polo homme Planète Breizh",
    audience: "Homme",
    image: "assets/products/homme-polo-logo.png",
    description: "Polo marine intemporel, sobre et net, avec signature Planète Breizh.",
    prices: { S: 34, M: 34, L: 34, XL: 36, "2XL": 38, "3XL": 40 },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "homme-mariniere-logo",
    name: "Marinière homme Planète Breizh",
    audience: "Homme",
    image: "assets/products/homme-mariniere-logo.png",
    description: "Marinière à rayures marines, élégante sans effort pour le quotidien.",
    prices: { S: 36, M: 36, L: 36, XL: 38, "2XL": 40, "3XL": 42 },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
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
const checkoutEndpoint = window.PLANETE_BREIZH_CHECKOUT_ENDPOINT || "";

function getProductPrice(product, size = product.sizes[0]) {
  return product.prices[size] ?? product.prices[product.sizes[0]];
}

function getProductPriceLabel(product) {
  const prices = product.sizes.map((size) => getProductPrice(product, size));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatter.format(min) : `${formatter.format(min)} - ${formatter.format(max)}`;
}

function renderProducts() {
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-art">
            <img class="product-photo" src="${product.image}?v=2" alt="${product.name} avec logo Planète Breizh" loading="lazy" />
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
              <span class="price" data-price-for="${product.id}">${getProductPriceLabel(product)}</span>
              <button class="add-button" type="button" data-add="${product.id}">Ajouter</button>
            </div>
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
  const total = items.reduce((sum, item) => sum + getProductPrice(item.product, item.size) * item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = formatter.format(total);

  cartItems.innerHTML = items.length
    ? items
        .map(
          ({ product, size, quantity }) => `
            <div class="cart-item">
              <div>
                <strong>${product.name}</strong>
                <span>Taille ${size} - ${quantity} x ${formatter.format(getProductPrice(product, size))}</span>
              </div>
              <div class="cart-actions">
                <button type="button" data-remove="${product.id}:${size}">Retirer</button>
              </div>
            </div>
          `
        )
        .join("")
    : "<p>Votre panier est vide pour le moment.</p>";

  if (checkoutEndpoint && items.length) {
    checkout.href = "#";
    checkout.removeAttribute("target");
    checkout.removeAttribute("rel");
    checkout.textContent = "Payer le panier";
  } else {
    checkout.href = "#";
    checkout.removeAttribute("target");
    checkout.removeAttribute("rel");
    checkout.textContent = items.length ? "Paiement indisponible" : "Panier vide";
  }
}

async function handleCheckout(event) {
  const items = [...cart.values()];

  if (!items.length) {
    event.preventDefault();
    alert("Votre panier est vide.");
    return;
  }

  if (checkoutEndpoint) {
    event.preventDefault();
    checkout.textContent = "Préparation du paiement...";
    checkout.setAttribute("aria-busy", "true");

    try {
      const response = await fetch(checkoutEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, size, quantity }) => ({
            id: product.id,
            size,
            quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Paiement indisponible");
      window.location.href = data.url;
    } catch (error) {
      alert(`Impossible de préparer le paiement : ${error.message}`);
      renderCart();
    } finally {
      checkout.removeAttribute("aria-busy");
    }

    return;
  }

  event.preventDefault();
  alert("Le paiement en ligne est momentanément indisponible. Merci de réessayer plus tard ou de nous contacter par email.");
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
  if (event.target.closest("[data-checkout]")) handleCheckout(event);
  if (event.target === cartPanel) closeCart();
});

document.addEventListener("change", (event) => {
  const select = event.target.closest("[data-size-for]");
  if (!select) return;

  const product = products.find((item) => item.id === select.dataset.sizeFor);
  const price = document.querySelector(`[data-price-for="${select.dataset.sizeFor}"]`);
  if (product && price) price.textContent = formatter.format(getProductPrice(product, select.value));
});

renderProducts();
renderCart();
