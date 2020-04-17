import Ember from 'ember';

export default Ember.Controller.extend({
    gamePlay: Ember.inject.service(),
    queryParams: ['status'],
    status: 1,
    statusIsActive: Ember.computed.equal('status', 1),
    statusIsGameOver: Ember.computed.not('statusIsAll'),
    gameSortProperties: ['updatedOn:desc', 'id:desc'],
    orderedGames: Ember.computed.sort('model', 'gameSortProperties'),
    displayGames: Ember.computed('status', 'orderedGames.@each.moveIsGameOver', function() {
        if (this.get('status') === 1) {
            return this.get('orderedGames').filterBy('moveIsGameOver', false);
        } else {
            return this.get('orderedGames').filterBy('moveIsGameOver', true);
        }
    }),
    application: Ember.inject.controller(),
    currentUser: Ember.computed.alias('application.currentUser'),
    actions: {
        setStatus(status) {
            this.set('status', status);
        },
        forfeitGame(gameStateId) {
            var game = this.get('displayGames').findBy('id', gameStateId);
            game.set('isRpcExecuting', true);
            this.get('gamePlay').forfeit(gameStateId).then(function() {
                game.set('isRpcExecuting', false);
            });
        }
    }
});
