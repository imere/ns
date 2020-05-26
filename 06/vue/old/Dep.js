export function Dep () {

  this.subs = [];

}

Dep.prototype = {
  addSub (watcher) {

    this.subs.push(watcher);

  },
  notify () {

    for (const sub of this.subs) {

      sub.update();

    }

  },
  removeSub () {

    console.log(this.subs.length);

  }
};

Dep.target = null;
