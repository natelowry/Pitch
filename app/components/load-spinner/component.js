import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['spinner'],
    classNameBindings: ['isLarge:_is-large', 'isXLarge:_is-x-large'],
    isLarge: false,
    isXLarge: false
});
