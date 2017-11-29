/* eslint-env node */
'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-dragula-shim',

  included() {
    this._super.included.apply(this, arguments);

    let host = findHost(this);

    host.import('vendor/dragula/dragula.js', {
      using: [
        { transformation: 'amd', as: 'dragula' }
      ]
    });

    host.import('vendor/dragula/dragula.css');
  },

  treeForVendor(vendorTree) {
    const trees = [];
    const dragulaTree = funnel(path.dirname(require.resolve('dragula/dist/dragula.js')), {
      files: ['dragula.css', 'dragula.js'],
      destDir: 'dragula'
    });

    if (vendorTree !== undefined) {
      trees.push(vendorTree);
    }

    trees.push(dragulaTree);

    return merge(trees);
  }
};

/* identical to ember-cli/lib/models/addon.js's `_findHost` */
/* used instead of breaking backwards compat. w/ older versions of cli */
function findHost(addon) {
  var current = addon;
  var app;

  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));

  return app;
}
