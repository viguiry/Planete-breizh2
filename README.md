# Planete Breizh

Boutique statique Planete Breizh avec catalogue textile, panier cote navigateur,
paiement Stripe Checkout et backend Node heberge sur Raspberry Pi.

## Site

- Boutique: `index.html`
- Pages legales: `cgv.html`, `mentions-legales.html`, `confidentialite.html`,
  `retours-livraison.html`
- Produits: `script.js`
- Configuration checkout: `config.js`
- Images produits: `assets/products`

## Backend Stripe

Le backend expose:

- `GET /health`
- `POST /api/create-checkout-session`
- `POST /api/stripe-webhook`

Variables attendues:

```text
PORT=4242
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
SITE_URL=https://viguiry.github.io/planetebreizh
ALLOWED_ORIGIN=https://viguiry.github.io

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@planetebreizh.com
SMTP_PASS=mot_de_passe_smtp
ORDER_EMAIL_FROM=Planete Breizh <info@planetebreizh.com>
ORDER_EMAIL_TO=info@planetebreizh.com
```

Le webhook Stripe ecoute `checkout.session.completed` et prepare un email
commande avec les articles, tailles, quantites, montant et adresse de livraison.
L'envoi email devient actif quand la configuration SMTP est complete.

## Raspberry Pi

Chemin serveur:

```bash
/home/RaspCodex2/apps/planete-breizh-checkout
```

Commandes utiles:

```bash
cd /home/RaspCodex2/apps/planete-breizh-checkout
./node_modules/.bin/pm2 status
./node_modules/.bin/pm2 restart planete-breizh-checkout --update-env
curl http://127.0.0.1:4242/health
```

## Domaine et email

Pour un lancement durable, utiliser un domaine propre, puis configurer:

- GitHub Pages sur le domaine public de la boutique
- Cloudflare Tunnel nomme sur un sous-domaine checkout stable
- adresse email du type `info@planetebreizh.com`
- SMTP transactionnel pour les notifications de commande
