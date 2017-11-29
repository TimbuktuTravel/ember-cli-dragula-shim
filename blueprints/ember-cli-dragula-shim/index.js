/* eslint-env node */
module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'broccoli-funnel', target: '^2.0.1' },
      { name: 'broccoli-merge-trees', target: '^2.0.0' }
    ]);
  }
};
