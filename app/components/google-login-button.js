import Ember from 'ember';

export default Ember.Component.extend({
    auth: Ember.inject.service(),
    googleLoginSuccessfulAction: 'googleLoginSuccessful',
    googleLoginFailureAction: 'googleLoginFailure',
    click: function() {
        this.set('auth.isLoggingIn', true);
    },
    _onGoogleLoginButtonLoaded: function() {

        var component = this;

        var onSuccess = function(googleUser) {
            component._onLoginSuccess(googleUser);
        };

        var onFailure = function() {
            component._onFail();
        };

        Pitch.GoogleLoginPromise.done(function() {
            Ember.run.scheduleOnce('afterRender', component, function() {
                gapi.signin2.render('my-signin2', {
                    'scope': 'profile email',
                    'width': 240,
                    'height': 50,
                    'longtitle': true,
                    'theme': 'dark',
                    'onsuccess': onSuccess,
                    'onfailure': onFailure
                }); 
            });
        });
    }.on('didInsertElement'),
    _onLoginSuccess(googleUser) {
        this.sendAction('googleLoginSuccessfulAction', googleUser);
    },
    _onFail() {
        this.sendAction('googleLoginFailureAction');
    }
});
