`import Ember from 'ember'`

DashboardController = Ember.Controller.extend
  store: Ember.inject.service('store')
  repositoryIcon: Ember.Object.create()
  actions:
    create: ->
      repository = @get('store').createRecord 'repository',
        location: @get('repositoryLocation')
        title: @get('repositoryTitle')
        icon: @get('repositoryIcon.icon')
        mdlIcon: @get('repositoryIcon.mdlIcon')
      repository.save().then =>
        @set 'repositoryLocation', ''
        @set 'repositoryTitle', ''
        @set 'repositoryIcon', Ember.Object.create()
      return
    launchPipeline: (repository) ->
      target = "/swarm/repositories/#{repository.id}/pipelines"
      Ember.$.ajax(target, method: "POST").then (response) =>
        @get('store').find('pipeline-instance', Ember.get(response, 'data.id')).then (pipeline) =>
          pipeline.set('title', repository.get('title'))
          pipeline.save()
      return


`export default DashboardController`
