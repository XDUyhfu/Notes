### 除了常规 css，还有哪些样式体系方案，详细说明各自核心概念与优缺点
> https://www.bilibili.com/video/BV1sWqTYcEeL


- css
  - 有点：简单好理解
  - 缺点：复用性低，容易冲突，无法支持动态语法
- scss less
  - 变量定义、编译器
  - 学习曲线，需要进一步封装，css hack（兼容性、厂商前缀）
  - postcss
- css module
  - 语法跟 css 一样，没有额外的学习成本
  - ts类型支持不完善，定制化、复用性高需求无法满足
- atomic css / utility-first css（tailwindcss）
  - 非常快，编译时，对于运行时的开销非常小
  - 不写 css，全部写 class
- cssinjs （styled-components、emotion）
  - 运行时，无需编译，复用性高
  - 运行时反噬性能差
- scoped css
  - 简单好理解，解决冲突问题
  - 复用性差
- BEM 写法，不是一个技术 


### 请举例 css、cssinjs、tailwindcss 的使用技巧与方案价值体现

#### module css

- 变量复用
  - css3 变量 --primary: pink, tokens
- BEM 命名规范 header_sdf__sdfsdf
- flex、grid布局

```css
:root {
    --color-primary: pink;
    --bg-primary: white;
    --margin: 2px;
    --padding: 2px;
}
```

#### cssinjs（大型项目中，性能影响明显）
- 动态样式
- 样式隔离，类名自动生成
- 嵌套规则

#### tailwindcss
- 原子化设计、归为类名
- 样式集中管理 tailwind.config.js
- 无需编写css


### 在项目架构初期，如何考虑选择合适的样式体系方案

#### 考虑点
- 项目特点：团队规模、交付周期、性能要求
- 技术适配：现有的技术栈和工具链
- 团队能力：样式工具熟悉程度
- 未来拓展：模块化、响应式、动态样式


### 是否开发过组件（库）吗，开发与设计的思路（要细节）？

#### 架构设计
- 分层
  - rc-xxx，提供基础组件，unstyled component（headless component）只具备交互，不具备UI
  - 样式体系，theming
  - 基础组件
  - 复合组件 Search，Input + Select、IconButton Icon + Button
  - 业务组件
- 解耦
  - 对于每个组件都需要定义样式、ts 类型、基础操作、工具方法
- 响应式设计
  - 媒体查询 media query、ResizeObserver、Grid

#### 状态管理
- 全局状态、基础配置、国际化配置、主题配置
  - react -> Context、useSyncExternalStore (不会依赖第三方库来实现)
- 局部状态，表单场景，受控和非受控

#### 样式体系与主题设计
- Color Tokens：颜色色值系统 （antd、arco | mantineUI | mui | shadcn ui）
- 样式模块化方案：css-in-js (弊端：运行时消耗、ssr支持不好)【emotion等】module css
- 样式优先级与覆盖：控制样式优先级

#### 模块化
- 可复用性，对于 props、events 的设计非常重要，为什么 input、textarea 都需要 value、onChange 成对出现（官方规则）
- 公共方法：颜色计算函数、格式化处理、本地化、工具函数

#### 开发流程

##### 本地开发
antd 二次开发
##### 组件库开发流程
1. 工程架构：monorepo：core、components、hooks、utils、shared
2. typescript
3. 流程化、规范化、自动化、script如何定义（CI\CD 的源头）（eslint9，commitlint等）
4. 构建打包：rollup、esbuild、swc
5. 测试：单元测试，vitest、react-testing-library





> 组件属性设置 + 组件事件设置 + ... = 组件的数据协议设置

> 根据变体（variant）类型，求解不同组件的 UI 表现

```typescript jsx
import { css } from "styled-components";

export const useStyle = ( props: ButtonProps ) => {
  const {
    radius,
    variant
  } = props

  return css`
    border: none;
    background-color: var(--color-${variant});
    border-radius: var(--radius-${radius});
  `
}

export const Button = (props: ButtonProps) => {
	const {radius, variant} = props
    const styles = useStyles({radius, variant})
    return <SCxButton style={styles}>hello</SCxButton>  
}
```
