import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import layout from '../templates/components/simple-drag';
import dragula from 'dragula';

const words = ['me', 'her', 'him', 'them', 'us', 'things'];

export default Component.extend({
  layout,

  classNames: ['container'],

  model: computed(function() {
    return words.map(word => `Swap ${word} around`);
  }),

  didInsertElement() {
    let drake = dragula([this.element]);
    set(this, 'drake', drake);
  },

  willDestroyElement() {
    let drake = get(this, 'drake');
    drake.destroy();
  }
});
