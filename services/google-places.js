let googleMapsClient = require('@google/maps').createClient({
  key: process.env.PLACE_API,
  Promise: Promise
})

module.exports.get = (key) => {
  return googleMapsClient.places({query: key}).asPromise()
}
