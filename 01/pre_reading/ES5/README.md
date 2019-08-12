# ES5核心技术

## 变量提升

```javascript
function fn() {
  if (false) {
    var a = 1;
  }
  alert(a);
}
```

相当于

```javascript
function fn() {
  var a; // var为函数级作用域
  if (false) {
    a = 1;
  }
  alert(a); // undefined
}
```

## 块级作用域实现

```javascript
/* ES5 */
try {
  throw 1;
} catch(a) {
  alert(a); // 1
}
alert(a); // is not defined

/* ES6 */
{
  let a = 1;
}
alert(a); // is not defined
```

## with

```javascript
var obj = { a: 1 };
with(obj) {
  a = 2;
  b = 3;
}
alert(obj.b); // undefined
alert(b); // 3, obj内不存在时赋值window
alert(obj.a); // 2
```

## IIFE(立即执行函数表达式)

```javascript
(function () {})();
```

```javascript
+function () {}();
```

+可换为其它运算符如: ~, - 等, 有效率差异, 目的是使函数角色变为表达式

## 闭包垃圾回收

```javascript
function fn() {
  var a = 1; // 回收
  return function () {
    alert(1);
  }
}

// eval: 不对LexicalEnvironment进行任何的解绑
function fn() {
  var a = 1; // 不回收
  return function () {
    eval(""); // 因为无法静态分析
  }
}

function fn() {
  var a = 1; // 回收
  return function () {
    window.eval("");
  }
}

// with: 放弃全部变量的回收
var outter = {
    age:20
};
with(outter){
    name = "name";
};
console.log(name); // name

// try..catch(ex): 不会回收ex
// ex是未定义变量 -> 延长了作用域链, 引用LexicalEnvironment
try {
  throw new Error('');
} catch(ex) {}

// new Function(" "): scope LexicalEnvironment
// new Function(字符串) 绑定全局
var test = "outter";
function init() {
    var test = "inner";
    var fn = new Function("console.log(test)");
    fn(); // outer
}
init();
// new Function(立即执行的函数) 绑定当前
var test = "outter";
function init() {
    var test = "inner";
    new Function(console.log(test)); // inner
}
init();
```

## 传递方式: 值传递

```javascript
function fn(v) {
  v = 2;
}
var a = 1;
fn(a);
alert(a); // 1

function fn(obj) {
  obj = {
    a: 2
  };
}
var o = { a: 1 };
fn(o);
alert(o.a); // 1

function fn(obj) {
  obj.a = 2;
}
var o = { a: 1 };
fn(o);
alert(o.a); // 2
```

## 原型

```javascript
function fn() {
  this.a = 1;
}
fn.prototype.a = 2;
var obj = new fn;
alert(obj.a); // 1  constructor优先(fn.prototype.constructor === fn)
```

```javascript
/* ES5 */
function fn() {
  this.a = 1;
}
fn.prototype.fun = function () {
  console.log('fun');
};

/* ES6 */
class fn {
  constructor() {
    this.a = 1;
  }
  fun() {
    console.log('fun');
  }
}
```
