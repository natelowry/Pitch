import ApplicationSerializer from './../serializers/application';

export default ApplicationSerializer.extend({
    attrs: {
        currentTrick: {
            serialize: false,
            deserialize: 'records'
        },
        bidder: {
            serialize: false,
            deserialize: 'id'
        }
    }
});
