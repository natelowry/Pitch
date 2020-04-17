import Ember from 'ember';

export default Ember.Service.extend({
    isLoggingIn: false,
    getAuthToken() {
        return this.readCooke('authToken');
    },
    createCookie(name, value, days) {
        var expires;
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=${date.toGMTString()}';
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
        Pitch.EnvironmentVariables.authToken = value;
    },
    readCookie(name) {
        const nameEq = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
        }
        return null;
    },
    eraseCookie(name) {
        this.createCookie(name, "", -1);
    }
});
