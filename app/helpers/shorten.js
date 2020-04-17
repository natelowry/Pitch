import Ember from 'ember';

export function shorten([shortenWord, maxChars, ...rest]) {

    if (Ember.isNone(shortenWord)) return '';

    if (shortenWord.length > maxChars) {
        return `${shortenWord.substr(0, maxChars -3)}...`;
    }

    return shortenWord;
}

export default Ember.Helper.helper(shorten);
