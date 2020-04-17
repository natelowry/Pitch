import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['_component-player-avatar'],
    classNameBindings: ['isDealer:_is-dealer', 'isActive:_is-active', 'isPlayerPending:_is-player-pending'],
    currentUserPlayer: null,
    player: null,
    playerPending: null,
    dealer: null,
    bidder: null,
    bid: null,
    isEditing: false,
    newName: null,
    isActive: false,
    sendNameAction: 'sendName',
    deal: null,
    noBid: Ember.computed.equal('player.bid', null),
    showBid: Ember.computed.not('noBid'),
    isBidder: Ember.computed('bidder.id', 'player.id', function() {
        return this.get('player.id') === this.get('bidder.id') || (!Ember.isNone(this.get('deal')) && this.get('deal.bidder.id') === this.get('player.id'));
    }),
    isDealer: Ember.computed('dealer.id', 'player.id', function() {
        return this.get('player.id') === this.get('dealer.id');
    }),
    isMe: Ember.computed('currentUserPlayer', 'player', function() {
        return this.get('currentUserPlayer.id') === this.get('player.id');
    }),
    isPlayerPending: Ember.computed('playerPending', 'player', function() {
        return this.get('playerPending.id') === this.get('player.id');
    }),
    actions: {
        toggleIsEditing() {
            this.toggleProperty('isEditing');
        },
        sendName() {
            this.sendAction('sendNameAction', this.get('newName'));
            this.toggleProperty('isEditing');
            this.set('player.screenName', this.get('newName'));
            this.set('newName', null);
        }
    }
});
