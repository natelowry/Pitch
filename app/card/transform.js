import DS from 'ember-data';
import Card from './object';
import Ember from 'ember';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (Ember.isNone(serialized)) {
            return null;
        }
        return Card.create(serialized);
    },
    serialize() {
        return null;
    }
});
