import React from 'react'
import Avatar from 'material-ui/Avatar'

export default function ActorInfo({ actor, role }) {
  return <div style={ { ...containerStyle, marginTop: 10 } }>
    <Avatar style={ itemStyle } src={ actor.photo } />
    <div style={ containerStyle }>
      <div style={ itemStyle }>{ actor.name }</div>
      <div style={ { color: 'rgba(0,0,0,0.54)', alignSelf: 'center' } }>{ role }</div>
    </div>
  </div>
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const itemStyle = {
  alignSelf: 'center'
}
