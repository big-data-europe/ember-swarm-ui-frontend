import Ember from 'ember';

export default Ember.Component.extend({
  showDialog: false,
  statusUpdateService: Ember.inject.service('status-update'),

  // Updates the status of the pipeline and then subsequently updates the status
  // of each one of the services in the pipeline.
  updateNestedStatus: function(status) {
    const pipeline = this.get('pipeline');
    const statusUpdateService = this.get('statusUpdateService');
    return statusUpdateService.updateStatus(pipeline, status).then(() => {
      return pipeline.get('services').then((services) => services.map((service) => statusUpdateService.updateStatus(service, status)));
    });
  },

  actions: {
    swarmUp: function() {
      this.updateNestedStatus('up');
    },
    swarmStop: function() {
      this.updateNestedStatus('stopped');
    },
    swarmDown: function() {
      this.updateNestedStatus('down');
    },
    swarmRestart: function() {
      this.get('pipeline.status').then((stat) => {
        if (stat.get('title') === 'up' || stat.get('title') === 'starting') {
          this.set("pipeline.restartRequested", true);
          return this.get('pipeline').save();
        }
      });
    },
    confirmDeletion: function() {
      this.set("showDialog", true);
    },
    closeDialog: function() {
      this.set("showDialog", false);
    },
    delete: function() {
      this.set("showDialog", false);
      this.get('pipeline').deleteRecord();
      this.get('pipeline').save();
    }
  }
});
