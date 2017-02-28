import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  location: attr('string'),
  title: attr('string'),
  icon: attr('string'),
  mdlIcon: attr('string'),
  pipelineInstances: DS.hasMany('pipeline-instance')
});
