/* eslint-env node */
'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

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
    let trees = [];

    let dragulaJsTree = funnel(path.dirname(require.resolve('dragula/dist/dragula.js')), {
      files: ['dragula.js'],
      destDir: 'dragula'
    });

    dragulaJsTree = map(dragulaJsTree, content => `if (typeof FastBoot === 'undefined') { ${content} } else { define(function() { }); }`);

    let dragulaCssTree = funnel(path.dirname(require.resolve('dragula/dist/dragula.js')), {
      files: ['dragula.css'],
      destDir: 'dragula'
    });

    if (vendorTree !== undefined) {
      trees.push(vendorTree);
    }

    trees.push(dragulaJsTree);
    trees.push(dragulaCssTree);

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
