import Ember from 'ember';
import Card from '../../card/object';
import Enums from '../../globals/enums';

export default Ember.Component.extend({
    classNames: ['_component-kitty-move'],
    takeKittyCardAction: 'takeKittyCard',
    passDeckAction: 'passDeck',
    discardKittyCardAction: 'discardKittyCard',
    seeKittyCardAction: 'seeKittyCard',
    card: null,
    trump: null,
    deckCount: null,
    displayCard: Ember.computed('card', function() {
        return this.get('card') || Card.create({ suit: Enums.Suits.None, svgName: 'None' });
    }),
    hasCard: Ember.computed.notEmpty('card.name'),
    cardIsTrump: Ember.computed('card', 'trump', function() {
        return Card.isTrump(this.get('card'), this.get('trump'));
    }),
    actions: {
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
        }
    }
});
