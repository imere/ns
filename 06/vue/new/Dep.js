let uid = 0;

export class Dep {

  constructor () {

    this.id = uid++;
    this.subs = [];

  }

  addSub (watcher) {

    console.warn('Dep:addSub');

    this.subs.push(watcher);

  }

  depend () {

    if (Dep.target) {

      console.warn('Dep:depend');

      Dep.target.addDep(this);

    }

  }

  notify () {

    console.warn('Dep:notify');

    for (const sub of this.subs) {

      sub.update();

    }

  }

  removeSub () {

    console.log(this.subs.length);

  }

}

Dep.target = null;

const stack = [];

export function pushT (t) {

  stack.push(t);
  Dep.target = t;

  console.warn(
    'Dep:push target',
    stack
  );

}

export function popT () {

  stack.pop();
  Dep.target = stack[stack.length - 1];

  console.warn(
    'Dep:pop target',
    stack
  );

}
