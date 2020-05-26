# React

## class render function

```ts
(render) => string | DOM | Jsx | React.createClass();
```

Jsx: createClass 语法糖, 只能一个节点

## Component & PureComponent

setState, props 时

Component: 更新组件

PureComponent: 值不变不更新(内部 shouldComponentUpdate 比较)

## Functional Component

<=React15: 状态靠 props, 称无状态组件

## HOC(Higher Order Component)

传参不明

免 mixin(多路径), 但层级深

```js
function component(){
  return <div></div>
}

function hoc(Component){
  return class extends React.Component {
    render(){
      return <Component />
    }
  }
}

const NewComponent = hoc(component)

<NewComponent />
```

## RenderProps

传参明确

```js
class RenderProps extends React.Component {
  render() {
    var prop = this.props.prop;
    return this.props.children({ prop });
  }
}
```

```js
render() {
  return (
    <RenderProps>
    {
      ({ prop }) => {
        return <Component propName={prop} />
      }
    }
    </RenderProps>
  );
}
```

## React.memo

pure

## Hooks

### useMemo

满足条件更新

```js
useMemo(() => {
  return () => console.log();
}, [...conditions]);
```

### useCallback

```js
useCallback(() => console.log(), [...conditions]);
```

### useEffect

```js
useEffect(() => {
  console.log();
  // optional
  return () => {
    // unregister logic
  };
}, [...conditions]);
```

### useState

```js
const [value, setValue] = useState(initialValue);
```

### useFetch

```js
// before encapsulated
const cached = {};
const createFetcher = (promiseTask) => {
  let ref = cached;
  return () => {
    const task = promiseTask();
    task.then((res) => (ref = res));
    if (ref === cached) throw task;
    return ref;
  };
};
```

```js
function SuspenseComponent() {
  const [error, data] = useFetch("end.point");
}
```

```js
// synchronize
const cache = new Map();
const pending = new Map();
function task(url) {
  if (cache.has(url)) return cache.get(url);
  if (pending.has(url)) throw pending.get(url);
  let promise = fetch(url)
    .then((res) => res.text())
    .then((text) => {
      pending.delete(url);
      cache.set(url, text);
    });
  pending.set(url, promise);
  throw promise;
}

async function run(task) {
  for (;;) {
    try {
      return task();
    } catch (ex) {
      if (ex instanceof Promise) {
        await ex;
      } else {
        throw ex;
      }
    }
  }
}

const d = run(task);
```

## [Redux](./redux/index.html)
