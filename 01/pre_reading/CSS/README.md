# CSS 高级实用技巧

## 核心

双飞翼

```html
<!-- float布局 -->
<html>
  <head>
    <style>
      .left {
        width: 300px;
        margin-left: -100%;
        float: left;
      }
      .middle {
        width: 100%;
        float: left;
      }
      .middle .inner {
        margin-left: 300px;
      }
      .right {
        width: 200px;
        margin-left: -200px;
        float: left;
      }
    </style>
  </head>
<body>
  <div class="middle">
    <div class="inner">middle</div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
</body>
</html>
```

BFC(块级渲染方式)

- 根元素
- float 不为 none
- position 为 absolute, fixed, sticky
- display 为 flow-root, inline-block
- flex, grid 元素
- table caption 或 display: table-caption
- table cell 或 display: table-cell, table-\*创建的 table-cell
- 元素有 contain: layout, content, strict 或 column-span: all
- overflow 不为 visible
- 多列容器

## OO(面向对象) CSS

> 将⻚⾯可重⽤元素抽象成⼀个类, ⽤Class加以描述, 与其对应的HTML可看成是此类的⼀个实例

- 不要直接定义⼦节点, 应把共性声明放到⽗类
- 结构和⽪肤相分离
- 容器和内容相分离
- 抽象出可重⽤的元素, 建好组件库, 在组件库内寻找可⽤的元素组装⻚⾯
- 对象应保持独⽴性
- 避免位置相关的样式

## CSS 分层

有助于扩展, 性能提⾼, 组织管理

### [SMACSS](https://smacss.com/)

> 修饰符使⽤的是--，⼦模块使⽤\_\_符号

```pug
div(class="container")
  div(class="container-header")
    div(class="container-header__title")
      h1(class="container-header__title--home")
```

### [BEM](https://en.bem.info/)

> 修饰符使⽤的是\_，⼦模块使⽤\_\_符号

```pug
ul(class="menu")
  li(class="menu__item")
  li(class="menu__item_state_current")
  li(class="menu__item")
```

### [SUIT](https://suitcss.github.io/)

> 修饰符使⽤的是—，⼦模块使⽤\_\_符号

```css
.u-utility {}
.ComponentName {}
.ComponentName--modifierName {}
.ComponentName-descendantName {}
.ComponentName.is-someState {}
```

### [ACSS](http://patternlab.io/)

> 原子性

```css
.m-10 {
  margin: 10px;
}
.w-50 {
  margin: 50%;
}
```

### [ITCSS](http://csswizardry.net/talks/2014/11/itcss-dafed.pdf)