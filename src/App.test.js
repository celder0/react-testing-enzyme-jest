import React from 'react';
import { mount, shallow } from 'enzyme';

import App from './App';
import constants from './constants';
import { escapeComponent } from 'uri-js';

describe('Landing page', () => {
  let app;

  beforeEach(() => {
    app = mount(<App />);
  });

  describe('the title', () => {
    it('shows a greeting to the user', () => {
      const greeting = app.find('#header[data-greeting]');
      expect(greeting.exists()).toBeTruthy();
      expect(greeting.text()).toBe(constants.WELCOME_TEXT);
    });

    it("shows a description of the site's purpose", () => {
      const blurb = app.find('[data-blurb]');
      expect(blurb.exists()).toBeTruthy();
      expect(blurb.text()).toBe(constants.BLURB_TEXT);
    });
  });

  describe('a list of players', () => {
    const draftablePlayers = ['My Buddy', 'Pro Buddy', 'Rookie Buddy'];

    it('exists', () => {
      const playersList = app.find('.card ul');
      expect(playersList.exists()).toBeTruthy();
    });

    it('has names that are in the list of available players', () => {
      const players = app.find('li[data-player]');
      expect(players).toHaveLength(draftablePlayers.length);
      expect(draftablePlayers).toMatchObject(
        players.map(player => player.text())
      );
    });

    it('has Pro players emphasized', () => {
      const proPlayer = app
        .find('[data-player]')
        .findWhere(el => el.props()['data-is-pro']);
      expect(proPlayer).toHaveLength(1);
      expect(proPlayer.props().styles).toMatchObject({
        fontWeight: expect.any(String)
      });
    });
  });

  describe('a way to add players', () => {
    it('shows a button that adds a player when clicked', () => {
      const addPlayerButton = app.find('[data-add-player-button]');
      expect(addPlayerButton.exists()).toBeTruthy();

      addPlayerButton.simulate('click');

      const players = app.find('[data-player]');
      expect(players).toHaveLength(4);
    });

    it('when typing into the box, it shows it in the list', () => {
      const addPlayerInput = app.find('[data-add-player-input]');
      expect(addPlayerInput.exists()).toBeTruthy();

      const event = {
        target: {
          value: 'Newest Buddy'
        }
      };
      addPlayerInput.simulate('change', event);
      const styledText = app.find('[data-add-player-styled-text]');
      expect(styledText.text()).toEqual('Newest Buddy');
    });
  });

  describe('shows a list of searchable teams', () => {
    const teams = [
      {
        id: 1,
        name: 'Birmingham Bolts',
        location: 'Birmingham, Alabama',
        colors: 'Purple, Yellow, Silver'
      },
      {
        id: 2,
        name: 'Orlando Rage',
        location: 'Orlando, Florida',
        colors: 'Red, Navy, Gold, White'
      },
      {
        id: 3,
        name: 'Seattle Street Sharks',
        location: 'Seattle, Washington',
        colors: 'Red, Gray, Blue, Black'
      }
    ];

    describe('when a team is found', () => {
      it('shows additional info about the team', () => {
        const searchTeamInput = app.find('[data-team-search-input]');
        expect(searchTeamInput.exists()).toBeTruthy();

        const event = {
          target: {
            value: 'Birmingham Bolts'
          }
        };
        searchTeamInput.simulate('change', event);

        const searchTeamButton = app.find('[data-search-team-button]');
        expect(searchTeamButton.exists()).toBeTruthy();

        searchTeamButton.simulate('click');

        const teamFound = app.find('[data-team-search-result]');
        expect(teamFound).toHaveLength(1);
        expect(teamFound.text()).toBe(
          'Birmingham Bolts - Birmingham, Alabama - Colors: Purple, Yellow, Silver'
        );
      });
    });
  });
});
