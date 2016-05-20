`import Ember from 'ember'`

SmartIconComponent = Ember.Component.extend
  canToggleEdit: false
  editing: false
  actions:
    edit: ->
      @toggleProperty("editing")
    save: ->
      @get('model').save().then =>
        @toggleProperty("editing")


`export default SmartIconComponent`
