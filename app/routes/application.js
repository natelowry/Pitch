import Ember from 'ember';
import User from '../user/model';


export default Ember.Route.extend({
    auth: Ember.inject.service(),
    model() {
        const authToken = this.get('auth').readCookie('authToken');

        if (Ember.isEmpty(authToken)) {
            return null;
        }

        return User.getCurrentUser(authToken).then(function(result) {
            this.get('store').pushPayload(result);

            const userRecord = this.get('store').peekRecord('user', result.user.id);

            return userRecord;
        }.bind(this));
    },
    beforeModel(transition) {
        const authToken = this.get('auth').readCookie('authToken');

        if (Ember.isEmpty(authToken)) {
            if (transition.targetName !== 'login') {
                const loginController = this.controllerFor('login');
                loginController.set('previousTransition', transition);
            }
            this.transitionTo('login');
        } else {
            Pitch.EnvironmentVariables.authToken = authToken;
        }
    },
    actions: {
        logout: function() {
            this.get('auth').eraseCookie('authToken');
            const route = this;

            const signOut = function() {
                const auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function() {
                    route.replaceWith('login').then(function() {
                        route.store.unloadAll();
                        route.controllerFor('application').set('model', null);
                    });
                });
            };

            Pitch.GoogleLoginPromise.done(function() {
                Ember.run(function() {
                    if (Ember.isNone(gapi.auth2)) {
                        gapi.load('auth2', function() {
                            gapi.auth2.init().then(function() {
                                signOut();
                            });
                        });
                    } else {
                        signOut();
                    }
                });
            });
        },
        error(error) {
            if (error.status === 401) {
                this.replaceWith('access-denied');
            }
        }
    }
});
