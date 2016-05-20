`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr'`

PipelineInstance = Model.extend
  title: attr('string')
  icon: attr('string')
  mdlIcon: attr('string')


`export default PipelineInstance`
