`import Ember from 'ember'`

PipelinesShowController = Ember.Controller.extend
  pipelineOp: (operation, callback) ->
    Ember.$.ajax( "/swarm/pipelines/#{@get('model.id')}/#{operation}" ).then =>
      Ember.run.next => callback()
  actions:
    swarmUp: ->
      @pipelineOp "up", -> alert("#{@get('model.title')} started up")
    swarmStop: ->
      Ember.$.ajax( "/swarm/pipelines/#{@get

`export default PipelinesShowController`
