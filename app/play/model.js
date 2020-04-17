import DS from 'ember-data';

export default DS.Model.extend({
    player: DS.belongsTo('player', { async: false}),
    playedCard: DS.attr('card'),
    burnedCard: DS.attr('card'),
    playerIdentifier: Ember.computed.oneWay('player.id')
});
