`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr'`
`import DS from 'ember-data'`

Repository = Model.extend
  location: attr('string')
  title: attr('string')
  icon: attr('string')
  mdlIcon: attr('string')
  pipelineInstances: DS.hasMany('pipeline-instance')


`export default Repository`
