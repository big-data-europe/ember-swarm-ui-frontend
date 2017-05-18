import Ember from 'ember';

export default Ember.Component.extend({
  showLogs: false,
  actions: {
    decreaseServiceScaling: function() {
      var service = this.get('service');
      let scaling = service.get('scaling');
      if (scaling > 0) {
        service.set('scaling', scaling - 1);
        service.save();
      }
    },
    increaseServiceScaling: function() {
      var service = this.get('service');
      let scaling = service.get('scaling');
      service.set('scaling', scaling + 1);
      service.save();
    },
    restartService: function() {
      var service = this.get('service');
      return service.restart();
    },
    toggleLogs: function() {
      var service = this.get('service');
      service.toggleProperty("showLogs");
      if (service.showLogs) {
        service.refreshLogs();
      }
    },
    refreshLogs: function() {
      var service = this.get('service');
      return service.refreshLogs();
    }
  }
});
