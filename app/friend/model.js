import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    fullName: DS.attr('string'),
    imageUrl: DS.attr('string'),
    displayImageUrl: Ember.computed('imageUrl', function() {
        return this.get('imageUrl') || '/Content/Images/avatar.png';
    }),
    displayName: Ember.computed('fullName', 'email', function() {
        return this.get('fullName') || this.get('email');
    })
});
