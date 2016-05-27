`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr';`
`import DS from 'ember-data'`

Service = Model.extend
  name: attr('string')
  scaling: attr('number')
  pipeline: DS.belongsTo('pipeline-instance')
  targetScaling: Ember.computed.oneWay 'scaling'
  executingScaling: false
  changingScaling: Ember.computed 'scaling', 'targetScaling', 'executingScaling', ->
    (@get('scaling') != @get('targetScaling')) or @get('executingScaling')
  executeScaling: () ->
    return if @get('targetScaling') == @get('scaling')
    @set 'executingScaling', true
    Ember.$.ajax( "/swarm/services/#{@get('id')}/scale",
      method: "POST"
      data: num: @get('targetScaling')
    ).then () =>
      @reload().then =>
        @rollbackAttributes()
        @set 'executingScaling', false
        unless @get('scaling') == @get('targetScaling')
          @performScaling( @get 'targetScaling' )
  performScaling: (scaling) ->
    @set 'targetScaling', scaling
    return if @get('executingScaling') # already running
    Ember.run.debounce this, @executeScaling, 1500
  restart: ->
    unless @get('restarting')
      @set 'restarting', true
      Ember.$.ajax( "/swarm/services/#{@get('id')}/restart",
        method: "POST"
      ).then () =>
        @set 'restarting', false
  refreshLogs: ->
    unless @get('refreshingLogs')
      @set 'refreshingLogs', true
      Ember.$.ajax( "/swarm/services/#{@get('id')}/logs" ).then (content) =>
        @set 'logs', content
        @set 'refreshingLogs', false


`export default Service`
