const request = require('superagent-bluebird-promise')

const baseUrl = 'http://localhost:3001'

module.exports = {
  getList() {
    return request.get(`${baseUrl}/actors`)
      .then(({ body }) => body)
  },
  get(id) {
    return request.get(`${baseUrl}/actors/${id}`)
      .then(({ body }) => body)
  }
}
