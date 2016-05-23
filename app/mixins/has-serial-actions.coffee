`import Ember from 'ember'`

HasSerialActionsMixin = Ember.Mixin.create
  init: ->
    @_super()
    @set('serialActions', Ember.A())
    @set('runningSerialAction', false)
  actionCount: Ember.computed 'serialActions', 'serialActions.[]', 'serialActions.length', ->
    @get('serialActions.length')
  pushAction: (command) ->
    @get('serialActions').pushObject command
    @runNextSerialAction()
  runNextSerialAction: ->
    nextLoop = => Ember.run.next =>
      @get('serialActions').arrayContentWillChange(0,1,0)
      @get('serialActions').shift()
      @get('serialActions').arrayContentDidChange(0,1,0)
      @set('runningSerialAction', false)
      @runNextSerialAction()
    if @canRunNextSerialAction()
      @set 'runningSerialAction', true
      nextAction = @get('serialActions.firstObject')
      nextAction().then( nextLoop ).catch( nextLoop )
  canRunNextSerialAction: ->
    @get('serialActions.length') > 0 and not @get('runningSerialAction')


`export default HasSerialActionsMixin`
