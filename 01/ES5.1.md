# EcmaScript5.1 新增语法

浏览器兼容: es5-shim

## 严格模式

> 某些非法操作被限制

- 未声明变量的赋值

```js
function f() {
  'use strict';
  a = 3; // 隐式全局
  alert(a);
}
f(); // ReferenceError: a is not defined
```

- 不止一次对对象字面量分配相同属性

```js
function f() {
  'use strict';
  var o = {
    a: 1,
    a: 1,
  };
}
f(); // chrome此例无报错
```

- 不能用 with

```js
function f() {
  'use strict';
  var o = { o: 0 };
  with (o) {}
}
f(); // SyntaxError: Strict mode code may not include a with statement
```

- arguments 不可改参数

```js
function f(a) {
  arguments[0] = 98;
  console.log(a);
}
f(0); // 98

function f(a) {
  'use strict';
  arguments[0] = 98; // 静默失败
  console.log(a);
}
f(0); // 0
```

## 新增数组方法

```js
Array.prototype.indexOf;
Array.prototype.lastIndexOf;
Array.prototype.every;
Array.prototype.some;
Array.prototype.forEach;
Array.prototype.map;
Array.prototype.filter;
Array.prototype.reduce;
Array.prototype.reduceRight;
```

## Function.prototype.bind

> 改变`this`

## this

> 指向调用者

```js
function test() {
  alert(this.m === undefined);
}
test(); // true, 指向window
window.test(); // true, 指向window

this.m = 1000;
var o = {
  m: 500,
  test: function() {
    alert(this.m);
    return function() {
      alert(this.m);
    };
  },
};
var f = o.test(); // 500, 指o
f(); // 1000, 指window
```
