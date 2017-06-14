import Ember from 'ember';

export default Ember.Component.extend({
  showDialog: false,
  store: Ember.inject.service('store'),

  // Get a given status from the DB.
  getRequestedStatus: function (status) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const params = {
        filter: {
          title: status
        }
      };
      return this.get('store').query('status', params)
              .then((statuses) => resolve(statuses.get('firstObject')))
              .catch((error) => reject(console.error(error)));
    });
  },

  // Change the requestedStatus of a model (pipeline/service).
  changeRequestedStatus: function(model, status) {
    return this.getRequestedStatus(status).then((stat) => {
      model.set('requestedStatus', stat);
      return model.save();
    });
  },

  // Update the status of a model if possible
  switchStatus: function(model, targetStatus) {
    try {
      model.get('status').then((originStatus) => {
        switch(targetStatus) {
          case 'up':
            if (originStatus.get('title') !== 'up' && originStatus.get('title') !== 'starting') {
              return this.changeRequestedStatus(model, targetStatus);
            }
          case 'stopped':
            if (originStatus.get('title') === 'up' || originStatus.get('title') === 'starting') {
              return this.changeRequestedStatus(model, targetStatus);
            }
          case 'down':
            if (originStatus.get('title') === 'up' || originStatus.get('title') === 'stopped' || originStatus.get('title') === 'starting') {
              return this.changeRequestedStatus(model, targetStatus);
            }
          default:
            throw new Error('the target status does not exist');
        }
      });
    }
    catch (err) { console.error(console.trace()) }
  },

  actions: {
    swarmUp: function() {
      return this.switchStatus(this.get('pipeline'), 'up');
    },
    swarmStop: function() {
      return this.switchStatus(this.get('pipeline'), 'stopped');
    },
    swarmDown: function() {
      return this.switchStatus(this.get('pipeline'), 'down');
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
