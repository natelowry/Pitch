import Ember from 'ember';
import Enums from '../../globals/enums';

export default Ember.Component.extend({
    selectedSuit: null,
    pickSuitAction: 'pickSuit',
    isSpades: Em.computed.equal('selectedSuit', Enums.Suits.Spades),
    isHearts: Em.computed.equal('selectedSuit', Enums.Suits.Hearts),
    isClubs: Em.computed.equal('selectedSuit', Enums.Suits.Clubs),
    isDiamonds: Em.computed.equal('selectedSuit', Enums.Suits.Diamonds),
    actions: {
        pickSuit() {
            if (!Ember.isNone(this.get('selectedSuit'))) {
                this.sendAction('pickSuitAction', this.get('selectedSuit'));
            }
        },
        selectSuit(suit) {
            this.set('selectedSuit', suit);
        }
    }
});
