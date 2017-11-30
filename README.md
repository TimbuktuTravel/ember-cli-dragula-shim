# ember-cli-dragula-shim

This ember-cli addon simplifies integration of the dragula drag-n-drop library with ember-cli apps.

## Demo site

Check out examples at https://smashweaver.github.io/ember-cli-dragula-shim/

## Installation

```
ember install ember-cli-dragula-shim
```

## Usage

```
import Component from '@ember/component';
import layout from '../templates/components/simple-drag';
import dragula from 'dragula';
import { get, set } from '@ember/object';

export default Component.extend({
  layout,

  didInsertElement() {
    let drake = dragula([this.element]);
    set(this, 'drake', drake);
  },

  willDestroyElement() {
    let drake = get(this, 'drake');
    drake.destroy();
  }
});
```

## API

See [bevacqua/dragula](https://github.com/bevacqua/dragula) for details.
