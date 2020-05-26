# Vue

## 响应式原理

[vue 2 old](./vue/old/index.html)

[vue 2 new](./vue/new/index.html)

### reactivity

```typescript
it("should observe basic properties", () => {
  let dummy;
  // reactive代理对象的getter、setter等方法
  const counter = reactive({ num: 0 });
  // effect添加依赖函数
  // 调用依赖函数时触发getter, 调用track函数, 收集到此effect的依赖, 同时建立反向依赖
  effect(() => (dummy = counter.num));

  expect(dummy).toBe(0);
  // 主要依靠代理后的setter, 调用trigger函数, 触发effect的依赖函数再次执行
  counter.num = 7;
  expect(dummy).toBe(7);
});
```

#### reactive

```typescript
function reactive(target: object) {
  // 只读不监听
  if (target && (target as Target).__v_isReadonly) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    // 普通对象处理
    mutableHandlers,
    // 集合对象处理
    mutableCollectionHandlers
  );
}
```

```typescript
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  .....
  const observed = new Proxy(
    target,
    // 根据是否是集合类型选择不同的处理方式
    collectionTypes.has(target.constructor) ? collectionHandlers : baseHandlers
  )
  .....
  // 返回代理
  return observed
}
```

```typescript
// 创建getter
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: object, key: string | symbol, receiver: object) {
    .....
    // 若非只读则添加到依赖
    !isReadonly && track(target, TrackOpTypes.GET, key)
    return isObject(res)
      ? isReadonly
        ? // 懒处理、也可避免循环引用
          readonly(res)
        : reactive(res)
      : res
  }
}

function track(target: object, type: TrackOpTypes, key: unknown) {
  if (!shouldTrack || activeEffect === undefined) {
    return
  }
  // 根据传入的对象建立依赖关系
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  // 双向依赖
  if (!dep.has(activeEffect)) {
    // 将effect添加到依赖
    dep.add(activeEffect)
    // 将依赖添加到effect
    activeEffect.deps.push(dep)
  }
}
```

```typescript
// 创建setter
function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    .....
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
      // 通知更新
      if (!hadKey) {
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}

function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  // 获取监听对象的依赖
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    // never been tracked
    return
  }
  const effects = new Set<ReactiveEffect>()
  const computedRunners = new Set<ReactiveEffect>()
  .....
  const run = (effect: ReactiveEffect) => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  }
  // 执行依赖
  // computed必须优先执行, 因为普通effect可能会用到computed effect
  computedRunners.forEach(run)
  effects.forEach(run)
}
```

#### effect

```typescript
function createReactiveEffect<T = any>(
  fn: (...args: any[]) => T, // 传入依赖函数
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  // 包装依赖函数
  const effect = function reactiveEffect(...args: unknown[]): unknown {
    .....
    if (!effectStack.includes(effect)) {
      cleanup(effect)
      try {
        enableTracking()
        effectStack.push(effect)
        activeEffect = effect
        // 调用依赖函数
        // 函数里触发依赖收集
        return fn(...args)
      } finally {
        effectStack.pop()
        resetTracking()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  } as ReactiveEffect
  .....
  // 保存依赖
  effect.deps = []
  .....
  // 返回包装过的依赖函数
  return effect
}
```
