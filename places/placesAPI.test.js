/* eslint-env jest */
import place from './../services/google-places'

const client = require('./../services/redis')
const nock = require('nock')
const fse = require('fs-extra')
const request = require('supertest')
const app = require('./../app')

jest.mock('./../services/google-places')
jest.mock('./../services/redis')
describe('Test the root path', () => {
  beforeEach(async () => {
    nock.disableNetConnect()
    nock.enableNetConnect('127.0.0.1')
    const p = '__mockData__/sydney.json'
    const packageObj = await fse.readJson(p)
    nock('http://127.0.0.1:3000').get('/?q=Sydney').reply(200, packageObj)
  })
  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
  test('GET method respond with 200 status code', async () => {
    expect.assertions(1)
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
  test('Return result for Sydney as query', async () => {
    expect.assertions(8)
    // First delete key from Redis if required
    let deleteData = await client.del('Sydney'.trim().toLowerCase())
    expect(deleteData).toBeDefined()
    // Read json result for Sydney
    const p = '__mockData__/sydney.json'
    const packageObj = await fse.readJson(p)
    // Mock function that calls Google Place API
    place.get.mockResolvedValue({}).mockResolvedValueOnce({json: {results: packageObj}})

    const response = await request(app).get('/?q=Sydney')
    expect(response).toBeDefined()

    const responseBody = response.body

    expect(responseBody).toHaveProperty('id')
    expect(typeof responseBody).toBe('object')
    expect(typeof (responseBody.id)).toBe('string')
    expect(responseBody.id).toBe('044785c67d3ee62545861361f8173af6c02f4fae')

    expect(place.get).toHaveBeenCalledTimes(1)
    expect(place.get).toBeCalledWith('Sydney'.trim().toLowerCase())
  })
})
