import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['_component-current-trick'],
    gameState: null,
    seat1: null,
    seat2: null,
    seat3: null,
    seat4: null,
    seat1Play: Ember.computed('seat1.id', 'gameState.currentDeal.currentTrick.plays.@each.playerIdentifier', function() {
        if (Ember.isEmpty(this.get('gameState.currentDeal.currentTrick.plays'))) {
            return null;
        }
        return this.get('gameState.currentDeal.currentTrick.plays').findBy('player.id', this.get('seat1.id'));
    }),
    seat2Play: Ember.computed('seat2.id', 'gameState.currentDeal.currentTrick.plays.@each.playerIdentifier', function() {
        if (Ember.isEmpty(this.get('gameState.currentDeal.currentTrick.plays'))) {
            return null;
        }

        return this.get('gameState.currentDeal.currentTrick.plays').findBy('player.id', this.get('seat2.id'));
    }),
    seat3Play: Ember.computed('seat3.id', 'gameState.currentDeal.currentTrick.plays.@each.playerIdentifier', function() {
        if (Ember.isEmpty(this.get('gameState.currentDeal.currentTrick.plays'))) {
            return null;
        }

        return this.get('gameState.currentDeal.currentTrick.plays').findBy('player.id', this.get('seat3.id'));
    }),
    seat4Play: Ember.computed('seat4.id', 'gameState.currentDeal.currentTrick.plays.@each.playerIdentifier', function() {
        if (Ember.isEmpty(this.get('gameState.currentDeal.currentTrick.plays'))) {
            return null;
        }

        return this.get('gameState.currentDeal.currentTrick.plays').findBy('player.id', this.get('seat4.id'));
    })
});
