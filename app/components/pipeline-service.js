import Ember from 'ember';

export default Ember.Component.extend({
  showLogs: false,
  disableStartButton: Ember.computed('service.status', 'service.requestedStatus', function () {
    // let requestedStatusCheck = (this.get('service.requestedStatus') != 'stop') && (this.get('service.requestedStatus') != 'down');
    let statusCheck = (this.get('service.status.title') !== 'stopped') || (this.get('service.status.title') !== 'down');
    return statusCheck;
  }),
  actions: {
    decreaseServiceScaling: function() {
      if (!this.get('disableScaling')) {
        var service = this.get('service');
        let scaling = service.get('scaling');
        if (scaling > 0) {
          service.set('scaling', scaling - 1);
          service.save();
        }
      }
    },
    increaseServiceScaling: function() {
      if (!this.get('disableScaling')) {
        var service = this.get('service');
        let scaling = service.get('scaling');
        service.set('scaling', scaling + 1);
        service.save();
      }
    },
    restartService: function() {
      if (!this.get('disableScaling')) {
        var service = this.get('service');
        return service.restart();
      }
    },
    toggleLogs: function() {
      if (!this.get('disableScaling')) {
        var service = this.get('service');
        service.toggleProperty("showLogs");
        if (service.showLogs) {
          service.refreshLogs();
        }
      }
    },
    refreshLogs: function() {
      var service = this.get('service');
      return service.refreshLogs();
    }
  }
});
