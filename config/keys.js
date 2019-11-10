/**
 * Module to figure out what set of credentials to return
 */
if (process.env.NODE_ENV === "production") {
  // return production set of keys
  console.log("production");
  module.exports = require("./prod");
} else {
  // return development set of keys
  console.log("production");
  module.exports = require("./dev");
}
