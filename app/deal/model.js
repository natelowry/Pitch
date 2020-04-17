import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    currentTrick: DS.belongsTo('trick', { async: false }),
    bidder: DS.belongsTo('player', { async: false }),
    currentBid: DS.attr('number'),
    trump: DS.attr('number'),
    bidIsMoon: Ember.computed.equal('currentBid', 52)
});
