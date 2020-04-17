import Ember from 'ember';
import RESTSerializer from 'ember-data/serializers/rest';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default RESTSerializer.extend(EmbeddedRecordsMixin, {
    keyForAttribute: function (attr) {
        return attr;
    },
    keyForRelationship: function (key, kind, method) {
        var returnVal = key;
        if (kind === "belongsTo" && method === "serialize") {
            returnVal = key + "Id";
        } else if (kind === "belongsTo" && method === "deserialize" && !this.hasDeserializeRecordsOption(key)) {
            returnVal = key + "Id";
        } else if (kind === "hasMany" && method === "deserialize" && !this.hasDeserializeRecordsOption(key)) {
            returnVal = Ember.String.singularize(key) + "Ids";
        } else if (kind === "hasMany" && method === "serialize") {
            returnVal = Ember.String.singularize(key) + "Ids";
        }

        return returnVal;
    }
});