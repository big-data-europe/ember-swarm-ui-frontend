import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  title: attr('string'),
  icon: attr('string'),
  restartRequested: attr('string'),
  status: DS.belongsTo('status'),
  requestedStatus: DS.belongsTo('status'),
  repository: DS.belongsTo('repository'),
  services: DS.hasMany('service'),

  restart: function() {
    this.set('restartRequested', true);
    this.save();
  },
});
