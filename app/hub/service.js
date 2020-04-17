import Ember from 'ember';

export default Ember.Service.extend({
    _onHubServiceInit: Ember.on('init', function() {
        this._initSignalR();
        this.set('messages', Ember.A());
        this.set('activePlayers', Ember.A());
    }),
    store: Ember.inject.service(),
    _gamePlayHub: null,
    _scriptPromise: null,
    messages: null,
    setPlayerConnection(playerAId, currentPlayerId) {
        this.set('_playerAId', playerAId);
        this.set('_currentPlayerId', currentPlayerId);
    },
    sendMessage(name, message, playerId) {
        this.get('_gamePlayHub').server.sendChat(this.get('_playerAId'), name, message, playerId);
    },
    _addPlayer(playerId) {
        if (!this.get('activePlayers').includes(playerId)) {
            this.get('activePlayers').addObject(playerId);
        }
    },
    _removePlayer(playerId) {
        if (this.get('activePlayers').includes(playerId)) {
            this.get('activePlayers').removeObject(playerId);
        }  
    },
    activePlayers: null,
    dataPushedIndex: 0,
    _playerAId: null,
    _currentPlayerId: null,
    _dataPushed() {
        this.incrementProperty('dataPushedIndex');
    },
    _initSignalR() {
        Ember.run(this, function() {
            var scriptPromise = $.getScript('/Hub/signalr/hubs');
            this.set('_scriptPromise', scriptPromise);

            var service = this;

            scriptPromise.then(function() {
                var gamePlayHub = $.connection.gamePlayHub;

                gamePlayHub.client.broadcastMessage = function(name, message, playerId) {
                    service.get('messages').pushObject(Ember.Object.create({ name: name, message: message, playerId: playerId }));
                };

                gamePlayHub.client.pushData = function(message) {
                    var messageObject = JSON.parse(message);
                    service.get('store').pushPayload(messageObject);
                    service._dataPushed();
                }

                gamePlayHub.client.playerActive = function(playerId) {
                    service._addPlayer(playerId);
                }

                gamePlayHub.client.playerLeft = function(playerId) {
                    service._removePlayer(playerId);
                }

                gamePlayHub.client.pushPlayers = function(playerList) {
                    service.set('activePlayers', Ember.A(playerList));
                }

                gamePlayHub.connection.qs = `groupId=${service.get('_playerAId')}&playerId=${service.get('_currentPlayerId')}`;

                gamePlayHub.connection.start().done(function() {
                    service.set('_gamePlayHub', gamePlayHub);
                });
                
            });

        });
    }
});
