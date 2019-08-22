import React, { Component } from 'react'
import GameList from './GameList';
import '../App.css';

class Home extends Component {
  render () {
    return  <div className="App">
        <h1 className="App-title">st-gamediscords</h1>
      <GameList />
    </div>
  }
}

export default Home
