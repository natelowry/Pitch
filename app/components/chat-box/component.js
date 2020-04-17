import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['_component-chat-box'],
    messages: null,
    currentMessage: null,
    sendMessageAction: 'sendMessage',
    currentUserPlayer: null,
    _scrollToBottom() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            this.$('._discussion').scrollTop(this.$('._discussion')[0].scrollHeight);
        });
    },
    _onMessagesUpdated: Ember.observer('messages.length', function() {
        this._scrollToBottom();
    }),
    actions: {
        sendMessage() {
            if (!Em.isEmpty(this.get('currentMessage'))) {
                this.sendAction('sendMessageAction', this.get('currentMessage'));
                this.set('currentMessage', null);
            }
        }
    }
});
