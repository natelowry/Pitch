import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['_message'],
    classNameBindings: ['isMe:_is-me'],
    message: null,
    tagName: 'li',
    currentUserPlayer: null,
    isMe: Ember.computed('currentUserPlayer', 'message.playerId', function() {
        return this.get('currentUserPlayer.id') === this.get('message.playerId');
    })

});
