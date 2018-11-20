import React, { Component } from 'react';
import './App.css';
import constants from './constants';
class App extends Component {
  state = {
    players: ['My Buddy', 'Pro Buddy', 'Rookie Buddy'],
    addPlayerInput: ''
  };

  handleAddPlayerOnChange = ({ target: { value } }) =>
    this.setState({ addPlayerInput: value });

  handleAddPlayerOnClick = () =>
    this.setState({
      players: [this.state.addPlayerInput, ...this.state.players],
      addPlayerInput: ''
    });

  renderPlayerList = () =>
    this.state.players.map(player => (
      <li
        data-player
        key={player}
        isPro={player.includes('Pro')}
        styles={{ fontWeight: '900' }}
      >
        {player}
      </li>
    ));

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 data-greeting id="header">
            {constants.WELCOME_TEXT}
          </h1>
          <h3 data-blurb>{constants.BLURB_TEXT}</h3>
        </div>
        <div className="card">
          {this.state.addPlayerInput.length > 0 && (
            <h4 data-add-player-styled-text>{this.state.addPlayerInput}</h4>
          )}
          <ul data-player-list>{this.renderPlayerList()}</ul>
          <div className="footer">
            <input
              data-add-player-input
              type="text"
              placeholder="Enter Player Name"
              onChange={this.handleAddPlayerOnChange}
            />
            <input
              data-add-player-button
              type="button"
              onClick={this.handleAddPlayerOnClick}
            >
              {constants.PLAYER_TEXT}
            </input>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
