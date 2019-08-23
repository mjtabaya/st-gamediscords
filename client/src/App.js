import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './NotFound'
import NewGameForm from './components/NewGameForm'
import EditGame from './components/EditGame'

class App extends Component {
  render () {
    return <Router>
      <Switch>
        <Route path='/' exact component={Home} />
        //<Route path='/newgame' exact component={NewGameForm} />
        <Route path="/games/edit/:id" component={EditGame}/>
        <Route component={NotFound} />
      </Switch>
    </Router>
  }
}

export default App
