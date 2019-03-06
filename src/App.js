import React, {Component} from 'react'
import './App.css'

const teams = [
    {
        id: 1,
        name: "Birmingham Bolts",
        location: "Birmingham, Alabama",
        colors: "Purple, Yellow, Silver"
    },{
        id: 2,
        name: "Orlando Rage",
        location: "Orlando, Florida",
        colors: "Red, Navy, Gold, White"
    },{
        id: 3,
        name: "Seattle Street Sharks",
        location: "Seattle, Washington",
        colors: "Red, Gray, Blue, Black"
    }];

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            foundTeams: []
        }
    }

    undraftedPlayerList = (players) => {
        return players.map((player, index) =>
            <li data-undrafted-player key={index}>{player}</li>
        );
    };

    searchForTeam = (event) => {
        this.setState( ({
            foundTeams: teams.filter(team => event.target.value !== '' ?
                team.name.toLowerCase().includes(event.target.value.toLowerCase()) : false)
        }));
    };

    render() {

        let {foundTeams} = this.state;

        return (
            <div className="App">
                <h1>Welcome to the Fantasy Football App!</h1>
                <h3>The central source for all drafting, roster moves, and the latest player information.</h3>
                <ul>
                    {this.undraftedPlayerList([
                        "Bugs Bunny",
                        "Micky Mouse",
                        "Roger Rabbit"
                    ])}
                </ul>

                <input
                    type="text"
                    data-team-search-input
                    onChange={this.searchForTeam}
                />
                <ul data-team-search-results>
                    {foundTeams.map((team, index) => <li key={index}>{team.name} - {team.location} - Colors: {team.colors}</li>)}
                </ul>
            </div>
        )
    }
}

export default App
