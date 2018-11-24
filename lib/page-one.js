"use strict"

// self
const parseit = require("./parse-page")

const pageOne = (u, hreflang, re) =>
  parseit(u, hreflang).then(
    ({ url, result: { html, alternate, rdfa, jsonld, links, microdata } }) => ({
      url,
      redirected: url !== u,
      html,
      alternate,
      rdfa,
      jsonld,
      microdata,
      links: links.filter(({ href }) => re.test(href)),
    }),
  )

const product = (u, hreflang) =>
  parseit(u, hreflang).then(
    ({ url, result: { html, alternate, rdfa, jsonld, links, microdata } }) => ({
      url,
      redirected: url !== u,
      html,
      alternate,
      rdfa,
      jsonld,
      microdata,
      links,
    }),
  )

pageOne.product = product
module.exports = pageOne
