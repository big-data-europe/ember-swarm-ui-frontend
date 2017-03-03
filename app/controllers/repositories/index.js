import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToPipeline: function(id) {
      // TODO: what to do here? should I go to the pipelinesview? and somehow open the card?
      // this.transitionToRoute('pipelines.show', id);
    }
  }
});
