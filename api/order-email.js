const nodemailer = require("nodemailer");

function getOrderEmailConfig() {
  return {
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.ORDER_EMAIL_FROM || process.env.SMTP_USER,
    to: process.env.ORDER_EMAIL_TO || process.env.SMTP_USER,
  };
}

function formatAddress(address = {}) {
  return [
    address.line1,
    address.line2,
    [address.postal_code, address.city].filter(Boolean).join(" "),
    address.state,
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatAmount(amount, currency = "eur") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format((amount || 0) / 100);
}

function buildOrderText(session, lineItems = []) {
  const customer = session.customer_details || {};
  const shipping = session.shipping_details || {};
  const itemsText = lineItems
    .map((item) => {
      const product = item.price?.product || {};
      const metadata = product.metadata || {};
      return [
        `- ${item.description || product.name || "Article Planète Breizh"}`,
        `  Quantité: ${item.quantity}`,
        metadata.product_id ? `  Produit: ${metadata.product_id}` : "",
        metadata.size ? `  Taille: ${metadata.size}` : "",
        `  Prix: ${formatAmount(item.amount_total, item.currency)}`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return [
    "Nouvelle commande Planète Breizh payée.",
    "",
    `Session Stripe: ${session.id}`,
    `Montant: ${formatAmount(session.amount_total, session.currency)}`,
    `Email client: ${customer.email || "non fourni"}`,
    `Téléphone: ${customer.phone || "non fourni"}`,
    `Nom: ${customer.name || shipping.name || "non fourni"}`,
    "",
    "Adresse de livraison:",
    formatAddress(shipping.address || customer.address) || "non fournie",
    "",
    "Articles à préparer dans Printful:",
    itemsText || "Aucun article récupéré.",
    "",
    "Action: créer ou vérifier la commande correspondante dans Printful, puis renseigner le suivi d'expédition.",
  ].join("\n");
}

async function sendOrderEmail(session, lineItems = []) {
  const config = getOrderEmailConfig();

  if (!config.host || !config.user || !config.pass || !config.from || !config.to) {
    console.warn("Email commande non envoyé: configuration SMTP incomplète.");
    return { sent: false, reason: "missing_smtp_config" };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: `Commande Planète Breizh ${session.id}`,
    text: buildOrderText(session, lineItems),
  });

  return { sent: true };
}

module.exports = { sendOrderEmail };
