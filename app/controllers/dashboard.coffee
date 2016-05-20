`import Ember from 'ember'`

DashboardController = Ember.Controller.extend
  store: Ember.inject.service('store')
  actions:
    create: ->
      repository = @get('store').createRecord 'repository',
        location: @get('repositoryLocation')
        title: @get('repositoryTitle')
        icon: @get('repositoryIconUrl')
        mdlIcon: @get('repositoryMdlIcon')
      repository.save().then =>
        @set 'repositoryLocation', ''
        @set 'repositoryTitle', ''
        @set 'repositoryIconUrl', ''
        @set 'repositoryMdlIcon', ''
      return


`export default DashboardController`
