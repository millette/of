#!/usr/bin/env node
"use strict"

const { mabo } = require(".")

const jsoned = (x) => console.log(JSON.stringify(x, null, "  "))

mabo({ products: true })
  .then(jsoned)
  .catch(console.error)
