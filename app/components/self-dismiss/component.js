import Ember from 'ember';

export default Ember.Component.extend({
    _onSelfDismissLoaded: Em.on('didInsertElement', function() {
        Ember.run.later(this, function() {
            if (this.get('isDestroyed') || this.get('isDestroying')) return;

            this.$().fadeOut();
            this.send('notifyDismissed');
        }, 3000);
    }),
    actions: {
        notifyDismissed() {
            if (this.get('notifyDismissedAction')) {
                this.sendAction('notifyDismissedAction');
            }
        }
    }
});
