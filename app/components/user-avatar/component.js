import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['_component-user-avatar'],
    currentUser: null,
    user: null,
    isMe: Ember.computed('currentUser', 'user', function() {
        return this.get('currentUser.id') === this.get('user.id');
    }),
    actions: {
        remove() {
            this.sendAction('removeAction', this.get('user'));
        }
    }
});
