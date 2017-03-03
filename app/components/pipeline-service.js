import Ember from 'ember';

export default Ember.Component.extend({
  showLogs: false,
  actions: {
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
