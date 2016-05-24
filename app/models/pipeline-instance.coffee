`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr'`
`import DS from 'ember-data'`
`import HasSerialActions from '../mixins/has-serial-actions'`

PipelineInstance = Model.extend HasSerialActions,
  title: attr('string')
  icon: attr('string')
  mdlIcon: attr('string')
  status: DS.belongsTo('status', async: true)
  repository: DS.belongsTo('repository')
  services: DS.hasMany('service')
  pushAction: ->
    Ember.run.later ( => @belongsTo('status').reload() ), 800
    @_super( arguments... ).then =>
      @belongsTo('status').reload()


`export default PipelineInstance`
