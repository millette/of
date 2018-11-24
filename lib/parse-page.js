"use strict"

// npm
const got = require("got")
const { Handler } = require("htmlmetaparser")
const { Parser } = require("htmlparser2")

module.exports = (u) =>
  new Promise((resolve, reject) =>
    got(u)
      .then(({ body, headers, url }) => {
        const handler = new Handler(
          (error, result) => {
            // istanbul ignore if
            if (error) {
              if (url) {
                error.url = url
              }
              if (headers) {
                error.headers = headers
              }
              return reject(error)
            }
            resolve({ result, url, headers })
          },
          { url },
        )
        const parser = new Parser(handler, { decodeEntities: true })
        parser.write(body)
        parser.end()
      })
      .catch(reject),
  )
