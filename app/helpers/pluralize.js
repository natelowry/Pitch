import Ember from 'ember';

export function pluralize([count, phrase, pluralForm, ...rest]) {

    if (count === 1) {
        return phrase;
    }

    if (!Ember.isEmpty(pluralForm)) {
        return pluralForm;
    }

    return phrase + "s";
}

export default Ember.Helper.helper(pluralize);
