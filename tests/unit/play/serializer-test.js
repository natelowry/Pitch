import { moduleForModel, test } from 'ember-qunit';

moduleForModel('play', 'Unit | Serializer | play', {
  // Specify the other units that are required for this test.
  needs: ['serializer:play']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
