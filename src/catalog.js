// Catalog product data.
// When you're ready to go live, just add objects to the arrays below.
// Images should live in /public/images/catalog/ (referenced as "/images/catalog/foo.jpg").
//
// RETAIL product shape:
//   {
//     id: "r-001",           // any unique string
//     name: "Silk Evening Gown",
//     price: 485,            // number, USD
//     image: "/images/catalog/r-001.jpg",
//     sizes: ["S", "M", "L", "XL"],
//     description: "Short description shown on card.",
//     tags: ["Evening", "Silk"],   // optional, for future filtering
//   }
//
// WHOLESALE product shape:
//   {
//     id: "w-001",
//     name: "Church Suit Set",
//     brand: "Tally Taylor",
//     moq: 12,                // minimum order quantity
//     priceRange: "$120-$180 / unit",
//     image: "/images/catalog/w-001.jpg",
//     description: "Short description shown on card.",
//     tags: ["Church", "Occasion"],
//   }

export const retailProducts = [
  // Add retail items here.
];

export const wholesaleProducts = [
  // Add wholesale items here.
];
