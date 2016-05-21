`import Ember from 'ember'`

PipelinesShowRoute = Ember.Route.extend
  store: Ember.inject.service('store')
  model: (params) ->
    @get('store').find('pipeline-instance', params.pipeline_id)


`export default PipelinesShowRoute`
