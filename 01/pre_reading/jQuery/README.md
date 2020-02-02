# jQuery 技术内幕

```js
window.addEventListener("load", function(e) {
  console.log("load");
});
// 早于window.onload
document.addEventListener("DOMContentLoaded", function(e) {
  console.log("DOMContentLoaded");
});
// IE模拟
(function() {
  try {
    document.documentElement.doScroll("left");
  } catch (ex) {
    return setTimeout(arguments.callee, 50);
  }
  console.log("mock loaded");
})();
```

```js
var jq = (function(window, undefined) {
  var jq = function() {
    return new jq.fn.init(); // 内部new
  };
  // 重写原型 简写fn
  jq.fn = jq.prototype = {
    init: function() {},
    extend: function() {}
  };
  jq.fn.init.prototype = jq.fn; // jq.fn.init.__proto__ === jq.fn.prototype
  console.log(jq.prototype === jq.prototype.init.prototype); // jq <-> init init替代jq作构造器
  return jq;
})(window);
```

```js
// 连贯接口: 1.链式调用 2.命令查询媒体 重载 3.参数映射
var method = "log";
var methods = {
  log: function() {
    console.log("log");
  },
  alert: function() {
    alert("alert");
  }
};
methods[method] && methods[method]();

function defineMethod(obj, method, fn) {
  // 闭包
  var old = obj[method]; // 保存上一次的函数
  obj[method] = function() {
    if (fn.length === arguments.length) {
      return fn.apply(this, arguments); // 调用当前函数
    } else if (typeof old === "function") {
      return old.apply(this, arguments); // 调用上一次的函数
    }
  };
}
var items = [1, 2, 3, 4, 5, 6];
defineMethod(items, "findItem", function(a) {
  console.group("p1");
  this.forEach(function(v) {
    v === a && console.log(v);
  });
  console.groupEnd();
});
defineMethod(items, "findItem", function() {
  console.group("p0");
  this.forEach(function(v) {
    console.log(v);
  });
  console.groupEnd();
});
defineMethod(items, "findItem", function(a, b) {
  console.group("p2");
  this.forEach(function(v) {
    (v === a || v === b) && console.log(v);
  });
  console.groupEnd();
});
items.findItem(10);
items.findItem();
items.findItem(5, 9);
```

```js
// $.type
var class2type = {};
var toString = class2type.toString;
toString.call([]); // '[object Array]'
toString.call({}); // '[object Object]'
"Boolean Number String Function Array Date RegExp Object Error"
  .split(" ")
  .forEach(function(v, i) {
    class2type["[object " + v + "]"] = v.toLowerCase();
  });
console.log(class2type);
```
