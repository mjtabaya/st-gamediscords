import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from "react-redux";
import { fetchGames } from "../redux/gameActions";
import { deleteGame } from "../redux/gameActions";
//import { postNewGame } from "../redux/gameActions";
import EditGame from './EditGame';
import NewGameForm from './NewGameForm';
import { Container, Header, Segment, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class GameList extends Component {
  constructor() {
    super()
    this.state = {
      page_number: 0,
      showModal: false,
      game: null,
      games: null
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
  }

  handleOpenModal (game) {
    this.setState({
      showModal: true,
      game: game
    });
  }

  handleCloseModal () { this.setState({ showModal: false });}

  onDeleteHandler(){
    if(window.confirm('Are you sure you want to delete?')) {
      console.log(this.state.game)
      const data = {
        id: this.state.game.id,
        name: this.state.game.name,
        description: this.state.game.description,
        servers: this.state.game.servers,
        platform: this.state.game.platform
      }
      this.handleCloseModal()
      this.props.dispatch(deleteGame(data));
    }
    else
      return null
  }

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
      <Header as='h2' icon textAlign='center' color='gray'>
        <Icon name='unordered list' circular />
        <Header.Content>
          Ninja Report
        </Header.Content>
      </Header>
      <Divider section />
      {games.length ?
        games.map(game => (
            <Container>
              <button onClick={()=>this.handleOpenModal(game)}
                className="ui button right floated"
              >Edit</button>
              <br/>
              <Header as='h2'>
                <a className="center"href={'https://www.google.com/search?q=' + game.name} target="_blank"> {game.name} </a>
              </Header>
              {game.description && <p>Description: {game.description}</p>}
              {game.servers && <p>Server(s): {game.servers}</p>}
              {game.platform && <p>Platform(s): {game.platform}</p>}
              {game.discords &&
                <Segment.Group>
                  {game.discords.map((discord, i) => (
                      <Segment key={i}>
                        {discord.name}
                        &nbsp; | <a href={discord.link}>{discord.link}</a>
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
      <Header as='h3' icon textAlign='center'>
      Don't see your game?
      </Header>
      <NewGameForm onNewGame={this.postNewGame} />

      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
      >
        <button onClick={this.handleCloseModal}
          className="ui button right floated">
          Discard Changes
        </button>
        <button onClick={this.onDeleteHandler}
          className="ui button right floated">
          Delete Entry
        </button>
        <br/><br/>
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
