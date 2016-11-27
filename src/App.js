import React from 'react'
import './App.css'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query getCinemas {
    cinemas {
      name
    }
  }
`

const withData = graphql(query)

function App({ data }){
  if (data.loading) {
    return <div>Loading...</div>
  }

  return <div>{ JSON.stringify(data.cinemas) }</div>
}

export default withData(App)
