import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  text: attr('string'),
  stacks: DS.hasMany('stack', {
    inverse: 'dockerFile'
  })
});
