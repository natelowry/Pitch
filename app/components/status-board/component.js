import Ember from 'ember';
import Enums from '../../globals/enums';

export default Ember.Component.extend({
    classNames: ['_component-status-board'],
    currentUserPlayer: null,
    gameState: null,
    dealCardsAction: 'dealCards',
    pickSuitAction: 'pickSuit',
    bidAction: 'bid',
    discardAction: 'discard',
    dealbackAction: 'dealback',
    takeKittyCardAction: 'takeKittyCard',
    seeKittyCardAction: 'seeKittyCard',
    passDeckAction: 'passDeck',
    discardKittyCardAction: 'discardKittyCard',
    clearAction: 'clear',
    currentUser: Ember.computed.oneWay('currentUserPlayer.user'),
    noCurrentBid: Ember.computed.none('gameState.currentBid'),
    isForcedBid: Ember.computed.and('gameState.moveIsBid', 'noCurrentBid', 'isCurrentUserPlayerDealer'),
    isCurrentUserPlayerDealer: Ember.computed('gameState.dealer.id', 'currentUserPlayer.id', function() {
        return this.get('currentUserPlayer.id') === this.get('gameState.dealer.id');
    }),
    currentUserIsPlayerPending: Ember.computed('gameState.playerPending', 'currentUserPlayer', function() {
        return this.get('gameState.playerPending.id') === this.get('currentUserPlayer.id');
    }),
    bidExists: Ember.computed.gt('gameState.currentMove', Enums.Moves.PickSuit),
    isMoon: false,
    teamAIsBidder: Ember.computed('gameState.currentDeal.bidder.team.id', 'gameState.teamA.id', function() {
        return this.get('gameState.currentDeal.bidder.team.id') === this.get('gameState.teamA.id');
    }),
    cardImageUrl: Ember.computed('gameState.currentDeal.trump', function() {
        const trump = this.get('gameState.currentDeal.trump');
        return `/Content/Images/Svg/Suit${trump}.svg`;
    }),
    noPlayerPending: Ember.computed.empty('gameState.playerPending'),
    currentUserHasAction: Ember.computed('currentUserIsPlayerPending', 'noPlayerPending', 'currentUserPlayer.hasDiscarded', 'gameState.currentMove', function() {
        return !this.get('gameState.moveIsGameOver') && this.get('currentUserIsPlayerPending') || (this.get('noPlayerPending') && (!this.get('currentUserPlayer.hasDiscarded') || this.get('gameState.moveIsClear')));
    }),
    actions: {
        deal() {
            this.sendAction('dealCardsAction');
        },
        bid(bid, isMoon) {
            this.sendAction('bidAction', bid, isMoon);
        },
        pickSuit(suit) {
            this.sendAction('pickSuitAction', suit);
        },
        discard() {
            this.sendAction('discardAction');
        },
        dealback() {
            this.sendAction('dealbackAction');
        },
        takeKittyCard() {
            this.sendAction('takeKittyCardAction');
        },
        seeKittyCard() {
            this.sendAction('seeKittyCardAction');
        },
        passDeck() {
            this.sendAction('passDeckAction');
        },
        discardKittyCard() {
            this.sendAction('discardKittyCardAction');
        },
        clear() {
            this.sendAction('clearAction');
        }
    }
});
