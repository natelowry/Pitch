import Ember from 'ember';

export default Ember.Mixin.create({
    isCloseableActive: false,
    setClosedAction: null,
    _activeObserver: Ember.observer('isCloseableActive', function() {
        if (this.get('isCloseableActive')) {
            this._bindClickEvent();
        } else {
            this._unbindClickEvent();
        }
    }),
    _closeableLoaded: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            if (this.get('isCloseableActive')) {
                this._bindClickEvent();
            }
        });
    }),
    _closeableDestroyed: Ember.on('willDestroyElement', function() {
        if (this.get('isCloseableActive')) {
            this._unbindClickEvent();
        }
    }),
    _bindClickEvent() {
        Ember.run.next(this, function() {
            $(document).on('click', { _self: this }, this._onClickHandler);
        });
    },
    _onClickHandler(event) {
        const component = event.data._self;

        Ember.run.next(this, function() {
            if (!$(event.target).closest('#' + component.elementId).length) {
                component.send('setClosed');
            }
        });
    },
    _unbindClickEvent() {
        Ember.run.next(this, function() {
            $(document).off('click', this._onClickHandler);
        });
    },
    actions: {
        setClosed() {
            this.sendAction('setClosedAction');
        }
    }
});
