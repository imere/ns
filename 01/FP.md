# JavaScript 函数式编程

函数对于外部状态的依赖 是造成系统复杂性大大提高的主要原因, 让函数尽可能地纯净

优点: 声明式, 专注业务, 降低复杂度, 可缓存(惰性)

依赖特性: 高阶函数, 闭包

## 尾递归

尾调用指某函数最后一步调用另一函数。尾调用自身称尾递归

尾调用优化指尾递归不保存上层变量, 只占用一个栈帧, 由引擎实现

```js
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
tailFactorial(5, 5);
```

## 柯里化

是偏函数的实现

用部分参数生成函数, 减少参数, 可分步求值(惰性求值)

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
var fn = pipe(f, g);
fn(5); // 对比 f(g(5))
```

## 反柯里化

```js
Function.prototype.uncurry = function() {
  // this 指调用uncurry的函数, 设这个函数是 fn
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

## Point Free

不显式指定调用参数, 直接拿来用

是单一职责的纯函数实现

```js
var toUpperCase = word => word.toUpperCase();

var split = x => str => str.split(x);

var f = compose(split(" "), toUpperCase);

f("abcd efgh");
```

## Monad

```js
var fs = require("fs");
var _ = require("lodash");

// Functor 是一种容器类型
class Functor {
  constructor(val) {
    this.val = val;
  }

  // 定义了这个方法: 接收 含值容器 和 函数, 函数处理 容器的值, 返回另一个 含值容器
  // (a -> b) -> functor a -> functor b
  map(f) {
    return new Functor(f(this.val));
  }
}

// Monad 定义了这样的方法: 接收 含值容器 和 函数, 函数处理 容器的值, 返回另一个 含值容器
// monad a -> (a -> monad b) -> monad b
class Monad extends Functor {
  join() {
    return this.val;
  }

  // 如果有嵌套容器, 即 f 返回容器, 可以取出, 保证永远返回单层容器
  flatMap(f) {
    return this.map(f).join();
  }
}

var compose = _.flowRight; // function compose(f, g) { return f(g()) }

// IO 和 脏操作 打交道
// 是 Applicative
class IO extends Monad {
  // val是最初的脏操作
  static of(val) {
    return new IO(val);
  }

  // Applicative 的方法定义为这样: 接收 含函数的容器 和 函数, 返回另一个 含函数的容器
  map(f) {
    return IO.of(compose(f, this.val));
  }
}

var readFile = function(filename) {
  return IO.of(function() {
    return fs.readFileSync(filename, "utf-8");
  });
};

var print = function(x) {
  console.log("p");
  return IO.of(function() {
    return x + " 函数式";
  });
};

const result = readFile("./txt") // 返回容器 IO
  // flatMap 返回的是函数 compose
  .flatMap(print);

console.log(result().val());
```
