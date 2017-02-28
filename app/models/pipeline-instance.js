import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';
import HasSerialActions from '../mixins/has-serial-actions';

export default DS.Model.extend(HasSerialActions, {
  title: attr('string'),
  icon: attr('string'),
  mdlIcon: attr('string'),
  status: DS.belongsTo('status', {
    async: true
  }),
  requestedStatus: DS.belongsTo('status', {
    async: true
  }),
  repository: DS.belongsTo('repository'),
  services: DS.hasMany('service'),
  pushAction: function() {
    Ember.run.later(((function(_this) {
      return function() {
        return _this.belongsTo('status').reload();
      };
    })(this)), 800);
    return this._super.apply(this, arguments).then((function(_this) {
      return function() {
        return _this.belongsTo('status').reload();
      };
    })(this));
  }
});
