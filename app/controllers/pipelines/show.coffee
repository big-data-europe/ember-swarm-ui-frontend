`import Ember from 'ember'`

PipelinesShowController = Ember.Controller.extend
  pipelineOp: (operation, callback) ->
    @get('model').pushAction =>
      new Ember.RSVP.Promise (success) =>
        Ember.$.ajax( "/swarm/pipelines/#{@get('model.id')}/#{operation}"
          method: "POST"
        ).then ->
          success()
          callback?()
  actions:
    swarmUp: ->
      @pipelineOp "up"
    swarmStop: ->
      @pipelineOp "stop"
    swarmDown: ->
      @pipelineOp "down"
    decreaseServiceScaling: (service) ->
      service.performScaling( service.get('targetScaling') - 1 )
    increaseServiceScaling: (service) ->
      service.performScaling( service.get('targetScaling') + 1 )
    restartService: (service) ->
      service.restart()
    toggleLogs: (service) ->
      service.toggleProperty "showLogs"
      service.refreshLogs() if service.showLogs
      return
    refreshLogs: (service) ->
      service.refreshLogs()


`export default PipelinesShowController`
