# JavaScript 语言精髓

## 类型

- Primitive
  - Boolean
  - Number
  - String
  - null
  - undefined
  - Symbol
- Object

## 变量

```js
// 声明
var a = 1; // 函数作用域, 变量提升
let b = 2; // 块作用域
const c = 3; // 块作用域
d = 4; // 全局作用域
```

## 函数

```js
// 函数声明提升优先
console.log(typeof v); // function
var v = 9;
console.log(typeof v); // number
function v() {}
console.log(typeof v); // number
// 等于:
function v() {}
var v;
console.log(typeof v); // function
v = 9;
console.log(typeof v); // number
console.log(typeof v); // number
```

```js
// 严格模式 限制内部直接出现的`this`隐式指window
(function f() {
  'use strict';
  function fn() {
    console.log(this); // undefined
  }
  fn();
})();
//----------------------------------
function fn() {
  console.log(this); // window
}
(function f() {
  'use strict';
  fn();
})();
```

```js
// 块级函数名保护
function f() {
  f = 1;
}
f();
console.log(typeof f); // number
console.log(typeof f); // number
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
{
  function f() {
    f = 1;
  }
  f();
  console.log(typeof f); // number
}
console.log(typeof f); // function
```

```js
// 函数作表达式时外部不可获取函数名
if (function f() {}) {
  console.log(typeof f); // undefined
}
//----------------------------------------
var fn = function f() {
  // 内部可获取
  console.log(typeof f); // function
};
console.log(typeof f); // undefined
fn();
//----------------------------------------
(function f() {
  console.log(typeof f); // function
})();
console.log(typeof f); // undefined
```

```js
// 原型链
function P() {}
var c = new P();
c.__proto__ === P.prototype;
```

## 继承

> 子类得到父类属性、方法, 且保留 constructor

## 作用域链

```js
var name = 'global';
function A(name) {
  alert(name);
  this.name = name;
  var name = '1';
}
A.prototype.name = '2';
var a = new A('3'); // '3'

alert(a.name); // '3'
delete a.name; // -> delete a.__proto__.name
alert(a.name); // '2'
```

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return fun(m, n);
    },
  };
}

var a = fun(0);

a.fun(1);
a.fun(2);

var b = fun(0)
  .fun(1)
  .fun(2)
  .fun(3);

var c = fun(0).fun(1);

c.fun(2);
c.fun(3);
```
