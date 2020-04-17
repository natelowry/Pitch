import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['_component-video-container'],
    width: null,
    roomId: null,
    appearUrl: Ember.computed('roomId', function() {
        return 'https://appear.in/%@'.fmt(this.get('roomId'));
    }),
    _onVideoContainerLoaded: Ember.on('didInsertElement', function() {
        Ember.run.scheduleOnce('afterRender', this, function() {
            const width = this.$().width();
            const height = this.$().height();
            this.set('width', width);
            this.set('height', height);
        });
        
    })
});
