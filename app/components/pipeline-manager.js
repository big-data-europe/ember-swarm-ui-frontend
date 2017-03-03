import Ember from 'ember';

export default Ember.Component.extend({
  showDialog: false,
  store: Ember.inject.service('store'),

  changeRequestedStatus: function(operation) {
    var params = {
      filter: {
        title: operation
      }
    };
    return this.get('store').query('status', params).then((function(_this) {
      return function(statuses) {
        _this.set('model.requestedStatus', statuses.get('firstObject'));
        return _this.get('model').save();
      };
    })(this));
  },
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
      this.changeRequestedStatus("up");
      return this.pipelineOp("up");
    },
    swarmStop: function() {
      this.changeRequestedStatus("stopped");
      return this.pipelineOp("stop");
    },
    swarmDown: function() {
      this.changeRequestedStatus("down");
      return this.pipelineOp("down");
    },
    confirmDeletion: function() {
      this.set("showDialog", true);
    },
    closeDialog: function() {
      this.set("showDialog", false);
    },
    delete: function() {
      this.set("showDialog", false);
      this.get('model').deleteRecord();
      this.get('model').save();
    }
  }
});
