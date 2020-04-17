import Ember from 'ember';
import Enums from '../globals/enums';

var Card = Ember.Object.extend({
    suit: null,
    cardName: null,
    svgName: null
});

Card.reopenClass({
    isRed(suit) {
        return suit === Enums.Suits.Diamonds || suit === Enums.Suits.Hearts;
    },
    isBlack(suit) {
        return suit === Enums.Suits.Spades || suit === Enums.Suits.Clubs;
    },
    isTrump(card, trump) {
        if (Ember.isNone(trump)) {
            return false;
        }

        return card.get('suit') === trump || card.get('suit') === Enums.Suits.None || Card.isJick(card, trump);
    },
    isJick(card, trump) {
        if (card.get('name') === Enums.CardNames.Jack) {

            if (Card.isRed(trump)) {
                return Card.isRed(card.get('suit'));
            }
            
            if (Card.isBlack(trump)) {
                return Card.isBlack(card.get('suit'));
            }
        }

        return false;
    }
});

export default Card;
