`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr'`
`import DS from 'ember-data'`
`import HasSerialActions from '../mixins/has-serial-actions'`

PipelineInstance = Model.extend HasSerialActions,
  title: attr('string')
  icon: attr('string')
  mdlIcon: attr('string')
  repository: DS.belongsTo('repository')
  services: DS.hasMany('service')


`export default PipelineInstance`
