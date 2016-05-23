`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr';`
`import DS from 'ember-data'`
`import HasSerialActions from '../mixins/has-serial-actions'`

Service = Model.extend HasSerialActions,
  name: attr('string')
  scaling: attr('number')
  pipeline: DS.belongsTo('pipeline-instance')
  performScaling: (scaling) ->
    @pushAction () =>
      new Ember.RSVP.Promise (success) =>
        Ember.$.ajax( "/swarm/services/#{@get('id')}/scale",
          method: "POST"
          data: num: @get('scaling')
        ).then () =>
          @reload().then =>
            @rollbackAttributes()
            success()


`export default Service`
