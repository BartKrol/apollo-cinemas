import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import CircularProgress from 'material-ui/CircularProgress'
import MovieCard from './MovieCard'

const query = gql`
  query getMovies {
    movies {
      id
      title
      poster,
      cast(limit: 3) {
        character,
        actor {
          id,
          name,
          photo
        }
      }
    }
  }
`

const withData = graphql(query)

function MovieList({ data }){
  if (data.loading) {
    return <CircularProgress />
  }

  const list = data.movies.map(movie => <MovieCard
      key={ movie.id }
      id={ movie.id }
      title={ movie.title }
      poster={ movie.poster}
      cast={ movie.cast }
    />
  )

  return <div style={ appStyle }>
    { list }
  </div>
}

const appStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  flexDirection: 'row',
  margin: '0 40px'
}

export default withData(MovieList)
