const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')

const PORT = 3005

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: schema
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT)

console.log(`Running on http://localhost:${PORT}`)
