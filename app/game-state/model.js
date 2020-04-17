import DS from 'ember-data';
import Ember from 'ember';
import Enums from '../globals/enums';

export default DS.Model.extend({
    currentMove: DS.attr('number'),
    currentBid: DS.attr('number'),
    playerPending: DS.belongsTo('player', { async: false }),
    dealer: DS.belongsTo('player', { async: false }),
    bidder: DS.belongsTo('player', { async: false }),
    playerA: DS.belongsTo('player', { async: false }),
    playerB: DS.belongsTo('player', { async: false }),
    playerC: DS.belongsTo('player', { async: false }),
    playerD: DS.belongsTo('player', { async: false }),
    teamA: DS.belongsTo('team', { async: false }),
    teamB: DS.belongsTo('team', { async: false }),
    winningTeam: DS.belongsTo('team', { async: false }),
    currentDeal: DS.belongsTo('deal', { async: false }),
    createdOn: DS.attr('isodate'),
    updatedOn: DS.attr('isodate'),
    forfeitedBy: DS.belongsTo('player', {async: false}),
    deckCount: DS.attr('number'),
    moveIsDeal: Ember.computed.equal('currentMove', Enums.Moves.Deal),
    moveIsBid: Ember.computed.equal('currentMove', Enums.Moves.Bid),
    moveIsPickSuit: Ember.computed.equal('currentMove', Enums.Moves.PickSuit),
    moveIsDiscard: Ember.computed.equal('currentMove', Enums.Moves.Discard),
    moveIsDealBack: Ember.computed.equal('currentMove', Enums.Moves.DealBack),
    moveIsKittyCard: Ember.computed.equal('currentMove', Enums.Moves.KittyCard),
    moveIsPlay: Ember.computed.equal('currentMove', Enums.Moves.Play),
    moveIsClear: Ember.computed.equal('currentMove', Enums.Moves.Clear),
    moveIsGameOver: Ember.computed.equal('currentMove', Enums.Moves.GameOver),
    kittyCard: DS.attr('card'),
    players: Ember.computed.collect('playerA', 'playerB', 'playerC', 'playerD'),
    teams: Ember.computed.collect('teamA', 'teamB'),
    teamAPlayers: Ember.computed.filter('players', function(player) {
        return player.get('team.id') === this.get('teamA.id');
    }),
    teamBPlayers: Ember.computed.filter('players', function(player) {
        return player.get('team.id') === this.get('teamB.id');
    }),
    isRpcExecuting: false
});



