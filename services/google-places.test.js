/* eslint-env jest */
// const nock = require('nock')
const fse = require('fs-extra')
const path = require('path')

describe('GET place', () => {
  test('GET sydney', async () => {
    try {
      const p = path.join(__dirname, '/_mockData/sydney.json')
      const packageObj = await fse.readJson(p)

      console.log(packageObj.place_id) // => 0.1.3
    } catch (err) {
      console.error(err)
    }
  })
})
