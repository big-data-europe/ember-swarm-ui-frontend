import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  model: function() {
    return this.store.findAll('repository');
  }
});
