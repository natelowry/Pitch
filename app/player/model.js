import DS from 'ember-data';

export default DS.Model.extend({
    user: DS.belongsTo('user', {async: true}),
    screenName: DS.attr('string'),
    hasDiscarded: DS.attr('boolean'),
    team: DS.belongsTo('team', { async: false }),
    displayName: Ember.computed('screenName', 'user.displayName', function() {
        return this.get('screenName') || this.get('user.displayName');
    }),
    hand: DS.attr('hand'),
    isFolded: DS.attr('boolean'),
    bid: DS.attr('number'),
    bidIsPass: Ember.computed.equal('bid', 0),
    handSortProperties: ['suit:asc', 'name:desc'],
    orderedHand: Ember.computed.sort('hand', 'handSortProperties')
});
