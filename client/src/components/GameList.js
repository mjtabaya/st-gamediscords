import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from "react-redux";
import { fetchGames } from "../redux/gameActions";
//import { postNewGame } from "../redux/gameActions";
import EditGame from './EditGame';
import NewGameForm from './NewGameForm';
import { Container, Header, Segment, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class GameList extends Component {
  constructor() {
    super()
    console.log("fweesh")
    this.state = {
      page_number: 0,
      showModal: false,
      game: null,
      games: null
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal (game) {
    this.setState({
      showModal: true,
      game: game
    });
  }

  handleCloseModal () { this.setState({ showModal: false });}

  componentDidMount() {
    this.props.dispatch(fetchGames());
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
              <Container>
                <Header as='h2'>
                  <a href={'https://www.google.com/search?q=' + game.name} target="_blank"> {game.name} </a>
                  <button onClick={()=>this.handleOpenModal(game)}>Edit Modal</button>
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
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
      >
        <button onClick={this.handleCloseModal}>Close Modal</button>
        <EditGame game={this.state.game} modalClose={this.handleCloseModal}/>
      </ReactModal>
    </Container>
  }
}

const mapStateToProps = state => ({
  games: state.games.items,
  loading: state.games.loading,
  error: state.games.error
});

export default connect(mapStateToProps)(GameList);
