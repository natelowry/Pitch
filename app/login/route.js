import Ember from 'ember';

export default Ember.Route.extend({
    auth: Ember.inject.service(),
    beforeModel() {
        var a = true;
    },
    actions: {
        googleLoginSuccessful(googleUser) {
            const profile = googleUser.getBasicProfile();

            const route = this;

            Ember.run(function() {
                Pitch.Ajax.post('/rpc-api/users/googleAuthenticate',
                    {
                        name: profile.getName(),
                        token: googleUser.getAuthResponse().id_token,
                        email: profile.getEmail(),
                        photo: profile.getImageUrl()
                    }).then(function(result) {
                        if (result.authToken === null) {
                            route.send('googleLoginFailure');
                        } else {
                            route.get('auth').createCookie('authToken', result.authToken);

                            route.get('store').pushPayload(result);

                            const currentUser = route.get('store').findRecord('user', result.user.id);

                            route.controllerFor('application').set('model', currentUser);

                            const previousTransition = route.controller.get('previousTransition');
                            if (previousTransition) {
                                route.controller.set('previousTransition', null);
                                previousTransition.retry();
                            } else {
                                // Default back to homepage
                                route.transitionTo('games');
                            }

                            route.set('auth.isLoggingIn', false);
                        }
                    });
            });


        },
        googleLoginFailure() {
            this.controller.set('isGoogleLoginError', true);
        }
    }
});
