import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: [{ toggleOption: 'to' }],
    gamePlay: Ember.inject.service(),
    hub: Ember.inject.service(),
    application: Ember.inject.controller(),
    isRpcExecuting: Ember.computed.oneWay('gamePlay.isRpcExecuting'),
    currentUser: Ember.computed.alias('application.model'),
    messages: Ember.computed.oneWay('hub.messages'),
    seat1Active: Ember.computed('hub.activePlayers.@each', function() {
        return this.get('hub.activePlayers').includes(this.get('seat1.id'));
    }),
    seat2Active: Ember.computed('hub.activePlayers.@each', function() {
        return this.get('hub.activePlayers').includes(this.get('seat2.id'));
    }),
    seat3Active: Ember.computed('hub.activePlayers.@each', function() {
        return this.get('hub.activePlayers').includes(this.get('seat3.id'));
    }),
    currentMessage: null,
    currentUserPlayer: Ember.computed('model.players.@each', 'currentUser', function() {
        return this.get('model.players').findBy('user.id', this.get('currentUser.id'));
    }),
    currentUserPlayerIsPending: Em.computed('currentUserPlayer', 'model.playerPending', function() {
        return this.get('currentUserPlayer.id') === this.get('model.playerPending.id');
    }),
    currentUserPlayerIsBidder: Ember.computed('currentUserPlayer.id', 'model.moveIsDiscard', 'model.currentDeal.bidder.id', function() {
        return !Ember.isNone(this.get('model.currentDeal')) &&
            this.get('currentUserPlayer.id') === this.get('model.currentDeal.bidder.id');
    }),
    seat1: Ember.computed('model.players.@each', 'currentUserPlayer', function() {
        return this.get('model.players')[this._getSeat(2)];
    }),
    seat2: Ember.computed('model.players.@each', 'currentUserPlayer', function() {
        return this.get('model.players')[this._getSeat(1)];
    }),
    seat3: Ember.computed('model.players.@each', 'currentUserPlayer', function() {
        return this.get('model.players')[this._getSeat(3)];
    }),
    toggleOption: 1,
    isChat: Ember.computed.equal('toggleOption', 1),
    isVideo: Ember.computed.equal('toggleOption', 2),
    isVideoChat: Ember.computed.equal('toggleOption', 3),
    _getSeat(numberFromCurrentUser) {
        const currentUserIndex = this.get('model.players').indexOf(this.get('currentUserPlayer'));

        const newIndex = currentUserIndex + numberFromCurrentUser;
        if (newIndex <= 3) {
            return newIndex;
        }

        return newIndex - 4;
    },
    actions: {
        dealCards() {
            this.get('gamePlay').dealCards(this.get('model.id'));
        },
        bid(amount, isMoon) {
            this.get('gamePlay').bid(this.get('model.id'), amount, isMoon);
        },
        pickSuit(suit) {
            this.get('gamePlay').pickSuit(this.get('model.id'), suit);
        },
        discard() {
            this.get('gamePlay').discard(this.get('model.id'));
        },
        dealback() {
            this.get('gamePlay').dealback(this.get('model.id'));
        },
        takeKittyCard() {
            this.get('gamePlay').takeKittyCard(this.get('model.id'));
        },
        seeKittyCard() {
            this.get('gamePlay').seeKittyCard(this.get('model.id'));
        },
        passDeck() {
            this.get('gamePlay').passDeck(this.get('model.id'));
        },
        discardKittyCard() {
            this.get('gamePlay').discardKittyCard(this.get('model.id'));
        },
        play(card, burnedCard) {
            this.get('gamePlay').play(this.get('model.id'), card, burnedCard);
        },
        clear() {
            this.get('gamePlay').clear(this.get('model.id'));
        },
        sendName(newName) {
            this.get('gamePlay').updateScreenName(this.get('model.id'), newName);
        },
        sendMessage(message) {
            this.get('hub').sendMessage(this.get('currentUserPlayer.displayName'), message, this.get('currentUserPlayer.id'));
        },
        setToggleOption(type) {
            this.set('toggleOption', type);
        },
        testSignalR() {
            this.get('gamePlay').testSignalR(this.get('model.id'));
        }
    }

});
