const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const cors = require('cors')
const schema = require('./schema')
const { createSubscriptionManager } = require('./subscriptions')

const PORT = process.env.PORT || 3005
const WS_PORT = process.env.WS_PORT || 4005

const app = express()

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({
    schema: schema
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/graphiql`))

const websocketServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on ws://localhost:${WS_PORT}`
))

new SubscriptionServer({ subscriptionManager: createSubscriptionManager(schema) }, websocketServer)
