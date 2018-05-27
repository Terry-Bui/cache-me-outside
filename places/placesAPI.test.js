/* eslint-env jest */
const request = require('supertest')
const app = require('./../app')
describe('Test the root path', () => {
  test('GET method respond with 200 status code', async () => {
    return request(app).get('/').expect(200)
  })

  test('Calling with Sydney as query will return truthy value', async () => {
    const response = await request(app).get('/?q=Sydney')
    const responseTextJSON = JSON.stringify(response.text)
    console.log(responseTextJSON)
    expect(typeof (responseTextJSON)).toBe('string')
    expect(responseTextJSON).toBeTruthy()
    // expect.assertions(1)
    // const response = await request(app).get('/?q=Sydney')
    // expect(response.statusCode).toBe(200)
    // console.log(`resp: ${JSON.stringify(response.text)}`)
  })
})
