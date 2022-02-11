# 知智图谱一体化构建工具

访问地址: https://gi.lingthink.com

## TODO

1. [x] 主页(用户信息、退出登录)
2. [x] 标签录入
3. [x] 数据源(解析数据)
4. [x] 工具栏(放大缩小)
5. [x] 概念编辑界面
6. [x] Card
7. [x] Auth
8. [x] Home
9. [x] ModelBuilder
10. [x] 自动隐藏 Bar
11. [x] dbURL 单一类型可配置
12. [x] 后端地址可配置
13. [x] 请求错误提示而不是分开处理
14. [x] Home 中切换构建/应用模式
15. [x] 添加后重置表单
16. [x] 表格更新操作 添加默认值
17. [x] 概念表格显示选项
18. [x] tag 自动从后端获取类型选择
19. [x] 概念可选引用 JSON-LD
20. [x] 部署
21. [x] 邮箱注册
22. [x] 通知将之前的公安本体转化为标签和概念录入数据库
23. [x] 迁移到 pinia
24. [x] 处理 jwt 超期
25. [x] 进行异步加载并填充动画
26. [x] 检测资源加载情况, 进行首屏幕加载, 资源存入 Indexeddb
27. [x] 节点配置窗口: 概念对应
28. [x] 边配置窗口: 概念对应, from to 字段
29. [x] 数据集: 名称、元信息后台
30. [ ] 元信息、csv 数据表 的展示和添加更新校验
31. [ ] 选择本体进行构建: 每个 cell 的数据集选择&概念字段与数据集元信息匹配
32. [ ] 构建(注入数据到 neo4j)
35. [ ] 案例: 基于 neo4j 和 gephi 做一些全流程的图挖掘情报推理

## 升级计划

### 插件市场

1. [ ] 应用基于动态组件 indexeddb 创造一个插件市场
2. [ ] 应用模式: 知识库(解语知识树)
3. [ ] 应用模式: 智能问答
4. [ ] 应用模式: 情报推理(图挖掘计算)
5. [ ] 应用模式: 文本解析成数据源

### 基于 cube.js 重构数据源与构建模块<数据 ETL 中台>

1. [ ] 选择并配置数据源(左侧列表)，datasource 存: 名称、数据库链接配置信息、schema 列表

2. [ ] 选中数据源，可用 schema 编辑器增加、编辑数据集(右侧卡片), schema 存于 strapi

3. [ ] 点击发布 cube 依据 schema 动态创建服务 https://cube.dev/docs/recipes/multiple-sources-same-schema https://cube.dev/docs/schema/advanced/dynamic-schema-creation#usage-with-data-source

4. [ ] 构建配置器基于 schema 生成数据集元信息进行匹配

5. [ ] 构建器放在后端，异步任务化

### 图数据库技术升级

1. [ ] 基于 surrealdb 做图谱储存

## 构建时环境变量

VITE_STRAPI_URL: 后端地址
VITE_APP_FONT: 字体资源名称

## 已知依赖问题

1. [ ] keep-alive _调试问题_ https://github.com/vuejs/core/pull/5165
2. [ ] suspense _调试问题_ 与动态组件组合使用问题 https://github.com/vuejs/core/issues/5110
