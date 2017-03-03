import Ember from 'ember';
import Validations from 'ember-validations';

export default Ember.Component.extend(Validations, {
  store: Ember.inject.service('store'),
  repositoryIcon: Ember.Object.create(),
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
    var target;
    target = "/swarm/repositories/" + repository.id + "/pipelines";
    return Ember.$.ajax(target, {
      method: "POST"
    }).then((function(_this) {
      return function(response) {
        return _this.get('store').find('pipeline-instance', Ember.get(response, 'data.id')).then(function(pipeline) {
          pipeline.set('title', repository.get('title'));
          return pipeline.save();
        });
      };
    })(this));
  },

  actions: {
    create: function() {
      //we need to do it like this
      // if i would call it in the if statement, only one would be red at the end
      var isTitleEmpty = this.isInputEmpty('errors.repositoryTitle', 'inputRequiredTitleCssClasses');
      var isLocationEmpty = this.isInputEmpty('errors.repositoryLocation', 'inputRequiredLocationCssClasses');
      if (isTitleEmpty || isLocationEmpty) {
        return;
      }

      var repository;
      repository = this.get('store').createRecord('repository', {
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
    launchPipeline: function(repository) {
      this.launchPipeline(repository).then((function(_this) {
        return function(cretedPipeline) {
          _this.sendAction('goToPipeline', cretedPipeline.get('id'));
        };
      })(this));
    }
  }
});
