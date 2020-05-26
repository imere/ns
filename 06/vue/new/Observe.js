import { Dep } from './Dep.js';

export function defineReactive (obj, key) {

  const dep = new Dep();

  let val = obj[key];

  Reflect.defineProperty(
    obj,
    key,
    {
      configurable: true,
      enumerable: true,
      get () {

        if (Dep.target) {

          dep.depend();

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

class Observer {

  constructor (obj) {

    this.value = obj;

    if (Array.isArray(obj)) {
      //
    } else {

      Object.keys(obj).forEach((k) => {

        defineReactive(
          obj,
          k
        );

      });

    }

  }

}

export function observe (obj) {

  return new Observer(obj);

}
