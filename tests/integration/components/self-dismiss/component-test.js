import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('self-dismiss', 'Integration | Component | self dismiss', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{self-dismiss}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#self-dismiss}}
      template block text
    {{/self-dismiss}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
