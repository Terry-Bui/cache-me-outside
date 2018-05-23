const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
//const setAsync = promisify(client.set).bind(client);

//Expiry time, 30 days in seconds
const expiry_time = 60 * 60 * 24 * 30;

module.exports.get = async function get(key) {
    return getAsync(key);
};

module.exports.setExpr30 = (key, val) => {
    client.set(key, val, 'EX', expiry_time);
};