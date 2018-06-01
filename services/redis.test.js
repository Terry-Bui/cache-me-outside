/* eslint-env jest */

const redis = require('./redis')

test('Can add into Redis', async () => {
  expect.assertions(2)
  const data = await redis.setExpr30('a', 'b')
  expect(data).toBeDefined()
  expect(data).toBe('OK')
})

test('Return null when retrieving from Redis when using invalid key', async () => {
  expect.assertions(1)
  const data = await redis.get('aKeyThatDoesn\'tExist')
  expect(data).toBeNull()
})

test('Can delete from Redis database', async () => {
  await redis.setExpr30('a', 'b')
  expect.assertions(1)
  const data = await redis.del('a')
  expect(data).toBe(1)
})
