import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service('store'),
  model: function(params) {
    return this.get('store').find('pipeline-instance', params.pipeline_id);
  }
});
