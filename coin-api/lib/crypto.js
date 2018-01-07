/**
 * manager for private key
 */

const crypto = require("crypto");

// TODO Get key from OS environment value
// const privateKeySeed = 'family';

const generateHash = function(text) {
  var hash = crypto.createHash('sha256')
  hash.update(text)
  return hash.digest('base64')
}
module.exports.generateHash = generateHash

// TODO get from os.environment
const privateKeySeed = 'testtt';

const generatePrivateKey = function(cryptoPassword) {
  return crypto.createHmac('sha256', privateKeySeed).update(cryptoPassword).digest('hex')
}
module.exports.generatePrivateKey = generatePrivateKey
