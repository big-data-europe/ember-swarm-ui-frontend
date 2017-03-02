import Ember from 'ember';

export default Ember.Controller.extend({
  pipelineOp: function(operation, callback) {
    return this.get('model').pushAction((function(_this) {
      return function() {
        return new Ember.RSVP.Promise(function(success) {
          return Ember.$.ajax("/swarm/pipelines/" + (_this.get('model.id')) + "/" + operation, {
            method: "POST"
          }).then(function() {
            success();
            return typeof callback === "function" ? callback() : void 0;
          });
        });
      };
    })(this));
  },
  actions: {
    swarmUp: function() {
      return this.pipelineOp("up");
    },
    swarmStop: function() {
      return this.pipelineOp("stop");
    },
    swarmDown: function() {
      return this.pipelineOp("down");
    },
    delete: function() {
      this.get('model').deleteRecord();
      this.get('model').save();
      // TODO: popup to approve??
      this.transitionToRoute('pipelines');
    }
  }
});
