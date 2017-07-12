import Ember from 'ember';
import Validations from 'ember-validations';

export default Ember.Component.extend(Validations, {
  store: Ember.inject.service('store'),
  statusUpdateService: Ember.inject.service('status-update'),
  repositoryIcon: Ember.Object.create(),
  editing: false,

  validations: {
    'repositoryTitle': {
      presence: true
    },
    'repositoryLocation': {
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


  launchPipeline: function(repository) {
    this.get('statusUpdateService').getRequestedStatus('down').then((stat) => {
      let newPipeline = this.get('store').createRecord('pipeline-instance', {
        repository: repository,
        title: repository.get('title'),
        icon: repository.get('icon'),
        status: status
      });
      newPipeline.save();
    });
  },

  actions: {
    create: function() {
      //we need to do it like this
      // if i would call it in the if statement, only one would be red at the end
      let isTitleEmpty = this.isInputEmpty('errors.repositoryTitle', 'inputRequiredTitleCssClasses');
      let isLocationEmpty = this.isInputEmpty('errors.repositoryLocation', 'inputRequiredLocationCssClasses');
      if (isTitleEmpty || isLocationEmpty) {
        return;
      }

      let repository = this.get('store').createRecord('repository', {
        location: this.get('repositoryLocation'),
        title: this.get('repositoryTitle'),
        icon: this.get('repositoryIcon.icon'),
      });
      repository.save().then((function(_this) {
        return function() {
          _this.set('repositoryLocation', '');
          _this.set('repositoryTitle', '');
          return _this.set('repositoryIcon', Ember.Object.create());
        };
      })(this));
    },
    clear: function() {
      this.set('repositoryLocation', "");
      this.set('repositoryTitle', "");
      this.set('repositoryIcon.icon', "");
      return false;
    },
    edit: function() {
      this.toggleProperty('editing');
      return false;
    },
    launchPipeline: function(repository) {
      this.launchPipeline(repository);
      return false;
    }
  }
});
