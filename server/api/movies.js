const request = require('superagent-bluebird-promise')

const baseUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=f81bd9740a1f947cd670b275ccd1596c&language=en-US&page=1'


module.exports = {
  getList() {
    return request.get('https://api.themoviedb.org/3/movie/popular?api_key=f81bd9740a1f947cd670b275ccd1596c&language=en-US&page=1')
      .then(({ body }) => body.results)
  },
  get(id) {
    return request.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f81bd9740a1f947cd670b275ccd1596c&language=pl-PL&append_to_response=credits`)
      .then(({ body }) => body)
  }
}
