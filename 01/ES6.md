# EcmaScript6

转换工具: traceur, babel

shim: 库

polyfill: 代码片段

## 模块

- AMD
- CMD
- commonjs (cjs)
- UMD

## 编译

- babel
- traceur

## 工具

### grunt

### gulp

### yeoman

### fis

### webpack

#### 插件

- antd-dayjs-webpack-plugin
  > 将antd的momentjs换为dayjs (但使用时日期相关组件的出现了问题)

- clean-webpack-plugin
  > 打包前删除指定目录

- copy-webpack-plugin
  > 复制文件到指定位置

- duplicate-package-checker-webpack-plugin
  > 查看打包的版本不同的包

- fork-ts-checker-webpack-plugin
  > typescript类型检查另起进程, 避免阻塞打包

- html-webpack-plugin
  > 指定文件注入

- mini-css-extract-plugin
  > 提取非 CSS 文件内的 CSS 到独立的 CSS 文件

- optimize-css-assets-webpack-plugin
  > 压缩 CSS

- progress-bar-webpack-plugin
  > 显示打包进度条

- purifycss-webpack
  > CSS tree shaking, HTML内没出现的都会清除

- speed-measure-webpack-plugin
  > 显示各模块打包用时

- stylelint-webpack-plugin
  > style lint

- terser-webpack-plugin
  > js代码压缩

- tsconfig-paths-webpack-plugin
  > 使用tsconfig配置的模块导入路径

- webpack-bundle-analyzer
  > 打包大小可视化

- webpack-dashboard
  > 终端可视化显示打包结果

- webpack-build-notifier
  > 打包完成提示

- webpack-deep-scope-plugin
  > JavaScript tree shaking, 文件稍多非常耗时, 通常cjs方式才需要

- webpack-parallel-uglify-plugin
  > 多进程压缩 JavaScript

- webpack-merge
  > 合并 webpack 配置文件

- workbox-webpack-plugin
  > PWA
