const products = {
  "femme-chemisette-logo": {
    name: "Chemisette femme Planète Breizh",
    prices: { XS: 3900, S: 3900, M: 3900, L: 3900, XL: 4100, "2XL": 4300 },
    image: "/assets/products/femme-chemisette-logo.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  "femme-polo-logo": {
    name: "Polo femme Planète Breizh",
    prices: { XS: 3400, S: 3400, M: 3400, L: 3400, XL: 3600, "2XL": 3800 },
    image: "/assets/products/femme-polo-logo.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  "femme-mariniere-logo": {
    name: "Marinière femme Planète Breizh",
    prices: { XS: 3600, S: 3600, M: 3600, L: 3600, XL: 3800, "2XL": 4000 },
    image: "/assets/products/femme-mariniere-logo.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  "homme-chemisette-logo": {
    name: "Chemisette homme Planète Breizh",
    prices: { S: 3900, M: 3900, L: 3900, XL: 4100, "2XL": 4300, "3XL": 4500 },
    image: "/assets/products/homme-chemisette-logo.png",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  "homme-polo-logo": {
    name: "Polo homme Planète Breizh",
    prices: { S: 3400, M: 3400, L: 3400, XL: 3600, "2XL": 3800, "3XL": 4000 },
    image: "/assets/products/homme-polo-logo.png",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  "homme-mariniere-logo": {
    name: "Marinière homme Planète Breizh",
    prices: { S: 3600, M: 3600, L: 3600, XL: 3800, "2XL": 4000, "3XL": 4200 },
    image: "/assets/products/homme-mariniere-logo.png",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
};

function getProductPrice(product, size) {
  return product.prices[size] ?? product.prices[product.sizes[0]];
}

module.exports = { products, getProductPrice };
