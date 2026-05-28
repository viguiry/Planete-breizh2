const Stripe = require("stripe");
const { sendOrderEmail } = require("./order-email");

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
}

module.exports = async function stripeWebhookHandler(request, response) {
  if (request.method !== "POST") {
    return sendJson(response, 405, { error: "Méthode non autorisée." });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return sendJson(response, 500, { error: "Webhook Stripe non configuré." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = request.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(request.rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return sendJson(response, 400, { error: `Signature Stripe invalide: ${error.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const sessionId = event.data.object.id;
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });
    const lineItems = session.line_items?.data || [];
    await sendOrderEmail(session, lineItems);
  }

  return sendJson(response, 200, { received: true });
};
