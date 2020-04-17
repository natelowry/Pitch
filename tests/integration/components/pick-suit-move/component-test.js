import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pick-suit-move', 'Integration | Component | pick suit move', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{pick-suit-move}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#pick-suit-move}}
      template block text
    {{/pick-suit-move}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
