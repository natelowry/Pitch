import Ember from 'ember';
import Enums from '../globals/enums';

export function moveName([currentMove, ...rest]) {
    if (currentMove === Enums.Moves.Deal) {
        return "Deal";
    }
    if (currentMove === Enums.Moves.Bid) {
        return "Bid";
    }
    if (currentMove === Enums.Moves.PickSuit) {
        return "Pick the Suit";
    }
    if (currentMove === Enums.Moves.Discard) {
        return "Discard";
    }
    if (currentMove === Enums.Moves.DealBack) {
        return "Deal Back";
    }
    if (currentMove === Enums.Moves.KittyCard) {
        return "Kitty Card";
    }
    if (currentMove === Enums.Moves.Play) {
        return "Play";
    }
    if (currentMove === Enums.Moves.Clear) {
        return "Clear";
    }
    
    return null;
}

export default Ember.Helper.helper(moveName);
