import Ember from 'ember';
import Enums from '../globals/enums';

export function suitName([suitId, ...rest]) {
    if (suitId === Enums.Suits.Diamonds) {
        return "diamonds";
    }

    if (suitId === Enums.Suits.Clubs) {
        return "clubs";
    }

    if (suitId === Enums.Suits.Spades) {
        return "spades";
    }

    if (suitId === Enums.Suits.Hearts) {
        return "hearts";
    }

    return null;
}

export default Ember.Helper.helper(suitName);
