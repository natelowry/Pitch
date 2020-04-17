import Ember from 'ember';

export default Ember.Controller.extend({
    application: Ember.inject.controller(),
    currentUser: Ember.computed.alias('application.currentUser')
});
