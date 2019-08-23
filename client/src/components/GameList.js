import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchGames } from "../redux/gameActions";
import { postNewGame } from "../redux/gameActions";
import NewGameForm from './NewGameForm';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class GameList extends Component {
  constuctor() {
    //this.routeToNewGame = this.routeToNewGame.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.state = { page_number: 0 }
  }

  componentDidMount() {
    this.props.dispatch(fetchGames());
    window.addEventListener('hashchange', this.handleRouteChange, false);
  }

  handlePageChange(id) {
    window.location = '/games/edit/'+id;
  }

  handleRouteChange(event) {
     const destination = event.newURL;
  }

  routeToGame(id) {
    let path = '/games/'+id;
    //this.props.history.push(path);
  }

  render() {
    const { error, loading, games } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    }

    return <Container text>
      <Header as='h2' icon textAlign='center' color='teal'>
        <Icon name='unordered list' circular />
        <Header.Content>
          Ninja Report
          <br/>
          Don't see your game?
          <br/>
          <NewGameForm onNewGame={this.postNewGame} />
        </Header.Content>
      </Header>
      <Divider hidden section />
        {games.length ?
          games.map(game => (
              console.log(game),
              <Container>
                <Header as='h2'>
                  <a href={'https://www.google.com/search?q=' + game.name} target="_blank"> {game.name} </a>
                  <Link
                      to={{
                      pathname: '/games/edit/'+game.id,
                      state: { game }
                    }}>Edit
                  </Link>
                </Header>
                {game.description && <p>Description: {game.description}</p>}
                {game.servers && <p>Server(s): {game.servers}</p>}
                {game.platform && <p>Platform(s): {game.platform}</p>}
                {game.discords &&
                  <Segment.Group>
                    {game.discords.map((discord, i) => (
                        <Segment key={i}>
                          <a href={discord.link}>{discord.link}</a>
                          &nbsp; | Online: {discord.population}
                        </Segment>
                    ))}
                  </Segment.Group>
                }
                <Divider section />
              </Container>
            ))
          : <Container textAlign='center'>No games found.</Container>
        }
      <Divider section />
    </Container>
  }
}

const mapStateToProps = state => ({
  games: state.games.items,
  loading: state.games.loading,
  error: state.games.error
});

export default connect(mapStateToProps)(GameList);
