import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';

export default DS.Model.extend({
  title: attr('string'),
  icon: attr('string'),
  restartRequested: attr('string'),
  status: DS.belongsTo('status', {
    async: true
  }),
  requestedStatus: DS.belongsTo('status'),
  repository: DS.belongsTo('repository'),
  services: DS.hasMany('service')
});
