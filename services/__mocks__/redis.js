const redis = require('redis-mock')
const client = redis.createClient()

const {promisify} = require('util')
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const delAsync = promisify(client.del).bind(client)
// Expiry time, 30 days in seconds
const expiryTime = 60 * 60 * 24 * 30

module.exports.get = async (key) => {
  return getAsync(key.trim().toLowerCase())
}

module.exports.setExpr30 = async (key, val) => {
  return setAsync(key.trim().toLowerCase(), val, 'EX', expiryTime)
}

module.exports.del = async (key) => {
  return delAsync(key.trim().toLowerCase())
}
