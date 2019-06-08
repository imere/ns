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
// 原型链
function P() {}
var c = new P();
c.__proto__ === P.prototype;
```

## 继承

> 子类得到父类属性、方法, 且保留 constructor

## 柯里化

> 用部分参数生成函数, 减少参数, 可分步求值

```js
function f(n) {
  return n * n;
}
function g(n) {
  return n * 2;
}
function pipe(f, g) {
  return function() {
    return f.call(null, g.apply(null, arguments));
  };
}
var fn = pipe(
  f,
  g
);
fn(5); // 对比 f(g(5))
```

## 反柯里化

```js
Function.prototype.uncurry = function() {
  // `this` 指调用uncurry的函数, 设这个函数是 `fn`
  // 返回的函数是`fn.call`
  return this.call.bind(this);
};

// 变量 `push` 实际为 `Array.prototype.push.call`
var push = Array.prototype.push.uncurry();
var arr = [];
// 以下调用实际为 Array.prototype.push.call(..., ...)
push(arr, 1);
push(arr, 2);
```

## 尾递归

> 尾调用指某函数最后一步调用另一函数。尾调用自身称尾递归

```js
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
tailFactorial(5, 5);
```

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
