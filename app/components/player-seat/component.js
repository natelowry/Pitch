import Ember from 'ember';
import Card from '../../card/object';

export default Ember.Component.extend({
    classNames: ['_component-player-seat'],
    classNameBindings: ['isMe:_is-me'],
    gameState: null,
    player: null,
    currentUserPlayer: null,
    currentCard: null,
    playAction: 'play',
    sendNameAction: 'sendName',
    playerPending: Ember.computed.oneWay('gameState.playerPending'),
    bidder: Ember.computed.oneWay('gameState.bidder'),
    dealer: Ember.computed.oneWay('gameState.dealer'),
    bid: Ember.computed.oneWay('gameState.currentBid'),
    trump: Ember.computed.oneWay('gameState.currentDeal.trump'),
    isPlay: Ember.computed.oneWay('gameState.moveIsPlay'),
    trumpCards: Ember.computed('player.hand.@each', 'trump', function() {
        return this.get('player.hand').filter(function(card) {
            return Card.isTrump(card, this.get('trump'));
        }, this);
    }),
    isPlayerFolded: Ember.computed.notEmpty('trumpCards'),
    isCurrentUserPlayerPending: Ember.computed('playerPending', 'currentUserPlayer', function() {
        return this.get('playerPending.id') === this.get('currentUserPlayer.id');
    }),
    isMe: Ember.computed('currentUserPlayer', 'player', function() {
        return this.get('currentUserPlayer.id') === this.get('player.id');
    }),
    actions: {
        play(card) {
            if (this.get('trumpCards.length') > 6) {
                this.set('currentCard', card);
            } else {
                this.sendAction('playAction', card);
                this.set('currentCard', null);
            }
        },
        playBurned(card) {
            this.sendAction('playAction', this.get('currentCard'), card);
            this.set('currentCard', null);
        },
        sendName(newName) {
            this.sendAction('sendNameAction', newName);
        }
    }
});
