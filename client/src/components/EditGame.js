import React, { Component } from 'react';
import { connect } from "react-redux";
import { postNewGame } from "../redux/gameActions";
import { fetchGame } from "../redux/gameActions";
//https://stackoverflow.com/questions/53100829/how-to-make-a-post-request-using-react-redux
class EditGame extends Component {
  constructor(props) {
    super(props)
    console.log("knorr")
    console.log(this.props.location.state.message)
    console.log("liquid")
    console.log(this.state)
    console.log("seasoning")
    console.log(this.props.name)
    this.state = {
      name: props.name,
      description: props.description,
      servers: props.servers,
      platform: props.platform
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
    console.log(this.props.game)
    console.log("aloha")
    console.log(this.state.game)
    window.addEventListener('hashchange', this.handleRouteChange, false);
  }

  onChangeHandler(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
        <form onSubmit={this.onSubmitHandler}>
          <label>
            {this.props.match.params.id} | {this.state.message} Name:
            <input type="text" name="name" value={this.name} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Description:
            <input type="text" name="description" value={this.props.description} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Servers:
            <input type="text" name="servers" value={this.state.servers} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Platform:
            <input type="text" name="platform" value={"dokooo"} onChange={this.onChangeHandler} />
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
