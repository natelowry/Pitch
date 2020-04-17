import DS from 'ember-data';
import Ember from 'ember';
import Card from '../card/object';

export default DS.Transform.extend({
    deserialize(serializedArray) {
        if (Ember.isEmpty(serializedArray)) {
            return Ember.A();
        }

        return serializedArray.map(function(card) {
            return Card.create(card);
        });
    },

    serialize() {
        return null;
    }
});
