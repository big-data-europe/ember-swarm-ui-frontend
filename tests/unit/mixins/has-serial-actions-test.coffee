`import Ember from 'ember'`
`import HasSerialActionsMixin from '../../../mixins/has-serial-actions'`
`import { module, test } from 'qunit'`

module 'Unit | Mixin | has serial actions'

# Replace this with your real tests.
test 'it works', (assert) ->
  HasSerialActionsObject = Ember.Object.extend HasSerialActionsMixin
  subject = HasSerialActionsObject.create()
  assert.ok subject
