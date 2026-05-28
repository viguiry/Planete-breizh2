const products = [
  {
    id: "femme-tee-logo",
    name: "Women's T-shirt",
    audience: "Femme",
    type: "mockup-shirt mockup-femme mockup-cream",
    image: "assets/products/femme-tee-logo.png",
    description: "T-shirt femme Printful avec logo Planete Breizh.",
    prices: { XS: 28, S: 28, M: 28, L: 28, XL: 28, "2XL": 29.5 },
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: "femme-sweat-logo",
    name: "Crop Hoodie",
    audience: "Femme",
    type: "mockup-sweat mockup-femme mockup-mist",
    image: "assets/products/femme-sweat-logo.png",
    description: "Hoodie court femme Printful avec logo Planete Breizh.",
    prices: { S: 45.5, M: 45.5, L: 45.5, XL: 45.5, "2XL": 40 },
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "femme-tank-logo",
    name: "Ladies' Muscle Tank",
    audience: "Femme",
    type: "mockup-tank mockup-femme mockup-coral",
    image: "assets/products/femme-tank-logo.png",
    description: "Debardeur femme Printful avec logo Planete Breizh.",
    prices: { S: 21, M: 21, L: 21, XL: 20.5, "2XL": 23.5 },
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "homme-tee-logo",
    name: "Short-Sleeve Unisex T-Shirt",
    audience: "Homme",
    type: "mockup-shirt mockup-homme mockup-navy",
    image: "assets/products/homme-tee-logo.png",
    description: "T-shirt unisexe Printful avec logo Planete Breizh.",
    prices: { S: 8.5, M: 8.5, L: 8.5, XL: 8.5, "2XL": 10, "3XL": 11.5 },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: "homme-sweat-logo",
    name: "Men's Tank Top",
    audience: "Homme",
    type: "mockup-sweat mockup-homme mockup-forest",
    image: "assets/products/homme-sweat-logo.png",
    description: "Debardeur homme Printful avec logo Planete Breizh.",
    prices: { XS: 16.5, S: 16, M: 16, L: 16, XL: 16, "2XL": 17.5 },
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: "homme-hoodie-logo",
    name: "Unisex Hoodie",
    audience: "Homme",
    type: "mockup-hoodie mockup-homme mockup-rust",
    image: "assets/products/homme-hoodie-logo.png",
    description: "Hoodie unisexe Printful avec logo Planete Breizh.",
    prices: { S: 25, M: 25, L: 25, XL: 25, "2XL": 26.5, "3XL": 28.5, "4XL": 30, "5XL": 31.5 },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
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
            <img class="product-photo" src="${product.image}" alt="${product.name} avec logo Planete Breizh" loading="lazy" />
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
    : "<p>Ton panier est vide pour le moment.</p>";

  if (checkoutEndpoint && items.length) {
    checkout.href = "#";
    checkout.removeAttribute("target");
    checkout.removeAttribute("rel");
    checkout.textContent = "Payer le panier";
  } else {
    checkout.href = "#";
    checkout.removeAttribute("target");
    checkout.removeAttribute("rel");
    checkout.textContent = items.length ? "Paiement bientot sur Shopify" : "Panier vide";
  }
}

async function handleCheckout(event) {
  const items = [...cart.values()];

  if (!items.length) {
    event.preventDefault();
    alert("Ton panier est vide.");
    return;
  }

  if (checkoutEndpoint) {
    event.preventDefault();
    checkout.textContent = "Preparation du paiement...";
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
      alert(`Impossible de preparer le paiement Stripe: ${error.message}`);
      renderCart();
    } finally {
      checkout.removeAttribute("aria-busy");
    }

    return;
  }

  event.preventDefault();
  alert("On passe la boutique sur Shopify + Printful pour un vrai panier, livraison et paiement synchronises. Les anciens liens Stripe sont desactives pour eviter des prix incoherents.");
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
