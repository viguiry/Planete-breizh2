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

## Prix Printful

Les prix du site sont alignes sur les prix au detail Printful des produits
publies, taille par taille. Le frontend utilise `prices` dans `script.js`; le
backend Stripe de secours utilise les memes prix en centimes dans
`api/catalog.js`.

Prix lus dans Printful:

- Women's T-shirt: XS/S/M/L/XL `28.00 EUR`, 2XL `29.50 EUR`
- Crop Hoodie: S/M/L/XL `45.50 EUR`, 2XL `40.00 EUR`
- Ladies' Muscle Tank: S/M/L `21.00 EUR`, XL `20.50 EUR`, 2XL `23.50 EUR`
- Short-Sleeve Unisex T-Shirt: S/M/L/XL `8.50 EUR`, 2XL `10.00 EUR`, 3XL `11.50 EUR`
- Men's Tank Top: XS `16.50 EUR`, S/M/L/XL `16.00 EUR`, 2XL `17.50 EUR`
- Unisex Hoodie: S/M/L/XL `25.00 EUR`, 2XL `26.50 EUR`, 3XL `28.50 EUR`, 4XL `30.00 EUR`, 5XL `31.50 EUR`

## Migration Shopify

Decision: Shopify + Printful est le meilleur chemin pour vendre proprement.
Les anciens liens Stripe produit sont desactives sur le site pour eviter des
prix incoherents avec Printful.

Pourquoi Shopify:

- variantes, prix et photos synchronises avec Printful
- vrai panier multi-produits
- paiement, taxes, livraison et emails clients integres
- commandes envoyables automatiquement a Printful

Etapes:

1. Creer ou ouvrir la boutique Shopify Planete Breizh.
2. Installer l'application Printful dans Shopify.
3. Connecter le store Printful `Planete Breizh` a Shopify.
4. Pousser les 6 produits Printful vers Shopify.
5. Verifier prix, tailles, taxes, livraison et moyens de paiement.
6. Remplacer le bouton panier du site GitHub Pages par le lien Shopify, ou faire
   pointer le domaine directement vers Shopify.

## Backend Stripe de secours

Le repo contient encore un endpoint Stripe Checkout si on veut garder une option
custom plus tard:

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

Le backend verifie les IDs produits, les tailles, les prix et les quantites cote
serveur avant de creer la session Stripe Checkout.

## Photos produits

Les fiches utilisent les previews de mockups recuperees depuis les produits
publies Printful dans `assets/products`.

## Dropshipping Printful

Les produits Printful sont publies dans la boutique Printful manuelle/API
`Planete Breizh`.

Flux actuel:

1. Le client choisit un produit sur le site.
2. Le client paie via Shopify.
3. La commande est transmise a Printful.

## Email, paiement et livraison

- Email recommande: `contact@planetebreizh.fr`.
- Paiement recommande: Shopify Payments.
- Livraison recommandee: Printful via Shopify.

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
