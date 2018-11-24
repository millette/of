"use strict"

// self
const pageOne = require("./page-one")
const { product } = pageOne

const res = {
  en: /\/Products\//,
  fr: /\/Produits\//,
}

const it = async ({ href, hreflang = "en" }) => {
  const data = await pageOne(href, res[hreflang])
  return { language: hreflang, data }
}

const pageOneMabo = async (opts) => {
  const { allLanguages } = opts || {}
  const so = await it({ href: "http://mabo.ca/s/en/Category/All.html" })
  if (!allLanguages || !so.data.alternate || !so.data.alternate.length) {
    return [so]
  }

  return Promise.all([so, ...so.data.alternate.map(it)])
}

pageOneMabo.supportedLanguages = () => Object.keys(res).sort()
pageOneMabo.productMabo = product
module.exports = pageOneMabo
