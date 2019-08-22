import React, { Component } from 'react'
import GameList from './GameList';
import logo from '../logo.svg';
import '../App.css';

class Home extends Component {
  render () {
    return  <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">st-gamediscords</h1>
      </header>
      <GameList />
    </div>
  }
}

export default Home
