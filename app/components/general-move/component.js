import Ember from 'ember';

export default Ember.Component.extend({
    moveAction: null,
    moveText: null,
    actions: {
        move: function() {
            this.sendAction('moveAction');
        }
    }
});
