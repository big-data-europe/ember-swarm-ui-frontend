import Ember from 'ember';

export default Ember.Component.extend({
  editing: false,
  isHttpIcon: Ember.computed('model.icon', function() {
    if (this.get('model.icon').indexOf(':') >= 0) {
      return true;
    }
    return false;
  }),
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
