import { Compile } from './Compile.js';
import { observe } from './Observe.js';

/**
 * @param {{ data: any; el: string; }} opts
 */
export class Vue {

  constructor (opts) {

    this.el = opts.el;
    this.data = opts.data;

    observe(opts.data);

    const dom = new Compile(
      document.getElementById(opts.el),
      this
    );

    document.getElementById(opts.el).appendChild(dom);

    window.vm = this;

  }

}
