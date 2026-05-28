const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(path.join(__dirname, ".env"));

const checkoutHandler = require("./api/create-checkout-session");

const port = Number.parseInt(process.env.PORT || "4242", 10);

function parseJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error("Payload trop volumineux."));
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("JSON invalide."));
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  const { pathname } = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (pathname === "/health") {
    return sendJson(response, 200, {
      ok: true,
      service: "planete-breizh-checkout",
      stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    });
  }

  if (pathname !== "/api/create-checkout-session") {
    return sendJson(response, 404, { error: "Route inconnue." });
  }

  try {
    request.body = await parseJson(request);
    return checkoutHandler(request, response);
  } catch (error) {
    return sendJson(response, 400, { error: error.message });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Planete Breizh checkout backend listening on http://127.0.0.1:${port}`);
});
