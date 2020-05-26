import { Watcher } from './Watcher.js';

export function Compile (node, vm) {

  this.$frag = this.nodeToFragment(
    node,
    vm
  );

  return this.$frag;

}

Compile.prototype = {

  /**
   * @param {{ firstChild: any; }} node
   * @param {any} vm
   */
  nodeToFragment (node, vm) {

    const _this = this;
    const frag = document.createDocumentFragment();
    let child;

    while (child = node.firstChild) {

      _this.compileElement(
        child,
        vm
      );
      frag.appendChild(child);

    }

    return frag;

  },

  compileElement (node, vm) {

    const reg = /\{\{(.*)\}\}/u;

    if (node.nodeType === 1) {

      const attrs = node.attributes;

      for (const attr of attrs) {

        if (attr.nodeName === 'v-model') {

          const name = attr.nodeValue;

          node.oninput = function oninput (ev) {

            vm.data[name] = ev.target.value;

          };

          node.value = new Watcher(
            vm,
            name,
            function fn (val) {

              node.value = val;

            }
          ).value;

        }

      }

    }

    if (node.nodeType === 3) {

      if (reg.test(node.nodeValue)) {

        const name = RegExp.$1.trim();

        node.nodeValue = new Watcher(
          vm,
          name,
          function fn (val) {

            node.nodeValue = val;

          }
        ).value;

      }

    }

  }
};
