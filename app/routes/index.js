import Ember from 'ember';

export default Ember.Route.extend({
    auth: Ember.inject.service(),
    setupController(controller, model) {
        this._super(controller, model);
        this.transitionTo('games.index');
    }
});