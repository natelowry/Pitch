import Ember from 'ember';
import Enums from '../../../globals/enums';

export default Ember.Route.extend({
    hub: Ember.inject.service(),
    _onRouteInit: Ember.on('init', function() {
        this.set('_audio', new Audio('/Content/Sounds/slow-spring-board.mp3'));
    }),
    _onDataPushed: Ember.observer('hub.dataPushedIndex', function() {
        switch (this.controller.get('model.currentMove')) {
            case Enums.Moves.Discard:
                this._playNotification();
                break;
            case Enums.Moves.Deal:
            case Enums.Moves.Bid:
            case Enums.Moves.PickSuit:
            case Enums.Moves.DealBack:
            case Enums.Moves.Play:
            case Enums.Moves.Clear:
            case Enums.Moves.GameOver:
                if (this.controller.get('currentUserPlayerIsPending')) {
                    this._playNotification();
                }
                break;
            case Enums.Moves.KittyCard:
                if (this.controller.get('currentUserPlayerIsPending') &&
                    this.get('_previousMove') !== this.get('model.currentMove')) {
                    this._playNotification();
                }
                break;
            default:
                break;
        }
        this.set('_previousMove', this.controller.get('model.currentMove'));
    }),
    _previousMove: null,
    _audio: null,
    _playNotification() {
        Ember.run(this, function() {
            this.get('_audio').play();
        });
    },
    setupController(controller, model) {
        this._super(controller, model);

        this.get('hub').setPlayerConnection(model.get('playerA.id'), controller.get('currentUserPlayer.id'));
        this.controllerFor('application').set('hideHeader', true);
    },
    actions: {
        willTransition() {
            this.controllerFor('application').set('hideHeader', false);
        }
    }
});
