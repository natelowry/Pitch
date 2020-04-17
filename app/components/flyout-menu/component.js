import Ember from 'ember';
import ClickOutsideToClose from 'pitch/mixins/click-outside-to-close';

export default Ember.Component.extend(ClickOutsideToClose, {
    classNames: ['_component-flyout-menu'],
    classNameBindings: ['isCloseableActive:_show:_hide']
});
