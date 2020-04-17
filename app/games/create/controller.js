import Ember from 'ember';

export default Ember.Controller.extend({
    application: Ember.inject.controller(),
    currentUser: Ember.computed.alias('application.model'),
    team1Name: 'Us',
    team2Name: 'Them',
    playerBEmail: null,
    playerB: null,
    playerCEmail: null,
    playerC: null,
    playerDEmail: null,
    playerD: null,
    friends: null,
    actions: {
        filterFriends(input) {

            if (Ember.isEmpty(input)) {
                return Ember.A();
            }

            return this.get('friends').filter((friend) => {
                var isSelectedAlready = friend.get('id') === this.get('playerB.id') ||
                    friend.get('id') === this.get('playerC.id') ||
                    friend.get('id') === this.get('playerD.id');

                return !isSelectedAlready && ((!Ember.isNone(friend.get('fullName')) && friend.get('fullName').toLowerCase().indexOf(input.toLowerCase()) !== -1) ||
                    friend.get('email').toLowerCase().indexOf(input.toLowerCase()) !== -1);
            });

        },
        setPlayer(propertyName, friend) {
            this.set(propertyName, friend);
            this.set(propertyName + 'Email', null);
        },
        removePlayerB() {
            this.set('playerB', null);
        },
        removePlayerC() {
            this.set('playerC', null);
        },
        removePlayerD() {
            this.set('playerD', null);
        }
    }
});
