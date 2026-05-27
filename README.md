# Planete Breizh

Site vitrine e-commerce statique pour une boutique bretonne en dropshipping.
La collection de lancement contient 6 textiles avec logo: 3 produits femme et
3 produits homme, avec choix de tailles.

## Lancer localement

Ouvrir `index.html` dans le navigateur, ou lancer un petit serveur:

```powershell
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Publier sur GitHub Pages

1. Creer un depot GitHub nomme `planete-breizh`.
2. Pousser ce dossier sur la branche `main`.
3. Dans GitHub: `Settings` -> `Pages` -> `Deploy from a branch`.
4. Choisir `main` et `/root`.

## Paiement Stripe

Le site garde les liens Stripe Payment Links en secours, mais il contient aussi
un endpoint Stripe Checkout pret pour un vrai panier unique:

- Frontend: `script.js`
- Configuration frontend: `config.js`
- Backend Vercel: `api/create-checkout-session.js`
- Catalogue serveur: `api/catalog.js`

GitHub Pages ne peut pas executer ce backend. Il faut le deployer sur Vercel,
Netlify, Render ou un autre hebergeur Node, puis mettre l'URL de l'endpoint dans
`config.js`.

Variables serveur a definir:

```text
STRIPE_SECRET_KEY=sk_live_xxx
SITE_URL=https://viguiry.github.io/Planete-breizh2
ALLOWED_ORIGIN=https://viguiry.github.io
```

Exemple apres deploiement Vercel:

```js
window.PLANETE_BREIZH_CHECKOUT_ENDPOINT = "https://ton-backend.vercel.app/api/create-checkout-session";
```

Le backend verifie les IDs produits, les tailles et les quantites cote serveur
avant de creer la session Stripe Checkout.

## Photos produits

Les fiches utilisent les previews de mockups recuperees depuis les produits
publies Printful dans `assets/products`.

## Dropshipping Printful

Les produits Printful sont publies dans la boutique Printful manuelle/API
`Planete Breizh`.

Flux actuel:

1. Le client choisit un produit sur le site.
2. Le client paie via Stripe Checkout.
3. La commande est ensuite traitee dans Printful.

## Shopify ou Stripe custom?

Pour une boutique Printful qui doit vendre vite, Shopify est le choix le plus
simple: panier, variantes, taxes, livraison, emails clients, paiements et
integration Printful sont deja prevus.

Stripe Checkout avec backend est plus leger et moins cher a demarrer, mais il
faut gerer soi-meme le catalogue, les webhooks, la transmission des commandes a
Printful, les emails et les cas de support.

## Email, paiement et livraison

- Email recommande: `contact@planetebreizh.fr`.
- Paiement actif: Stripe Payment Links par produit.
- Livraison recommandee: Printful avec suivi.

## Reseaux sociaux

Handles recommandes:

- Instagram: `@planetebreizh`
- Facebook: `Planete Breizh`
- TikTok: `@planetebreizh`

Pages de creation:

- Instagram: <https://www.instagram.com/>
- Facebook Page: <https://www.facebook.com/pages/create/>
- TikTok: <https://www.tiktok.com/signup>

Bio courte:

> Planete Breizh - vetements bretons a la demande. Sois libre. Sois vrai. Ancre-toi.

Premiers posts:

1. Photo du logo + annonce de lancement.
2. Carrousel des 3 produits femme et 3 produits homme.
3. Video courte du logo sur les vetements avec appel a commander.

Les produits sont dans `script.js`. Remplacer les prix, descriptions et liens de
commande quand le fournisseur change.
