const request = require('superagent-bluebird-promise')

module.exports = {
  get(id) {
    return request.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f81bd9740a1f947cd670b275ccd1596c`)
      .then(({ body }) => body)
  }
}
