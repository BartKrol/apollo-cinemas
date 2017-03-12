import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, Route, Link, browserHistory } from 'react-router'
import { Client } from 'subscriptions-transport-ws'
import addGraphQLSubscriptions from './subscriptions'
import App from './App'
import MoviePage from './MoviePage'
import './index.css'


const wsClient = new Client('ws://localhost:4005')

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  }
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  shouldBatch: true,
})

ReactDOM.render(
  <ApolloProvider client={ client }>
    <MuiThemeProvider>
      <Router history={ browserHistory }>
        <Route path="/" component={ App } />
        <Route path="/movie/:id" component={ MoviePage } />
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
