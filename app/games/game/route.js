import Ember from 'ember';

export default Ember.Route.extend({
    afterModel(model) {
        this._super(model);
    },
    model(params) {
        return this.get('store').findRecord('game-state', params.game_id);
    }
});
