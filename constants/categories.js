const productMobile = {
    name: "SAMSUNG GALAXY A03",
    price: "$256.99",
    oldPrice: "$284.99",
    image: "/static/images/mobile.png"
}
const productLaptop = {
    name: "HP 15DW3018NK I3 11È GÉN",
    price: "$478.99",
    oldPrice: "$542.99",
    image: "/static/images/laptop.png"
}
const productTv = {
    name: 'TELEFUNKEN 40" FHD AND SMART',
    price: "$320.99",
    oldPrice: "$400.99",
    image: "/static/images/tv.png"
}

export const categories = [
    { name: "Mobiles", products: [...Array(5).keys()].map(() => productMobile)},
    { name: "Laptops", products: [...Array(5).keys()].map(() => productLaptop) },
    { name: "Tvs", products: [...Array(5).keys()].map(() => productTv) }
]
