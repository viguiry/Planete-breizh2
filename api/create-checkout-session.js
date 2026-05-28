const Stripe = require("stripe");
const { products, getProductPrice } = require("./catalog");

const siteUrl = process.env.SITE_URL || "https://viguiry.github.io/planetebreizh";

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || siteUrl);
  response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.end(JSON.stringify(payload));
}

function validateItems(items) {
  if (!Array.isArray(items) || !items.length) {
    throw new Error("Panier vide.");
  }

  return items.map((item) => {
    const product = products[item.id];
    const quantity = Number.parseInt(item.quantity, 10);

    if (!product) throw new Error("Produit inconnu.");
    if (!product.sizes.includes(item.size)) throw new Error("Taille indisponible.");
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Quantite invalide.");
    }

    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: `${product.name} - Taille ${item.size}`,
          images: [`${siteUrl}${product.image}`],
          metadata: {
            product_id: item.id,
            size: item.size,
          },
        },
        unit_amount: getProductPrice(product, item.size),
      },
      quantity,
    };
  });
}

module.exports = async function handler(request, response) {
  if (request.method === "OPTIONS") {
    return sendJson(response, 200, {});
  }

  if (request.method !== "POST") {
    return sendJson(response, 405, { error: "Methode non autorisee." });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY manque sur le backend.");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const lineItems = validateItems(request.body?.items);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      customer_creation: "always",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL"],
      },
      metadata: {
        source: "planete-breizh-site",
      },
      success_url: `${siteUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}#boutique`,
      cancel_url: `${siteUrl}/?checkout=cancel#boutique`,
    });

    return sendJson(response, 200, { url: session.url });
  } catch (error) {
    return sendJson(response, 400, { error: error.message });
  }
};
