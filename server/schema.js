const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const schemaString = `
  type Cinema {
    id: Int!
    name: String
    movies: [Movie]
  }

  type Movie {
    id: Int!
    title: String
    cast: [Actor]
  }

  type Actor {
    id: Int!
    name: String
  }

  type Query {
    cinemas: [Cinema]
    cinema: Cinema
  }

  schema {
    query: Query
  }
  `;

const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
})

// addMockFunctionsToSchema({ schema })

module.exports = schema
