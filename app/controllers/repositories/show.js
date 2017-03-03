import Ember from 'ember';
import Validations from 'ember-validations';

export default Ember.Controller.extend(Validations, {
  showDialog: false,
  title: Ember.computed(function() {
    return this.get('model.title');
  }),

  validations: {
    'model.title': {
      presence: true
    },
    'model.location': {
      presence: true
    }
  },
  inputRequiredTitleCssClasses: "",
  inputRequiredLocationCssClasses: "",

  isInputEmpty: function(inputFieldErrors, cssClasses) {
    if (this.get(inputFieldErrors).length > 0) {
      this.set(cssClasses, 'input-required');
      return true;
    }
    this.set(cssClasses, '');
    return false;
  },

  actions: {
    save: function() {
      //we need to do it like this
      // if i would call it in the if statement, only one would be red at the end
      var isTitleEmpty = this.isInputEmpty('errors.model.title', 'inputRequiredTitleCssClasses');
      var isLocationEmpty = this.isInputEmpty('errors.model.location', 'inputRequiredLocationCssClasses');
      if (isTitleEmpty || isLocationEmpty) {
        return;
      }

      this.get('model').save().then((function(_this) {
        return function() {
          return _this.toggleProperty("editing");
        };
      })(this));
    },
    edit: function() {
      this.set('inputRequiredTitleCssClasses', '');
      this.set('inputRequiredLocationCssClasses', '');
      this.toggleProperty("editing");
    },
    cancel: function() {
      this.get('model').rollbackAttributes();
      this.toggleProperty("editing");
      this.set('inputRequiredTitleCssClasses', '');
      this.set('inputRequiredLocationCssClasses', '');
    },
    confirmDeletion: function() {
      this.set("showDialog", true);
    },
    closeDialog: function() {
      this.set("showDialog", false);
    },
    delete: function() {
      this.get('model').deleteRecord();
      this.get('model').save();
      // TODO: popup to approve??
      this.transitionToRoute('repositories');
    }
  }
});
