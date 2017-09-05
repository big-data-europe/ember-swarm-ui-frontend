import Ember from 'ember';

export default Ember.Mixin.create({
  init: function() {
    this._super();
    this.set('serialActions', Ember.A());
    return this.set('runningSerialAction', false);
  },
  actionCount: Ember.computed('serialActions', 'serialActions.[]', 'serialActions.length', function() {
    return this.get('serialActions.length');
  }),
  pushAction: function(command) {
    this.get('serialActions').pushObject(command);
    return this.runNextSerialAction();
  },
  runNextSerialAction: function() {
    var nextAction, nextLoop;
    nextLoop = (function(_this) {
      return function() {
        return Ember.run.next(function() {
          _this.get('serialActions').arrayContentWillChange(0, 1, 0);
          _this.get('serialActions').shift();
          _this.get('serialActions').arrayContentDidChange(0, 1, 0);
          _this.set('runningSerialAction', false);
          return _this.runNextSerialAction();
        });
      };
    })(this);
    if (this.canRunNextSerialAction()) {
      this.set('runningSerialAction', true);
      nextAction = this.get('serialActions.firstObject');
      return nextAction().then(nextLoop)["catch"](nextLoop);
    }
  },
  canRunNextSerialAction: function() {
    return this.get('serialActions.length') > 0 && !this.get('runningSerialAction');
  }
});
