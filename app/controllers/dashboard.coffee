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


`export default DashboardController`
