# 语法高亮处理器

本目录包含了代码语法高亮的处理器实现，每种语言都有独立的处理器文件。

## 目录结构

```
token/
├── README.md          # 本文档
├── index.ts           # 导出所有语言的处理器
├── types.ts           # 类型定义
├── generic.ts         # 通用语法高亮处理器
├── javascript.ts      # JavaScript语法高亮处理器
├── typescript.ts      # TypeScript语法高亮处理器
├── python.ts          # Python语法高亮处理器
└── ... 其他语言处理器
```

## 如何添加新的语言支持

1. 在 `token` 目录下创建新的语言处理器文件，例如 `java.ts`
2. 实现 `TokenizerInterface` 接口和 `TokenizerFactory` 接口
3. 在 `token/index.ts` 中导入并注册新的语言处理器

### 示例：添加Java语言支持

1. 创建 `java.ts` 文件：

```typescript
import { h } from 'vue'
import type { TokenizerInterface, TokenizerFactory } from './types'

/**
 * Java代码语法高亮处理器
 */
export class JavaTokenizer implements TokenizerInterface {
  // Java关键字列表
  private keywords = [
    'abstract', 'assert', 'boolean', 'break', 'byte',
    'case', 'catch', 'char', 'class', 'const',
    'continue', 'default', 'do', 'double', 'else',
    'enum', 'extends', 'final', 'finally', 'float',
    'for', 'if', 'implements', 'import', 'instanceof',
    'int', 'interface', 'long', 'native', 'new',
    'package', 'private', 'protected', 'public', 'return',
    'short', 'static', 'strictfp', 'super', 'switch',
    'synchronized', 'this', 'throw', 'throws', 'transient',
    'try', 'void', 'volatile', 'while', 'true', 'false', 'null'
  ]

  /**
   * 对代码行进行分词处理
   * @param content 代码行内容
   * @returns VNode数组
   */
  tokenize(content: string) {
    const tokens = []
    
    // 实现Java语法高亮逻辑
    // ...
    
    return tokens
  }
}

/**
 * Java代码语法高亮处理器工厂
 */
export class JavaTokenizerFactory implements TokenizerFactory {
  /**
   * 创建Java语法高亮处理器
   * @returns TokenizerInterface 语法高亮处理器实例
   */
  create(): TokenizerInterface {
    return new JavaTokenizer()
  }
}
```

2. 在 `token/index.ts` 中注册新的语言处理器：

```typescript
import { JavaTokenizerFactory } from './java'

// 在tokenizerMap中添加
const tokenizerMap: TokenizerMap = {
  // ...
  // Java处理器
  java: new JavaTokenizerFactory(),
  // ...
}

// 导出新的处理器工厂
export { JavaTokenizerFactory } from './java'
```

## 设计说明

本模块采用工厂模式和策略模式的组合，使得添加新的语言支持变得简单：

- `TokenizerInterface`：定义了语法高亮处理器的接口
- `TokenizerFactory`：定义了语法高亮处理器工厂的接口
- `tokenizeLine`：根据语言选择合适的处理器进行分词

这种设计使得：

1. 每种语言的处理逻辑独立维护，便于扩展和修改
2. 添加新语言不需要修改核心代码，只需添加新文件并注册
3. 可以方便地复用和继承已有语言的处理逻辑（如TypeScript继承JavaScript）

## 未来升级方案：Tree-sitter集成

当前的语法高亮实现基于正则表达式的词法分析，虽然简单高效，但在处理复杂语法结构和上下文相关的代码时存在局限性。未来可以考虑集成Tree-sitter作为高级语法高亮解决方案。

### Tree-sitter简介

Tree-sitter是一个增量解析器生成器工具和增量解析库，它可以：

- 构建代码的完整抽象语法树(AST)
- 提供精确的语法高亮，包括上下文相关的高亮
- 支持增量解析，性能优异
- 支持多种编程语言
- 通过WebAssembly在浏览器中运行

### 集成方案

1. **依赖安装**
   - 安装`web-tree-sitter`（浏览器环境）
   - 安装所需语言的解析器（如`tree-sitter-javascript`、`tree-sitter-python`等）

2. **解析器管理**
   - 创建Tree-sitter解析器管理模块
   - 按需加载语言解析器的WASM文件

3. **高亮处理**
   - 使用查询文件（`.scm`）定义高亮规则
   - 将Tree-sitter节点映射到CSS类

4. **与现有系统集成**
   - 创建Tree-sitter版本的`TokenizerInterface`实现
   - 在`tokenizerMap`中注册Tree-sitter处理器
   - 支持渐进式迁移，保持向后兼容

### 优势

- **更精确的语法高亮**：基于AST的高亮能够理解代码结构和上下文
- **多行结构支持**：更好地处理跨行注释、字符串等
- **语义理解**：可以区分变量、函数、类型等不同用途的标识符
- **可扩展性**：通过查询文件可以自定义高亮规则
- **性能**：增量解析确保高效处理大文件

### 实施建议

建议采用渐进式集成策略：

1. 先为一种语言实现Tree-sitter版本的处理器
2. 与现有正则表达式版本并行运行，进行对比测试
3. 逐步扩展到其他语言
4. 最终可以考虑完全迁移到Tree-sitter架构