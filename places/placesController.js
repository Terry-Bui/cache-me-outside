const redis = require('./../services/redis')
const places = require('./../services/google-places')

module.exports.getPlace = async (req, res) => {
  let query = req.query.q
  console.log(`Query: ${query}`)
  if (!query) {
    console.log('No query')
    res.status(404).end()
  } else {
    query = query.trim().toLowerCase()
    let result = await redis.get(query)
    if (!result) {
      const placeResult = await places.get(query)
      result = JSON.stringify(placeResult.json.results)
      try {
        const status = await redis.setExpr30(query, result)
        console.log(`status: ${status}`)
      } catch (err) {
        console.log(err)
      }
      console.log(`result is ${result}`)
    }
    res.json(result)
  }
}
