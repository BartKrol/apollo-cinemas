const request = require('superagent-bluebird-promise')

const baseUrl = 'http://localhost:3001'

module.exports = {
  getList() {
    return request.get(`${baseUrl}/cinemas`)
      .then(({ body }) => body)
  },
  get(id) {
    return request.get(`${baseUrl}/cinemas/${id}`)
      .then(({ body }) => body)
  }
}
