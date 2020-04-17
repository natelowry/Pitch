import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
    location: config.locationType,
    rootUrl: config.rootUrl
});

Router.map(function() {
  this.route('login');

  this.route('games', function() {
      this.route('create');

      this.route('game', { path: '/:game_id' }, function() {
          this.route('play');
      });
  });

  this.route('access-denied');
});

export default Router;
