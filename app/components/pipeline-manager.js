import Ember from 'ember';

export default Ember.Component.extend({
  infoText: `
    <strong>Pipelines</strong> & <strong>Services</strong> try to emulate the same behaviour as when working with the docker-compose commandline <br>
    A <em>Pipeline</em> ideally represents a docker-compose environment, and each <em>Service</em> represents a container executed within.

    Pipeline:
  - starting
  - up
  - stopping
  - stopped
  - down

  Service:
  - starting
  - started
  - scaling
  - stopping
  - stopped
  `,
  showDialog: false,
  showInfoDialog: false,
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
    showInfoDialog: function() {
      this.set('showInfoDialog', true);
    },
    closeInfoDialog: function() {
      this.set('showInfoDialog', false);
    },
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
