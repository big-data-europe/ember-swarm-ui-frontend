import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      this.get('model').save().then((function(_this) {
        return function() {
          return _this.toggleProperty("editing");
        };
      })(this));
    },
    edit: function() {
      this.toggleProperty("editing");
    },
    delete: function() {
      this.get('model').deleteRecord();
      this.get('model').save();
      // TODO: popup to approve??
      this.transitionToRoute('repositories');
    }
  }
});
