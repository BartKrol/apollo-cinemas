const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const faker = require('faker')
const resolvers = require('./resolvers')

const schemaString = `
  type Cinema {
    id: ID!
    name: String
    movies: [Movie]
  }

  type Movie {
    id: ID!
    title: String
    poster: String
    overview: String
    cast(limit: Int): [Cast]
    comments: [Comment]
  }

  type Cast {
    id: ID!
    character: String
    actor: Actor
  }

  type Actor {
    id: ID!
    name: String,
    photo: String
  }

  type Comment {
    id: ID!
    content: String
  }

  type Mutation {
    submitComment(movieId: ID!, commentContent: String!): Comment
  }

  type Query {
    cinemas: [Cinema]
    cinema(id: ID!): Cinema
    movies: [Movie]
    movie(id: ID!): Movie,
    actor(id: ID!): Actor
  }

  type Subscription {
    commentAdded: Comment
  }

  schema {
    query: Query,
    mutation: Mutation,
    subscription: Subscription
  }
  `;

const schema = makeExecutableSchema({
  typeDefs: schemaString,
  resolvers,
})

if (process.env.MOCK) { 
  addMockFunctionsToSchema({
    schema,
    mocks: {
      String: () => faker.random.words(),
    }
  })
}

module.exports = schema
