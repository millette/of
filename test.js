// npm
import test from "ava"
import nock from "nock"

// self
import { mabo } from "."
const { productMabo, supportedLanguages } = mabo

test("mabo supportedLanguages", async (t) => {
  t.deepEqual(supportedLanguages(), ["en"])
})

test("mabo product fr", async (t) => {
  nock("http://mabo.ca")
    .get(
      "/s/13394/Produits/camions-de-transport/camion-neuf/western-star-4900sf-2019.html",
    )
    .replyWithFile(200, [__dirname, "fixtures/mabo-13394-fr.html"].join("/"))

  const ret = await productMabo(
    "http://mabo.ca/s/13394/Produits/camions-de-transport/camion-neuf/western-star-4900sf-2019.html",
  )
  t.truthy(ret.microdata["@graph"].length)
  t.is(ret.microdata["@graph"][0].offers["@type"], "Offer")
})

test("mabo product en", async (t) => {
  nock("http://mabo.ca")
    .get(
      "/s/13394/Products/transport-trucks/new-truck/western-star-4900sf-2019.html",
    )
    .replyWithFile(200, [__dirname, "fixtures/mabo-13394-en.html"].join("/"))

  const ret = await productMabo(
    "http://mabo.ca/s/13394/Products/transport-trucks/new-truck/western-star-4900sf-2019.html",
  )
  t.truthy(ret.microdata["@graph"].length)
  t.is(ret.microdata["@graph"][0].offers["@type"], "Offer")
})

test("mabo products", async (t) => {
  nock("http://mabo.ca")
    .get("/s/en/Category/All.html")
    .replyWithFile(200, [__dirname, "fixtures/mabo-all-en.html"].join("/"))
    .get(
      "/s/13394/Products/transport-trucks/new-truck/western-star-4900sf-2019.html",
    )
    .replyWithFile(200, [__dirname, "fixtures/mabo-13394-en.html"].join("/"))
  /*
    .get("/s/fr/Categorie/Tous.html")
    .replyWithFile(200, [__dirname, "fixtures/mabo-all-fr.html"].join("/"))
    .get("/s/13394/Produits/camions-de-transport/camion-neuf/western-star-4900sf-2019.html")
    .replyWithFile(200, [__dirname, "fixtures/mabo-13394-fr.html"].join("/"))
    */

  const ret = await mabo({ allLanguages: true, products: [13394] })
  // console.log(JSON.stringify(ret[0].products[0].microdata, null, '  '))
  // console.log(JSON.stringify(ret[1].products[0].microdata, null, '  '))
  t.is(ret.length, 1)
  t.is(ret[0].products.length, 1)
  // t.is(ret[1].products.length, 1)
})

test("mabo single", async (t) => {
  nock("http://mabo.ca")
    .get("/s/en/Category/All.html")
    .replyWithFile(200, [__dirname, "fixtures/mabo-all-en.html"].join("/"))

  const ret = await mabo()
  t.is(ret.length, 1)
})

test("mabo all", async (t) => {
  nock("http://mabo.ca")
    .get("/s/en/Category/All.html")
    .replyWithFile(200, [__dirname, "fixtures/mabo-all-en.html"].join("/"))
  /*
    .get("/s/fr/Categorie/Tous.html")
    .replyWithFile(200, [__dirname, "fixtures/mabo-all-fr.html"].join("/"))
    */

  const ret = await mabo({ allLanguages: true })
  t.is(ret.length, 1)
  t.truthy(ret[0].data.links.length)
  // t.is(ret[0].data.links.length, ret[1].data.links.length)
})
