import React, { Component } from 'react';
import { connect } from "react-redux";
import { putGame } from "../redux/gameActions";
import { Segment } from 'semantic-ui-react'
//https://stackoverflow.com/questions/53100829/how-to-make-a-post-request-using-react-redux
class EditGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: this.props,
      discords: [],
      discord: {name: '', link: '', population: ''}
    }
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.addClick = this.addClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  onSubmitHandler(e){
    e.preventDefault();
    console.log(this.state)
    console.log("above is state")
    const data = {
      id: this.props.game.id,
      name: this.state.name,
      description: this.state.description,
      servers: this.state.servers,
      platform: this.state.platform,
      discords: this.props.game.discords,
      new_discords: this.state.discords
    }
    this.props.modalClose()
    /*
    console.log("fwee")
    console.log(this.state.population1)
    console.log("fwoosh")
    console.log("tushi")
    console.log(data.discords)
    */
    data.discords.forEach(function (discord, index) {
      let namevar = "name" + index
      discord.name = this.state[namevar]
      let linkvar = "link" + index
      discord.link = this.state[linkvar]
      let populationvar = "population" + index
      discord.population = this.state[populationvar]
    }.bind(this));
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

  render() {
    return (
        <form className="ui form" onSubmit={this.onSubmitHandler}>
          <div className="field">
            <label>
              Name:
              <input type="text" name="name" placeholder={this.props.game.name} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div className="field">
            <label>
              Description:
              <input type="text" name="description" placeholder={this.props.game.description} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div className="field">
            <label>
              Servers:
              <input type="text" name="servers" placeholder={this.props.game.servers} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div className="field">
            <label>
              Platform:
              <input type="text" name="platform" placeholder={this.props.game.platform} onChange={this.onChangeHandler} />
            </label>
          </div>
          Discord Communities:
          {this.props.game.discords.map((discord, i) => (
              <Segment key={i}>
                <div className="field">
                  <label>
                    Name:
                  <input type="text" name={"name"+i} placeholder={discord.name + "-" + i} onChange={this.onChangeHandler} />
                  </label>
                </div>
                <div className="field">
                  <label>
                    Link:
                  <input type="text" name={"link"+i} placeholder={discord.link + "-" + i} onChange={this.onChangeHandler} />
                  </label>
                </div>
                <div className="field">
                  <label>
                    Population:
                  <input type="number" name={"population"+i} placeholder={discord.population + "-" + i} onChange={this.onChangeHandler} />
                  </label>
                </div>
              </Segment>
          ))}
          <Segment>
            {this.state.discords.map((discord, i) => (
              <div key={i}>
              <div className="field">
                <label>
                  New Discord [{i+1}]
                </label>
              </div>
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
          </Segment>
          <button type="submit" className="ui left floated button">Submit</button>
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
