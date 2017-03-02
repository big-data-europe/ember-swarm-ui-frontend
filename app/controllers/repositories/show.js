import Ember from 'ember';

export default Ember.Controller.extend({
  title: Ember.computed(function() {
    return this.get('model.title');
  }),
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
    cancel: function() {
      this.get('model').rollbackAttributes();
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
