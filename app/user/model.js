import DS from 'ember-data';
import Ember from 'ember';

var User = DS.Model.extend({
    email: DS.attr('string'),
    fullName: DS.attr('string'),
    imageUrl: DS.attr('string'),
    isConfirmed: DS.attr('boolean'),
    displayImageUrl: Ember.computed('imageUrl', function() {
        return this.get('imageUrl') || '/Content/Images/avatar.png';
    }),
    displayName: Ember.computed('fullName', 'email', function() {
        return this.get('fullName') || this.get('email');
    })
});

User.reopenClass({
    getCurrentUser(authToken) {
        return Ember.run(function() {
            return Pitch.Ajax.get('/rpc-api/users/getCurrentUser', { token: authToken });
        });
    }
});

export default User;