import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchGames } from "../redux/gameActions";

class GameList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchGames());
  }
  render() {
    const { error, loading, games } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div className="GameList-container">
          <ul>
            {this.props.games.map(game => (
              <li key={game.id}>
                 {game.name} servers:
                 {
                      game.discords.map(discord => {
                              return discord.link
                      })
                 }
              </li>
            ))}
          </ul>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.games.items,
  loading: state.games.loading,
  error: state.games.error
});

export default connect(mapStateToProps)(GameList);
