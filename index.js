"use strict"

// self
const mabo = require("./lib/mabo")

module.exports = { mabo }

/*
const got = require('got')
const { Handler } = require('htmlmetaparser')
const { Parser } = require('htmlparser2')

// const u2 = 'http://reseaudynamique.com/camions-occasion.php'
const u2 = 'https://www.ccml.qc.ca/freightliner-coronado-2012'

const parseit = (url2) => new Promise((resolve, reject) =>
  got(url2)
    .then(({ body, url }) => {
      const handler = new Handler((err, result) => err ? reject(err) : resolve(result), { url })
      const parser = new Parser(handler, { decodeEntities: true })
      parser.write(body)
      parser.end()
    })
    .catch(reject)
)

parseit(u2)
  .then(console.log)
  .catch(console.error)
*/
