import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('pipelines', function() {
    this.route('show', {
      path: ':pipeline_id'
    });
  });
  this.route('repositories', function() {
    this.route('show', {
      path: ':repository_id'
    });
  });
});

export default Router;
