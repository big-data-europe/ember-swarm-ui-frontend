import DS from 'ember-data';
import attr from 'ember-data/attr';
import Ember from 'ember';

export default DS.Model.extend({
  name: attr('string'),
  scaling: attr('number'),
  restartRequested: attr('string'),
  pipeline: DS.belongsTo('pipeline-instance'),

  targetScaling: Ember.computed.oneWay('scaling'),
  executingScaling: false,
  changingScaling: Ember.computed('scaling', 'targetScaling', 'executingScaling', function() {
    return (this.get('scaling') !== this.get('targetScaling')) || this.get('executingScaling');
  }),
  executeScaling: function() {
    if (this.get('targetScaling') === this.get('scaling')) {
      return;
    }
    this.set('executingScaling', true);
    return Ember.$.ajax("/swarm/services/" + (this.get('id')) + "/scale", {
      method: "POST",
      data: {
        num: this.get('targetScaling')
      }
    }).then((function(_this) {
      return function() {
        return _this.reload().then(function() {
          _this.rollbackAttributes();
          _this.set('executingScaling', false);
          if (_this.get('scaling') !== _this.get('targetScaling')) {
            return _this.performScaling(_this.get('targetScaling'));
          }
        });
      };
    })(this));
  },
  performScaling: function(scaling) {
    this.set('targetScaling', scaling);
    if (this.get('executingScaling')) {
      return;
    }
    return Ember.run.debounce(this, this.executeScaling, 1500);
  },
  restart: function() {
    this.set('restartRequested', true);
    this.save();
    // TODO: do we need the rest of this function?

    if (!this.get('restarting')) {
      this.set('restarting', true);
      return Ember.$.ajax("/swarm/services/" + (this.get('id')) + "/restart", {
        method: "POST"
      }).then((function(_this) {
        return function() {
          return _this.set('restarting', false);
        };
      })(this));
    }
  },
  refreshLogs: function() {
    if (!this.get('refreshingLogs')) {
      this.set('refreshingLogs', true);
      return Ember.$.ajax("/swarm/services/" + (this.get('id')) + "/logs").then((function(_this) {
        return function(content) {
          _this.set('logs', content);
          return _this.set('refreshingLogs', false);
        };
      })(this));
    }
  }

});
