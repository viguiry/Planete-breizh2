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

Le site utilise des liens Stripe Payment Links pour payer directement chaque
produit. Les URLs sont dans `script.js` via la propriete `paymentUrl`, et une
copie de suivi existe dans `stripe-links.json`.

Important: GitHub Pages seul ne peut pas creer une session Stripe Checkout
dynamique et securisee pour un panier mixte. Pour payer plusieurs produits
differents en un seul paiement, il faudra connecter Shopify a Printful ou
ajouter un backend Stripe Checkout.

## Dropshipping Printful

Les produits Printful sont publies dans la boutique Printful manuelle/API
`Planete Breizh`.

Flux actuel:

1. Le client choisit un produit sur le site.
2. Le client paie via Stripe Payment Link.
3. La commande est ensuite traitee dans Printful.

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
