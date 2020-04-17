import Ember from 'ember';
import ClickOutsideToCloseMixin from 'pitch/mixins/click-outside-to-close';
import { module, test } from 'qunit';

module('Unit | Mixin | click outside to close');

// Replace this with your real tests.
test('it works', function(assert) {
  let ClickOutsideToCloseObject = Ember.Object.extend(ClickOutsideToCloseMixin);
  let subject = ClickOutsideToCloseObject.create();
  assert.ok(subject);
});
