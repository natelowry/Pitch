import Ember from 'ember';
import ClickOutsideToClose from 'pitch/mixins/click-outside-to-close';

export default Ember.Component.extend(ClickOutsideToClose, {
    results: null,
    value: null,
    filterAction: null,
    showResults: Ember.computed.alias('isCloseableActive'),
    placeholder: null,
    inputName: null,
    actions: {
        handleFilterResults() {
            this.set('showResults', true);

            this.set('results', this.get('filterAction')(this.get('value')));
        },
        setClosed() {
            this.set('showResults', false);
        }
    }
});
