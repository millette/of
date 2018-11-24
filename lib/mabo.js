"use strict"

// self
const pageOne = require("./page-one")
const { product } = pageOne

const res = {
  en: /\/Products\//,
  // fr: /\/Produits\//,
}

const paths = {
  en: "Products",
  // fr: 'Produits'
}

const it = async ({ products, href, hreflang = "en" }) => {
  const data = await pageOne(href, hreflang, res[hreflang])
  if (!products) {
    return { language: hreflang, data }
  }

  let x
  if (products === true) {
    x = data.links.map((link) => link.href)
  } else if (typeof products === "number") {
    products = [products]
  } else if (typeof products === "string") {
    products = [parseInt(products, 10)]
  } else if (!Array.isArray(products)) {
    throw new Error("Wrong type for `products` option.")
  }

  if (!x) {
    x = data.links
      .filter((link) =>
        products.find(
          (prod) => link.href.indexOf(`/s/${prod}/${paths[hreflang]}/`) !== -1,
        ),
      )
      .map((link) => link.href)
  }
  if (!x.length) {
    return { language: hreflang, data }
  }
  const foundProducts = await Promise.all(x.map((y) => product(y, hreflang)))
  return { language: hreflang, data, products: foundProducts }
}

const pageOneMabo = async (opts) => {
  // const { allLanguages, products } = opts || {}
  const { products } = opts || {}
  const so = await it({
    products,
    href: "http://mabo.ca/s/en/Category/All.html",
  })
  return [so]

  /*
  if (!allLanguages || !so.data.alternate || !so.data.alternate.length) {
    return [so]
  }

  return Promise.all([
    so,
    ...so.data.alternate
      .map((x) => ({ ...x, products }))
      .map(it)
  ])
  */
}

pageOneMabo.supportedLanguages = () => Object.keys(res).sort()
pageOneMabo.productMabo = product
module.exports = pageOneMabo
