import Ember from 'ember';

export default Ember.Component.extend({
  showLogs: false,
  actions: {
    decreaseServiceScaling: function() {
      var service = this.get('service');
      return service.performScaling(service.get('targetScaling') - 1);
    },
    increaseServiceScaling: function() {
      var service = this.get('service');
      return service.performScaling(service.get('targetScaling') + 1);
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
