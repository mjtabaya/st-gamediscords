import React, { Component } from 'react';
import { connect } from "react-redux";
import { postNewGame } from "../redux/gameActions";
//https://stackoverflow.com/questions/53100829/how-to-make-a-post-request-using-react-redux
class NewGameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      description:'',
      servers:'',
      platform:''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmitHandler(e){
    e.preventDefault();
    console.log("Sieg")
    console.log(this.state)
    console.log("Zeon")
    this.props.dispatch(postNewGame(this.state));
  }

  render() {
    return (
        <form onSubmit={this.onSubmitHandler}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Servers:
            <input type="text" name="servers" value={this.state.servers} onChange={this.onChangeHandler} />
          </label>
          <br/>
          <label>
            Platform:
            <input type="text" name="platform" value={this.state.platform} onChange={this.onChangeHandler} />
          </label>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
    )
  }
}


export default connect(null)(NewGameForm);
