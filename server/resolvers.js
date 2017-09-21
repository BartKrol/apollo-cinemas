const movies = require('./api/movies')
const credits = require('./api/credits')
const { take, pick } = require('lodash')
const uuid = require('uuid')
const { pubsub } = require('./subscriptions')

const comments = [
  { id: uuid.v4(), content: "Great ending to an awesome trilogy!" },
  { id: uuid.v4(), content: "Finally a Wolverine movie we deserve!" }
]

const resolveFunctions = {
  Query: {
    movies() {
      return movies.getList()
    },
    movie(root, args) {
      return movies.get(args.id)
    }
  },
  Movie: {
    poster(root) {
      return `https://image.tmdb.org/t/p/w370_and_h556_bestv2${root.poster_path}`
    },
    cast(root, args) {
      return credits.get(root.id)
        .then(({ cast }) => {
          if (args.limit) {
            return take(cast, args.limit)
          }
          return cast
        })
    },
    comments(root) {
      return comments.reverse()
    }
  },
  Cast: {
    id(root){
      return root.credit_id
    },
    actor(root) {
      return root
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
