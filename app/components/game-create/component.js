import Ember from 'ember';

export default Ember.Component.extend({
    saveAction: null,
    _onGameCreateLoaded: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
           this.$().validate({
               rules: {
                   team1Name: 'required',
                   team2Name: 'required',
                   playerBEmail: {required: true, email: true },
                   playerCEmail: {required: true, email: true },
                   playerDEmail: {required: true, email: true }
               },
               errorElement: 'small',
               errorPlacement: function() {}
           });
        });
    }),
    actions: {
        createGame() {
            if (this.$().valid()) {
                this.sendAction('saveAction');
            }
        }
    }
});
