import Ember from 'ember';

export default Ember.Controller.extend({
    auth: Ember.inject.service(),
    hideHeader: false,
    showUserMenu: false,
    actions: {
        toggleShowUserMenu() {
            this.toggleProperty('showUserMenu');
        },
        hideUserMenu() {
            this.set('showUserMenu', false);
        },
        sendLogout() {
            this.send('logout');
        }
    }
});
