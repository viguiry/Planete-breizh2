const products = {
  "femme-tee-logo": {
    name: "T-shirt femme Planète Breizh",
    prices: { XS: 2800, S: 2800, M: 2800, L: 2800, XL: 2800, "2XL": 2950 },
    image: "/assets/products/femme-tee-logo.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  "femme-sweat-logo": {
    name: "Hoodie court femme Planète Breizh",
    prices: { S: 4550, M: 4550, L: 4550, XL: 4550, "2XL": 4000 },
    image: "/assets/products/femme-sweat-logo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "femme-tank-logo": {
    name: "Débardeur femme Planète Breizh",
    prices: { S: 2100, M: 2100, L: 2100, XL: 2050, "2XL": 2350 },
    image: "/assets/products/femme-tank-logo.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  "homme-tee-logo": {
    name: "T-shirt unisexe Planète Breizh",
    prices: { S: 850, M: 850, L: 850, XL: 850, "2XL": 1000, "3XL": 1150 },
    image: "/assets/products/homme-tee-logo.png",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  "homme-sweat-logo": {
    name: "Débardeur homme Planète Breizh",
    prices: { XS: 1650, S: 1600, M: 1600, L: 1600, XL: 1600, "2XL": 1750 },
    image: "/assets/products/homme-sweat-logo.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  "homme-hoodie-logo": {
    name: "Hoodie unisexe Planète Breizh",
    prices: { S: 2500, M: 2500, L: 2500, XL: 2500, "2XL": 2650, "3XL": 2850, "4XL": 3000, "5XL": 3150 },
    image: "/assets/products/homme-hoodie-logo.png",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
  },
};

function getProductPrice(product, size) {
  return product.prices[size] ?? product.prices[product.sizes[0]];
}

module.exports = { products, getProductPrice };
