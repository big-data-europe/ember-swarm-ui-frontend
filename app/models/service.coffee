`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr';`
`import DS from 'ember-data'`

Service = Model.extend
  name: attr('string')
  scaling: attr('number')
  pipeline: DS.belongsTo('pipeline-instance')

`export default Service`
