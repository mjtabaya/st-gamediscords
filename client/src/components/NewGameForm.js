import React, { Component } from 'react';
import { connect } from "react-redux";
import { postNewGame } from "../redux/gameActions";
import { Divider } from 'semantic-ui-react'
//https://stackoverflow.com/questions/53100829/how-to-make-a-post-request-using-react-redux
class NewGameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      description:'',
      servers:'',
      platform:'',
      discords: [''],
      discord: {name: '', link: '', population: ''}
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.addClick = this.addClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onChangeHandler(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChange(i, e) {
    let discords = this.state.discords;
    console.log("p discords")
    console.log(discords)
    console.log("twee")
    if(!discords[i]) discords[i] = {}
    discords[i][e.target.name] = e.target.value;
    this.setState({ discords });
  }

  addClick(e) {
    let discords = this.state.discords
    discords.push({})
    this.setState({discords: discords})
  }

  onSubmitHandler(e){
    e.preventDefault();
    console.log("clog this.state")
    console.log(this.state)
    console.log("clog this.props")
    console.log(this.props)
    this.props.dispatch(postNewGame(this.state));
  }

  render() {
    return (
        <form className="ui form" onSubmit={this.onSubmitHandler}>
          <div className="field">
            <label>
              Name:
              <input type="text" name="name" value={this.state.name} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div className="field">
            <label>
              Description:
              <input type="text" name="description" value={this.state.description} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div className="field">
            <label>
              Servers:
              <input type="text" name="servers" value={this.state.servers} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div className="field">
            <label>
              Platform:
              <input type="text" name="platform" value={this.state.platform} onChange={this.onChangeHandler} />
            </label>
          </div>
          <hr/>
          <div className="field">
            <label>
              Discords:
            </label>
          </div>
          {this.state.discords.map((discord, i) => (
            <div key={i}>
              <div className="field">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={discord.name || ""}
                    onChange={e => this.handleChange(i, e)}
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Link:
                  <input
                    type="text"
                    name="link"
                    value={discord.link || ""}
                    onChange={e => this.handleChange(i, e)}
                  />
                </label>
              </div>
              <div className="field">
                <label>
                  Population:
                  <input
                    type="number"
                    name="population"
                    value={discord.population || ""}
                    onChange={e => this.handleChange(i, e)}
                  />
                </label>
              </div>
              <hr/>
            </div>
          )
        )}
          <input type="button" className="ui center floated button" value="Add a server" onClick={(e) => this.addClick(e)} />
          <button type="submit" className="ui center floated button">Submit</button>
        </form>
    )
  }
}








export default connect(null)(NewGameForm);
