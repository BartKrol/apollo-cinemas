import React from 'react'
import { take } from 'lodash'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Link } from 'react-router'
import ActorInfo from './ActorInfo'

export default function MovieCard({ id, title, poster, cast }) {
  const actors = take(cast, 3).map(({ actor, character }, index) => {
    return <ActorInfo key={ index } role={ character } actor={ actor } />
  })

  const link = `/movie/${id}`

  const actorsLine = <div style={ { marginTop: 20 } }>
      { actors }
    </div>

  return <Card style={ cardStyle }>
    <CardTitle title={ title } />
    <Link to={ link }>
      <CardMedia>
        <img src={ poster } style={ { maxWidth: 370 } }/>
      </CardMedia>
    </Link>
    { actorsLine }
  </Card>
}


const cardStyle = {
  width: 370,
  marginBottom: 30
}
