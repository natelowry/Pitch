import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
    attrs: {
        player: {
            serialize: false,
            deserialize: 'id'
        }
    }
});
