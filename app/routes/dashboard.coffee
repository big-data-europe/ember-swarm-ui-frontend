`import Ember from 'ember'`

DashboardRoute = Ember.Route.extend
  store: Ember.inject.service('store')
  model: () ->
    Ember.RSVP.hash
      repositories: @store.findAll 'repository'
      pipelines: @store.findAll 'pipeline-instance'


`export default DashboardRoute`
