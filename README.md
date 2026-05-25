# Planète Breizh

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

1. Créer un dépôt GitHub nommé `planete-breizh`.
2. Pousser ce dossier sur la branche `main`.
3. Dans GitHub: `Settings` -> `Pages` -> `Deploy from a branch`.
4. Choisir `main` et `/root`.

## Brancher le dropshipping avec Printful

Le panier actuel prépare une demande par e-mail. Les fiches produits contiennent
des liens vers Printful pour créer les produits:

- T-shirt: <https://www.printful.com/make-your-own-shirt>
- Casquette: <https://www.printful.com/custom/hats>
- Gourde: <https://www.printful.com/custom/water-bottles>

Pour vendre réellement:

1. Créer chaque produit dans Printful avec le visuel Planète Breizh.
2. Enregistrer le produit comme template ou lien partageable MerchShare.
3. Remplacer les `makerUrl` dans `script.js` par les URLs de tes vrais produits.
4. Remplacer le lien e-mail du checkout par Stripe Checkout, Shopify Buy Button,
   WooCommerce, ou un lien Printful partageable.

Choix recommandé: Printful. C'est le plus direct pour démarrer cette version du
site, car il permet de créer les produits, générer des templates partageables et
évoluer ensuite vers Shopify ou WooCommerce.

Plus tard, un domaine du type `planetebreizh.fr` pourra pointer vers GitHub Pages
ou vers une boutique Shopify si tu veux un vrai back-office e-commerce complet.

## Email, paiement et livraison

- Email recommande: `contact@planetebreizh.fr`.
- Paiement recommande: Stripe Payment Link.
- Livraison recommandee: Printful avec suivi.

Pour rendre ces elements reels, il faut creer la boite mail chez le fournisseur
du domaine, ouvrir un compte Stripe avec les informations legales, puis connecter
les produits Printful au tunnel de commande.

Les produits sont dans `script.js`. Remplacer les prix, descriptions et liens de
commande quand le fournisseur est choisi.
