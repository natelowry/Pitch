import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
    coalesceFindRequests: true,
    namespace: 'rest-api',
    headers: Ember.computed(function() {
        return {
            "X-AUTH-TOKEN": Pitch.EnvironmentVariables.authToken
    };
    }).volatile()
});
