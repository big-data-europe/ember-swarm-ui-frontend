import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  repositoryIcon: Ember.Object.create(),
  actions: {
    create: function() {
      var repository;
      repository = this.get('store').createRecord('repository', {
        location: this.get('repositoryLocation'),
        title: this.get('repositoryTitle'),
        icon: this.get('repositoryIcon.icon'),
        mdlIcon: this.get('repositoryIcon.mdlIcon')
      });
      repository.save().then((function(_this) {
        return function() {
          _this.set('repositoryLocation', '');
          _this.set('repositoryTitle', '');
          return _this.set('repositoryIcon', Ember.Object.create());
        };
      })(this));
    },
    launchPipeline: function(repository) {
      var target;
      target = "/swarm/repositories/" + repository.id + "/pipelines";
      Ember.$.ajax(target, {
        method: "POST"
      }).then((function(_this) {
        return function(response) {
          return _this.get('store').find('pipeline-instance', Ember.get(response, 'data.id')).then(function(pipeline) {
            pipeline.set('title', repository.get('title'));
            return pipeline.save();
          });
        };
      })(this));
    }
  }
});
