import Ember from 'ember';

var GamesCreateRoute = Ember.Route.extend({
    setupController(controller, model) {
        this._super(controller, model);

        controller.set('friends', this.get('store').findAll('friend'));
    },
    actions: {
        createGame() {

            const playerBUserId = this.controller.get('playerB.id');
            const playerBEmail = Ember.isNone(playerBUserId) ? this.controller.get('playerBEmail') : null;
            const playerCUserId = this.controller.get('playerC.id');
            const playerCEmail = Ember.isNone(playerCUserId) ? this.controller.get('playerCEmail') : null;
            const playerDUserId = this.controller.get('playerD.id');
            const playerDEmail = Ember.isNone(playerDUserId) ? this.controller.get('playerDEmail') : null;

            const team1Name = this.controller.get('team1Name');
            const team2Name = this.controller.get('team2Name');

            GamesCreateRoute.createGame(playerBEmail, playerBUserId, playerCEmail, playerCUserId, playerDEmail, playerDUserId, team1Name, team2Name).then(function(result) {
                this.get('store').pushPayload(result);

                var game = this.get('store').peekRecord('gameState', result.gameState.id);
                this.transitionTo('games.game.play', game);
            }.bind(this));
        }
    }
});

GamesCreateRoute.reopenClass({
    createGame(playerBEmail, playerBUserId, playerCEmail, playerCUserId, playerDEmail, playerDUserId, team1Name, team2Name) {
        return Em.run(function() {
            return Pitch.Ajax.post('/rpc-api/games/createGame',
            {
                playerBEmail: playerBEmail,
                playerBUserId: playerBUserId,
                playerCEmail: playerCEmail,
                playerCUserId: playerCUserId,
                playerDEmail: playerDEmail,
                playerDUserId: playerDUserId,
                team1Name: team1Name,
                team2Name: team2Name
            });
        });
    }
});

export default GamesCreateRoute;