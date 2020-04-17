import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
    attrs: {
        firstPlay: {
            serialize: false,
            deserialize: 'records'
        },
        secondPlay: {
            serialize: false,
            deserialize: 'records'
        },
        thirdPlay: {
            serialize: false,
            deserialize: 'records'
        },
        fourthPlay: {
            serialize: false,
            deserialize: 'records'
        },
    }
});
