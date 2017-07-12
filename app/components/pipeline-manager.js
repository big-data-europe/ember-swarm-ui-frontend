import Ember from 'ember';

export default Ember.Component.extend({
  showDialog: false,
  statusUpdateService: Ember.inject.service('status-update'),
  isAdvancedMode: true,

  // Updates the status of the pipeline.
  updateStatus: function(status) {
    const pipeline = this.get('pipeline');
    return this.get('statusUpdateService').updateStatus(pipeline, status);
  },

  actions: {
    swarmUp: function() {
      return this.updateStatus('up');
    },
    swarmStop: function() {
      return this.updateStatus('stopped');
    },
    swarmDown: function() {
      return this.updateStatus('down');
    },
    swarmRestart: function() {
      return this.get('pipeline.status').then((stat) => {
        if (stat.get('title') === 'up' || stat.get('title') === 'started' || stat.get('title') === 'starting') {
          this.get('pipeline').restart();
        }
      });
    },
    confirmDeletion: function() {
      return this.set("showDialog", true);
    },
    closeDialog: function() {
      return this.set("showDialog", false);
    },
    delete: function() {
      this.set("showDialog", false);
      this.get('pipeline').deleteRecord();
      return this.get('pipeline').save();
    }
  }
});
