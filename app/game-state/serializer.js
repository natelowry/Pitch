import ApplicationSerializer from '../serializers/application';

export default ApplicationSerializer.extend({
    attrs: {
        playerA: {
            serialize: false,
            deserialize: 'records'
        },
        playerB: {
            serialize: false,
            deserialize: 'records'
        },
        playerC: {
            serialize: false,
            deserialize: 'records'
        },
        playerD: {
            serialize: false,
            deserialize: 'records'
        },
        teamA: {
            serialize: false,
            deserialize: 'records'
        },
        teamB: {
            serialize: false,
            deserialize: 'records'
        },
        currentDeal: {
            serialize: false,
            deserialize: 'records'
        }
    }
});
