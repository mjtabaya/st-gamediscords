import React, { Component } from 'react';
import { connect } from "react-redux";
import { putGame } from "../redux/gameActions";
//https://stackoverflow.com/questions/53100829/how-to-make-a-post-request-using-react-redux
class EditGame extends Component {
  constructor(props) {
    super(props)
    console.log("fwee")
    console.log(this.props.game)
    console.log("fwoosh")
    this.state = {
      game: this.props
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onSubmitHandler(e){
    console.log(e)
    e.preventDefault();
    console.log("Sieg")
    console.log(this.state)
    console.log("Zeon");
    const data = {
      id: this.props.game.id,
      name: this.state.name,
      description: this.state.description,
      servers: this.state.servers,
      platform: this.state.platform
    }
    console.log(data)
    this.props.dispatch(putGame(data));
  }

  /* old editgame
  componentDidMount() {
    this.props.dispatch(fetchGame(this.state.game));
    window.addEventListener('hashchange', this.handleRouteChange, false);
    console.log(this.state.game)
  }
  */

  componentDidMount() {
    window.addEventListener('hashchange', this.handleRouteChange, false);
    console.log(this.state.game)
  }

  onChangeHandler(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
        <form onSubmit={this.onSubmitHandler}>
          <label>
            {this.props.game.id} | Name:
            <input type="text" name="name" placeholder={this.props.game.name} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Description:
            <input type="text" name="description" placeholder={this.props.game.description} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Servers:
            <input type="text" name="servers" placeholder={this.props.game.servers} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Platform:
            <input type="text" name="platform" placeholder={this.props.game.platform} onChange={this.onChangeHandler} />
          </label>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    )
  }
}

const mapStateToProps = state => ({
  games: state.games.items,
  loading: state.games.loading,
  error: state.games.error
});


export default connect(mapStateToProps)(EditGame);
