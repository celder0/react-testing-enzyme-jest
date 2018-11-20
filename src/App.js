import React, { Component } from 'react';
import './App.css';
import constants from './constants';

const UnorderedList = ({ items }) => (
  <ul>
    {items.map(({ key, value, ...props }) => (
      <li key={key} {...props}>
        {value}
      </li>
    ))}
  </ul>
);

class App extends Component {
  state = {
    players: ['My Buddy', 'Pro Buddy', 'Rookie Buddy'],
    addPlayerInput: '',
    searchTeamResults: [],
    searchTeamInput: ''
  };

  handleSearchTeamOnChange = ({ target: { value } }) =>
    this.setState({ searchTeamInput: value });

  handleSearchTeamOnClick = () =>
    this.setState({
      searchTeamResults: constants.TEAMS.filter(({ name }) =>
        name.toLowerCase().includes(this.state.searchTeamInput.toLowerCase())
      )
    });

  handleAddPlayerOnChange = ({ target: { value } }) =>
    this.setState({ addPlayerInput: value });

  handleAddPlayerOnClick = () =>
    this.setState({
      players: [this.state.addPlayerInput, ...this.state.players],
      addPlayerInput: ''
    });

  renderPlayers = () => (
    <div data-players>
      {this.state.addPlayerInput.length > 0 && (
        <h4 data-add-player-styled-text>{this.state.addPlayerInput}</h4>
      )}
      <div className="content">
        <UnorderedList
          items={this.state.players.map((player, index) => ({
            key: index,
            value: player,
            styles: { fontWeight: '900' },
            'data-is-pro': player.includes('Pro'),
            'data-player': true
          }))}
        />
      </div>
      <div className="footer">
        <input
          data-add-player-input
          type="text"
          placeholder="Enter Player Name"
          onChange={this.handleAddPlayerOnChange}
        />
        <button
          data-add-player-button
          type="button"
          onClick={this.handleAddPlayerOnClick}
        >
          {constants.ADD_PLAYER_TEXT}
        </button>
      </div>
    </div>
  );

  renderTeams = () => (
    <div className="content">
      <input
        data-team-search-input
        type="text"
        placeholder="Search for a team"
        onChange={this.handleSearchTeamOnChange}
      />
      <button data-search-team-button onClick={this.handleSearchTeamOnClick}>
        Search!
      </button>
      <UnorderedList
        items={this.state.searchTeamResults.map(team => ({
          key: team.id,
          value: `${team.name} - ${team.location} - Colors: ${team.colors}`,
          'data-team-search-result': true
        }))}
      />
    </div>
  );

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 data-greeting id="header">
            {constants.WELCOME_TEXT}
          </h1>
          <h3 data-blurb>{constants.BLURB_TEXT}</h3>
        </div>
        <div className="card-list">
          <div className="card">{this.renderPlayers()}</div>
          <div className="card">{this.renderTeams()}</div>
        </div>
      </div>
    );
  }
}

export default App;
