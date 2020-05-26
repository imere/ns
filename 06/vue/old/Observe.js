import { Dep } from './Dep.js';

function defineReactive (vm, key, val) {

  const dep = new Dep();

  Reflect.defineProperty(
    vm,
    key,
    {
      configurable: true,
      enumerable: true,
      get () {

        if (Dep.target) {

          dep.addSub(Dep.target);

        }

        return val;

      },
      set (newVal) {

        if (val === newVal) {

          return;

        }
        val = newVal;
        dep.notify();

      }
    }
  );

}

export function observe (obj, vm) {

  Object.keys(obj).forEach((k) => {

    defineReactive(
      vm,
      k,
      obj[k]
    );

  });

}
