`import Model from 'ember-data/model'`
`import attr from 'ember-data/attr'`

Repository = Model.extend
  location: attr('string')
  title: attr('string')
  icon: attr('string')
  mdlIcon: attr('string')


`export default Repository`
