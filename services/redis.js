const redis = require('redis')
const client = redis.createClient()

const {promisify} = require('util')
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
// Expiry time, 30 days in seconds
const expiryTime = 60 * 60 * 24 * 30

module.exports.get = async (key) => {
  return getAsync(key)
}

module.exports.setExpr30 = async (key, val) => {
  return setAsync(key, val, 'EX', expiryTime)
}
