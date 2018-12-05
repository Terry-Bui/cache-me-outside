const redis = require('./../services/redis')
const places = require('./../services/google-places')

module.exports.getPlace = async (req, res) => {
  try {
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
      console.log(`result: ${JSON.stringify(JSON.parse(result), undefined, 2)}`)
      res.status(200).json(JSON.parse(result))
    }
  } catch (error) {
    console.warn(error)
    res.status(200).send(error)
  }
}
