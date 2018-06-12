const redis = require('./../services/redis')
const places = require('./../services/google-places')

module.exports.getPlace = async (req, res) => {
  let query = req.query.q
  console.log(`Query: ${query}`)
  if (!query) {
    console.warn('Empty query')
    res.send()
  } else {
    query = query.trim().toLowerCase()
    let result = await redis.get(query)
    if (!result) {
      console.log(`No cache for ${query}`)
      const placeResult = await places.get(query)
      result = JSON.stringify(placeResult.json.results)
      await redis.setExpr30(query, result)
    }
    console.log(`result: ${result}`)
    res.status(200).json(result)
  }
}
