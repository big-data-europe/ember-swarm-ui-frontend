`import Ember from 'ember'`

RepositoriesShowController = Ember.Controller.extend
  actions:
    save: () ->
      @get('model').save().then =>
        @toggleProperty("editing")
      return
    edit: () ->
      @toggleProperty("editing")
      return


`export default RepositoriesShowController`
