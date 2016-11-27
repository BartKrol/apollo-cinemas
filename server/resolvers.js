const cinemas = require('./api/cinemas')

const resolveFunctions = {
  Query: {
    cinemas() {
      return cinemas.getList()
    },
    cinema(root, args) {
      return cinemas.get(args.id)
    },
  }
}

module.exports = resolveFunctions
