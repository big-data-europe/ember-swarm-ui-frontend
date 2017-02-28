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
    decreaseServiceScaling: function(service) {
      return service.performScaling(service.get('targetScaling') - 1);
    },
    increaseServiceScaling: function(service) {
      return service.performScaling(service.get('targetScaling') + 1);
    },
    restartService: function(service) {
      return service.restart();
    },
    toggleLogs: function(service) {
      service.toggleProperty("showLogs");
      if (service.showLogs) {
        service.refreshLogs();
      }
    },
    refreshLogs: function(service) {
      return service.refreshLogs();
    }
  }
});
