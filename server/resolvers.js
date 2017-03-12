const cinemas = require('./api/cinemas')
const movies = require('./api/movies')
const actor = require('./api/actor')
const { take } = require('lodash')
const uuid = require('uuid')
const { pubsub } = require('./subscriptions')

const comments = [
  { id: uuid.v4(), content: "Genialny film!" },
  { id: uuid.v4(), content: "Kowalski to świetny bohater!" }
]

const resolveFunctions = {
  Query: {
    cinemas() {
      return cinemas.getList()
    },
    cinema(root, args) {
      return cinemas.get(args.id)
    },
    movies() {
      return movies.getList()
    },
    movie(root, args) {
      return movies.get(args.id)
    },
    actor(root, args) {
      return actor.get(args.id)
    }
  },
  Movie: {
    poster(root) {
      return `https://image.tmdb.org/t/p/w370_and_h556_bestv2${root.poster_path}`
    },
    cast(root, args) {
      const cast = root.credits.cast

      if (args.limit) {
        return take(cast, args.limit)
      }
      return cast
    },
    comments(root) {
      return comments.reverse()
    }
  },
  Cast: {
    actor(root) {
      return actor.get(root.id).catch(() => null)
    }
  },
  Actor: {
    photo(root) {
      return `https://image.tmdb.org/t/p/w300_and_h300_bestv2${root.profile_path}`
    }
  },
  Mutation: {
    submitComment(root, args) {
      const comment = { id: uuid.v4(), content: args.commentContent }
      comments.push(comment)
      pubsub.publish('commentAdded', comment)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(comment)
        }, 2000)
      })
    }
  },
  Subscription: {
    commentAdded(comment) {
      return comment
    }
  }
}

module.exports = resolveFunctions
