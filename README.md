# GuYue-Admin -- 一款高仿的管理后台

### 介绍 📖

GuYue-Admin 一款基于 Vue3.0、TypeScript、Vite3.2、Pinia、Ant Design Vue、Unocss 开源的后台管理框架，使用目前最新技术栈开发。提供简单基于 antd vue ProTable 组件(胡乱封装，技术不够，见谅)，在一定程度上节省您的开发效率。另外本项目还封装了一些常用组件(右键菜单等)、Hooks、指令、动态路由、按钮级别权限控制等功能。


### 依赖仓库 ⭐

- Gitee：https://gitee.com/Y_lao/GuYue-Admin
- GitHub：https://github.com/Y-Lao/GuYue-Admin.git


### 项目功能 🔨

- 使用 Vue3.0 + TypeScript 开发，单文件组件**＜ script setup ＞**
- 采用 Vite3.2 作为项目开发、打包工具（配置 Gzip 打包、TSX 语法、跨域代理…）
- 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 基于 Ant Design Vue 二次封装简单 ProTable 组件(胡乱封装，技术不够，见谅) -- 很多功能没实现的，0.0
- 支持 Ant Design Vue 组件大小切换、i18n 国际化、颜色主题切换、暂未支持暗黑模式(确实不会弄)
- 使用 VueRouter 进行路由权限拦截、页面按钮权限配置、路由懒加载
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套页面缓存
- 常用自定义指令开发（权限、复制、水印、拖拽、节流、防抖、长按…）
- 使用 Prettier 统一格式化代码，集成 ESLint、Stylelint 代码校验规范
- 使用 husky、lint-staged、commitlint、czg、cz-git 规范提交信息
- 使用 Unocss, 具有高性能且极具灵活性的即时原子化 CSS 引擎

### 安装使用步骤 📔

- **Clone：**

```text
# GitHub
git clone https://github.com/yu4n2h1/student-manage-GuYue.git
```

- **Install：**

```text
yarn
```

- **Run：**

```text
yarn dev
yarn serve
```

- **Build：**

```text
# 开发环境
yarn build:dev

# 测试环境
yarn build:test

# 生产环境
yarn build:pro
```

- **打包启动 dist：**

```build
# 安装服务
npm i -g serve
# 目录
cd dist
# 启动
serve
```
