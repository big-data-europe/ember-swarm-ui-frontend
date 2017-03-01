import Ember from 'ember';

export default Ember.Controller.extend({
  basicTabsSelection: "info",
  actions: {
    changeTab: function(newTab) {
      this.set('basicTabsSelection', newTab);
    }
  }
});
