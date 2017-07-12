import Ember from 'ember';


// Provide some operations to change the status of both Pipelines and Services according
// to a set of rules.
export default Ember.Service.extend({
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

  // Update the status of a model if possible.
  updateStatus: function(model, targetStatus) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      try {
        model.get('status').then((originStatus) => {
          if (model.constructor.modelName === 'pipeline-instance') {
            switch(targetStatus) {
              case 'up': //Target status is only up for Pipelines
                if ((originStatus === null) || (originStatus.get('title') !== 'up' && originStatus.get('title') !== 'starting')) {
                  return resolve(this.changeRequestedStatus(model, targetStatus));
                }
                break;
              case 'stopped': //Both Pipelines and Services can be stopped.
                if ((originStatus !== null) && (originStatus.get('title') === 'up' || originStatus.get('title') === 'starting') || originStatus.get('title') === 'started') {
                  return resolve(this.changeRequestedStatus(model, targetStatus));
                }
                break;
              case 'down':
                if ((originStatus) && (originStatus.get('title') === 'up' || originStatus.get('title') === 'stopped' || originStatus.get('title') === 'starting') || originStatus.get('title') === 'started') {
                  return resolve(this.changeRequestedStatus(model, targetStatus));
                }
                break;
              default:
                throw new Error('the target status for pipelines does not exist');
            }
          }
          else if (model.constructor.modelName === 'service') {
            switch(targetStatus) {
              case 'up':
                if ((originStatus === null) || (originStatus.get('title') !== 'up' && originStatus.get('title') !== 'starting')) {
                  return resolve(this.changeRequestedStatus(model, targetStatus));
                }
                break;
              case 'started': //Target status is only started for Services
                if ((originStatus === null) || (originStatus.get('title') !== 'started' && originStatus.get('title') !== 'starting')) {
                  return resolve(this.changeRequestedStatus(model, targetStatus));
                }
                break;
              case 'stopped': //Both Pipelines and Services can be stopped.
                if ((originStatus !== null) && (originStatus.get('title') === 'started' || originStatus.get('title') === 'starting')) {
                  return resolve(this.changeRequestedStatus(model, targetStatus));
                }
                break;
              default:
                throw new Error('the target status for services does not exist');
            }


          }
          else {
            throw new Error('no functionality implemented to change status for this model');
          }
        });
      }
      catch (err) { reject(console.error(console.trace())); }
    });
  }
});
