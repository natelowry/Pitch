import DS from 'ember-data';

export default DS.Model.extend({
    firstPlay: DS.belongsTo('play', { async: false }),
    secondPlay: DS.belongsTo('play', { async: false }),
    thirdPlay: DS.belongsTo('play', { async: false }),
    fourthPlay: DS.belongsTo('play', { async: false }), 
    allPlays: Ember.computed.collect('firstPlay', 'secondPlay', 'thirdPlay', 'fourthPlay'),
    plays: Ember.computed.filter('allPlays', function(play) {
        return !Ember.isNone(play);
    })
});
