import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToPipeline: function(id) {
      this.transitionToRoute('pipelines.show', id);
    }
  }
});
