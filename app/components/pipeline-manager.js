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

  actions: {
    swarmUp: function() {
      this.changeRequestedStatus("up");
    },
    swarmStop: function() {
      this.changeRequestedStatus("stopped");
    },
    swarmDown: function() {
      this.changeRequestedStatus("down");
    },
    swarmRestart: function() {
      this.set("model.restartRequested", true);
      this.get('model').save();
      return false;
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
