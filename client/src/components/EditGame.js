import React, { Component } from 'react';
import { connect } from "react-redux";
import { postNewGame } from "../redux/gameActions";
import { fetchGame } from "../redux/gameActions";
//https://stackoverflow.com/questions/53100829/how-to-make-a-post-request-using-react-redux
class EditGame extends Component {
  constructor(props) {
    super(props)
    console.log(this.props.location.state.game)
    this.state = {
      game: this.props.location.state.game
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onSubmitHandler(e){
    e.preventDefault();
    console.log("Sieg")
    console.log(this.state)
    console.log("Zeon")
    this.props.dispatch(postNewGame(this.state));
  }

  componentDidMount() {
    this.props.dispatch(fetchGame(this.props.match.params.id));
    window.addEventListener('hashchange', this.handleRouteChange, false);
    this.setState ({ game: this.props.location.state.game })
    console.log(this.state.game)
  }

  onChangeHandler(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
        <form onSubmit={this.onSubmitHandler}>
          <label>
            {this.props.match.params.id} | Name:
            <input type="text" name="name" value={this.state.game.name} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Description:
            <input type="text" name="description" value={this.state.game.description} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Servers:
            <input type="text" name="servers" value={this.state.game.servers} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Platform:
            <input type="text" name="platform" value={this.state.game.platform} onChange={this.onChangeHandler} />
          </label>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game,
  loading: state.games.loading,
  error: state.games.error
});


export default connect(mapStateToProps)(EditGame);
