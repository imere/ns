import { popT, pushT } from './Dep.js';
import { queueWatcher } from './Batcher.js';

let id = 0;

export class Watcher {

  /**
   * @param {any} vm
   * @param {string} name
   * @param {Function} cb
   */
  constructor (vm, name, cb) {

    this.id = ++id;
    this.vm = vm;
    this.name = name;
    this.cb = cb;

    /** @type {any[]} */
    this.deps = [];
    this.depIds = new Set();

    /** @type {any[]} */
    this.newDeps = [];
    this.newDepIds = new Set();

    /**
     * @param {{ data: { [x: string]: any; }; }} o
     */
    this.getter = function getter (o) {

      return o.data[name];

    };

    this.value = this.get();

  }

  /**
   * @param {import('./Dep').Dep} dep
   */
  addDep (dep) {

    const { id } = dep;

    if (!this.newDepIds.has(id)) {

      this.newDepIds.add(id);
      this.newDeps.push(dep);

      if (!this.depIds.has(id)) {

        console.warn('Watcher:addSub');

        dep.addSub(this);

      }

    }

  }

  cleanupDeps () {

    for (const dep of this.deps) {

      if (!this.newDepIds.has(dep.id)) {

        dep.removeSub(this);

      }

    }

  }

  get () {

    pushT(this);

    let { value } = this;
    const { vm } = this;

    try {

      value = Reflect.apply(
        this.getter,
        vm,
        [vm]
      );

      console.log(
        'get',
        value
      );

    } finally {

      popT();

    }

    return value;

  }

  run () {

    const value = this.get();
    const oldValue = this.value;

    this.value = value;

    console.log(
      'run',
      value
    );


    Reflect.apply(
      this.cb,
      this.vm,
      [
        value,
        oldValue
      ]
    );

  }

  update () {

    if (this.sync) {

      this.run();

    } else {

      queueWatcher(this);

    }

  }

}
