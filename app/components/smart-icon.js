import Ember from 'ember';

export default Ember.Component.extend({
  canToggleEdit: false,
  editing: false,
  actions: {
    edit: function() {
      return this.toggleProperty("editing");
    },
    save: function() {
      return this.get('model').save().then((function(_this) {
        return function() {
          return _this.toggleProperty("editing");
        };
      })(this));
    }
  }
});
