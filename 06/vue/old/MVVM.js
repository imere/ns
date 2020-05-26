import { Compile } from './Compile.js';
import { observe } from './Observe.js';

/**
 * @param {{ data: any; el: string; }} opts
 */
export function Vue (opts) {

  observe(
    opts.data,
    this
  );

  const dom = new Compile(
    document.getElementById(opts.el),
    this
  );

  document.getElementById(opts.el).appendChild(dom);

}
