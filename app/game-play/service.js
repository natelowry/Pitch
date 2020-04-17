import Ember from 'ember';

var GamePlayService = Ember.Service.extend({
    store: Ember.inject.service(),
    isRpcExecuting: false,
    _getResult(result) {
        this.get('store').pushPayload(result);

        return this.get('store').peekRecord('gameState', result.gameState.id);
    },
    dealCards(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.dealRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    bid(gameStateId, amount, isMoon) {
        this.set('isRpcExecuting', true);
        return GamePlayService.bidRpc(gameStateId, amount, isMoon).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    pickSuit(gameStateId, suit) {
        this.set('isRpcExecuting', true);
        return GamePlayService.pickSuitRpc(gameStateId, suit).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    discard(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.discardRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    dealback(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.dealbackRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    seeKittyCard(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.seeKittyCardRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    takeKittyCard(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.takeKittyCardRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    discardKittyCard(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.discardKittyCardRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    passDeck(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.passDeckRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    play(gameStateId, card, burnedCard) {
        this.set('isRpcExecuting', true);
        return GamePlayService.playRpc(gameStateId, card, burnedCard).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    clear(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.clearRpc(gameStateId).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    updateScreenName(gameStateId, newName) {
        this.set('isRpcExecuting', true);
        return GamePlayService.updateScreenNameRpc(gameStateId, newName).then(function(result) {
            return this._getResult(result);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    forfeit(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.forfeitRpc(gameStateId).then(function() {
            return this._getResult(result);
        }).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    },
    testSignalR(gameStateId) {
        this.set('isRpcExecuting', true);
        return GamePlayService.testSignalR(gameStateId).then(function(result) {
            this.get('store').pushPayload(result);

            return this.get('store').peekRecord('gameState', result.gameState.id);
        }.bind(this)).always(function() {
            this.set('isRpcExecuting', false);
        }.bind(this));
    }
});

GamePlayService.reopenClass({
    dealRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/deal/%@'.fmt(gameStateId));
        });
    },
    bidRpc(gameStateId, bidAmount, isMoon) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/bid/%@'.fmt(gameStateId), { bidAmount: bidAmount, isMoon: isMoon });
        });        
    },
    pickSuitRpc(gameStateId, suit) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/pickSuit/%@'.fmt(gameStateId), { suit: suit });
        });        
    },
    discardRpc(gameStateId, cards) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/discard/%@'.fmt(gameStateId), { cards: cards });
        });        
    },
    dealbackRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/dealback/%@'.fmt(gameStateId));
        });        
    },
    seeKittyCardRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/seeKittyCard/%@'.fmt(gameStateId));
        });        
    },
    takeKittyCardRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/takeKittyCard/%@'.fmt(gameStateId));
        });        
    },
    discardKittyCardRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/discardKittyCard/%@'.fmt(gameStateId));
        });        
    },
    passDeckRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/passDeck/%@'.fmt(gameStateId));
        });        
    },
    playRpc(gameStateId, card, burnedCard) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/play/%@'.fmt(gameStateId), { card: card, burnedCard: burnedCard });
        });        
    },
    clearRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/clear/%@'.fmt(gameStateId));
        }); 
    },
    updateScreenNameRpc(gameStateId, newName) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/updateScreenName/%@'.fmt(gameStateId), { newName: newName });
        });
    },
    forfeitRpc(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/forfeitGame/%@'.fmt(gameStateId));
        });
    },
    testSignalR(gameStateId) {
        return Ember.run(function() {
            return Pitch.Ajax.post('/rpc-api/gamePlay/testSignalR/%@'.fmt(gameStateId));
        });
    }
});

export default GamePlayService;