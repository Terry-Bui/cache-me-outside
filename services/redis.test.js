/* eslint-env jest */

const redis = require('./redis')

test('Can add into Redis', async () => {
  expect.assertions(1)
  const data = await redis.setExpr30('a', 'b')
  expect(data).toBe('OK')
})

test('Return null when retrieving from Redis when using invalid key', async () => {
  expect.assertions(1)
  const data = await redis.get('aKeyThatDoesn\'tExist')
  expect(data).toBe(null)
})
