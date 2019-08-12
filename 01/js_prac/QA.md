# JavaScript 与 QA(Quality Assurance)工程师

## 概念与分类

> 目的: 明确知道代码结果

- 单一职责
- 接口抽象
- 层次分离

TDD

> 测试先行. 关注**功能**是否实现

BDD

> 业务先行. 关注**整体**行为是否符合整体

## 流程

- 单元测试

1. before
2. beforeEach
3. it
4. after
5. afterEach

- 覆盖率
- 基准测试
  - 抽样统计
- 压力测试(ab, siege, http_load)
  - 吞吐率
  - 响应时间
  - 并发数
- 安全漏洞检查
  - XSS
  - SQL
  - CSRF
- 功能测试
  - 用户真实性检查
    - selenium
    - protractor
  - 冒烟测试(针对某 bug)
  - 回归测试
- lint

## 工具

- benchmark
- karma
- mocha
- backstopjs
- supertest
- rize
- selenium-webdriver
