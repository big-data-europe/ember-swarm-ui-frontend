`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr'`
`import DS from 'ember-data'`

PipelineInstance = Model.extend
  title: attr('string')
  icon: attr('string')
  mdlIcon: attr('string')
  repository: DS.belongsTo('repository')


`export default PipelineInstance`
