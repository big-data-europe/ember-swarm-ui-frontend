import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  location: attr('string'),
  title: attr('string'),
  icon: attr('string'),
  pipelineInstances: DS.hasMany('pipeline-instance'),

  numberOfPipelines: Ember.computed('pipelineInstances','pipelineInstances.[]', function(){
    // TODO: this won't work like this as long as we don't do a proper ember.createRecord for a pipeline
    return this.get('pipelineInstances.length');
  })
});
