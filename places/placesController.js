let redis = require('./../services/redis');
let places = require('./../services/google-places');

module.exports.getPlace = async (req, res) => {
    let query = req.query.q;
    console.log(`Query: ${query}`);
    if (!query) {
        console.log("No query");
        res.send();
    } else {
        query = query.trim().toLowerCase();

        let result = await redis.get(query);
        if (!result) {
            result = await places.get(query);
            result = JSON.stringify(result.json.results);
            redis.setExpr30(query, result);
            console.log(`result is ${result}`);
        }
        res.json(result);
    }
};