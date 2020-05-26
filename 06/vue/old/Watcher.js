import { Batcher } from './Batcher.js';
import { Dep } from './Dep.js';

let batcher = null,
  id = 0;

/**
 * @param {any} vm
 * @param {any} node
 * @param {string} name
 * @param {string} type
 */
export function Watcher (vm, node, name, type) {

  Dep.target = this;
  this.id = ++id;
  this.vm = vm;
  this.node = node;
  this.name = name;
  this.type = type;
  this.update();
  Dep.target = null;

}

Watcher.prototype = {
  cb () {

    console.log(this.value);

    this.node[this.type] = this.value;

  },
  get () {

    this.value = this.vm[this.name];

  },
  update () {

    this.get();

    if (!batcher) {

      batcher = new Batcher();

    }
    batcher.push(this);

  }
};
