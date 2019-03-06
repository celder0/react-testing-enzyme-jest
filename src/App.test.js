import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

describe("Landing Page", () => {
    let component;

    beforeEach(()=>{
        component = shallow(<App/>);
    });

    it("greets the user", () => {

        let welcomeElement = component.find('h1');

        expect(welcomeElement.exists()).toEqual(true);
        expect(welcomeElement.text()).toEqual('Welcome to the Fantasy Football App!');
    });

    it('lets the user know why the site exists', () => {
        let welcomeElement = component.find('h3');

        expect(welcomeElement.exists()).toEqual(true)
        expect(welcomeElement.text()).toEqual('The central source for all drafting, roster moves, and the latest player information.')
    });

    describe('undrafted players', () => {
        let undraftedPlayers;

        beforeEach(() => {
            undraftedPlayers = component.find('[data-undrafted-player]');
        });

        it('shows bugs bunny as a undrafted player', () => {
            confirmPlayerExistsInList(undraftedPlayers,  "Bugs Bunny" )
        });

        it('shows micky mouse as a undrafted player', () => {
            confirmPlayerExistsInList(undraftedPlayers,  "Micky Mouse" )
        });

        it('shows Roger Rabbit as a undrafted player', () => {
            confirmPlayerExistsInList(undraftedPlayers,  "Roger Rabbit" )
        });
    });

    describe("Searching for teams", () => {
        describe("when the team is found", () => {
            it("displays additional information about the teams", () => {
                let searchResults = searchForTeam("Birmingham Bolts");

                expect(searchResults).toContain("Birmingham Bolts - Birmingham, Alabama - Colors: Purple, Yellow, Silver")
            });

            it("displays additional information about the teams with partial match on name", () => {
                let searchResults = searchForTeam("birmingham");

                expect(searchResults).toContain("Birmingham Bolts - Birmingham, Alabama - Colors: Purple, Yellow, Silver")
            });

            it("displays multiple teams when search matches more than one team", () => {
                let searchResults = searchForTeam("s");
                expect(searchResults).toContain("Birmingham Bolts - Birmingham, Alabama - Colors: Purple, Yellow, Silver");
                expect(searchResults).toContain("Seattle Street Sharks - Seattle, Washington - Colors: Red, Gray, Blue, Black");
            });

            it("displays no search results if search is empty", ()=>{
               let searchResults = searchForTeam("");
               expect(searchResults).toBe("");
            });
        })
    })
});

function confirmPlayerExistsInList(playerList, player){
    let foundPlayer = playerList.filterWhere(n => {
        return n.text().includes(player);
    });
    expect(foundPlayer).toHaveLength(1);
}

function searchForTeam(searchTerm){
    let component = shallow(<App/>);

    let event = {
        target: {
            value: searchTerm
        }
    };

    component
        .find("[data-team-search-input]")
        .simulate("change", event);

    return component
        .find('[data-team-search-results]')
        .text();
}