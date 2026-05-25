# Planète Breizh

Site vitrine e-commerce statique pour une boutique bretonne en dropshipping:
t-shirts, casquettes et gourdes.

## Lancer localement

Ouvrir `index.html` dans le navigateur, ou lancer un petit serveur:

```powershell
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## Publier sur GitHub Pages

1. Créer un dépôt GitHub nommé `planete-breizh`.
2. Pousser ce dossier sur la branche `main`.
3. Dans GitHub: `Settings` -> `Pages` -> `Deploy from a branch`.
4. Choisir `main` et `/root`.

## Brancher le dropshipping

Le panier actuel prépare une demande par e-mail. Pour vendre réellement:

- Printful ou Printify pour les produits à la demande.
- Stripe Checkout, Shopify Buy Button ou WooCommerce pour le paiement.
- Un domaine du type `planetebreizh.fr` avec GitHub Pages ou Shopify.

Les produits sont dans `script.js`. Remplacer les prix, descriptions et liens de
commande quand le fournisseur est choisi.
