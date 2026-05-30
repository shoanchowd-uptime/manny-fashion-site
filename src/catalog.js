// Catalog product data.
// Add products to the arrays below — the site renders them automatically.
// Images go in /public/images/catalog/  and are referenced as "/images/catalog/9871.jpg".
// Until a photo exists, leave `image` out (or null) and the card shows a placeholder.
//
// RETAIL product shape:
//   {
//     id: "9871",                 // unique string (style number works great)
//     name: "Regal Puff Sleeve Midi Dress",
//     style: "9871",              // shown after the name, like the brand site
//     price: 139.5,               // number, USD
//     color: "White",             // shown in small caps under the price
//     tag: "New in",              // optional badge on the photo
//     image: "/images/catalog/9871.jpg",   // optional until you add the photo
//   }

export const retailProducts = [
  { id: "9871",  name: "Regal Puff Sleeve Midi Dress",         style: "9871",  price: 139.5, color: "White",             tag: "New in" },
  { id: "9848",  name: "Sculpted Mosaic Sheath Dress",         style: "9848",  price: 139.5, color: "Blue / Purple Multi", tag: "New in" },
  { id: "41039", name: "Elegant Dress & Jacket Set with Brooch", style: "41039", price: 199.5, color: "White",           tag: "New in" },
  { id: "41090", name: "Ombre Abstract Print Jacket Dress Set",  style: "41090", price: 199.5, color: "Yellow Multi",     tag: "New in" },
  { id: "41088", name: "Abstract Print Dress & Duster Set",      style: "41088", price: 199.5, color: "Pink Multi",       tag: "New in" },
  { id: "41095", name: "Brocade Dress with Peplum Jacket Set",   style: "41095", price: 199.5, color: "Blue Multi",       tag: "New in" },
  { id: "41086", name: "Polka Dot Stripe Bow Detail Midi Dress", style: "41086", price: 179.5, color: "Green Multi",      tag: "New in" },
  { id: "41085", name: "Colorblock Bow Detail Midi Dress",       style: "41085", price: 179.5, color: "Red / Black",      tag: "New in" },
];

export const wholesaleProducts = [
  // Add wholesale items here when ready.
];
