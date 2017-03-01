import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    launchPipeline: function(repository) {
      this.sendAction('launchPipeline', repository);
    }
  }
});
