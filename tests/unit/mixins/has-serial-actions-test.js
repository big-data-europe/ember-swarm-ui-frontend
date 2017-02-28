import Ember from 'ember';
import HasSerialActionsMixin from 'swarm-ui-frontend/mixins/has-serial-actions';
import { module, test } from 'qunit';

module('Unit | Mixin | has serial actions');

// Replace this with your real tests.
test('it works', function(assert) {
  let HasSerialActionsObject = Ember.Object.extend(HasSerialActionsMixin);
  let subject = HasSerialActionsObject.create();
  assert.ok(subject);
});
