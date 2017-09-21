import React from 'react'
import './App.css'
import MovieList from './MovieList'

export default function App({ children }){
  return <div>
    <h1 style={ { margin: "20px 40px" }}>IMDb 2.0</h1>
    <MovieList />
  </div>
}
