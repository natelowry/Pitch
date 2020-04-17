import Ember from 'ember';

export default Ember.Component.extend({
    bidAmount: null,
    bidAction: 'bid',
    currentBid: null,
    isForcedBid: false,
    _minBid: 4,
    minBid: Ember.computed('currentBid', function() {
        return (this.get('currentBid') || this.get('_minBid')) + 1;
    }),
    isError: false,
    isMooning: false,
    actions: {
        bid() {
            if (this.get('bidAmount') >= this.get('minBid') && this.get('bidAmount') <= 10) {
                this.sendAction('bidAction', this.get('bidAmount'));
                this.set('currentBid', null);
            }
        },
        pass() {
            this.sendAction('bidAction');
            this.set('currentBid', null);
        },
        toggleIsMoon() {
            this.toggleProperty('isMooning');
        },
        moon() {
            this.sendAction('bidAction', null, true);
            this.set('currentBid', null);
        }
    }
});
