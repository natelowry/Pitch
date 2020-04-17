import Ember from 'ember';
import Card from '../../card/object';

export default Ember.Component.extend({
    classNames: ['_component-card-face'],
    card: null,
    trump: null,
    isPlay: false,
    isMe: false,
    playAction: 'play',
    burnAction: 'playBurned',
    isCurrentUserPlayerPending: false,
    isAvoidOrNotTrump: Ember.computed.or('isAvoid', 'notTrump'),
    isMuted: Ember.computed.and('isAvoidOrNotTrump', 'hasAction'),
    notTrump: Ember.computed.not('isTrump'),
    hasAction: Ember.computed.and('isPlay', 'isMe', 'isCurrentUserPlayerPending'),
    isAvoid: Ember.computed('card', 'avoidCard', function() {
        return this.get('card') === this.get('avoidCard');
    }),
    avoidCard: null,
    isTrump: Ember.computed('trump', 'card', function() {
        return Card.isTrump(this.get('card'), this.get('trump'));
    }),
    actions: {
        play() {
            if (Ember.isNone(this.get('avoidCard'))) {
                return this.sendAction('playAction', this.get('card'));
            } else {
                return this.sendAction('burnAction', this.get('card'));
            }
        }
    }
});


