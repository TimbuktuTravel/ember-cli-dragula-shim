import dragula from 'ember-cli-dragula-shim';
import { module, test } from 'qunit';

module('Unit | Utility | dragula');

test('it exports the `dragula` object', function(assert) {
  assert.ok(dragula, 'Exports library');
});

test('it does not expose a global object', function(assert) {
  assert.notOk(window.dragula);
});

