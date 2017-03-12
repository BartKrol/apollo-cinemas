const request = require('superagent-bluebird-promise')

const baseUrl = 'http://localhost:3001'

module.exports = {
  getList() {
    return request.get(`${baseUrl}/movies`)
      .then(({ body }) => body)
  },
  get(id) {
    return request.get(`${baseUrl}/movies/${id}`)
      .then(({ body }) => body)
  }
}
