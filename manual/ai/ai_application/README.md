# AI技术文档目录

本目录包含AI应用开发相关的技术文档，按照主题分解为多个专注的文件，便于查阅和维护。

## 文档结构

### 核心概念与架构
- [`ai_architecture_overview.md`](./ai_architecture_overview.md) - 现代AI体系架构概览
  - 大语言模型发展演进
  - Transformer核心原理
  - 分布式训练与推理
  - 模型即服务生态
  - 多模态融合架构

### 模型资源与平台
- [`model_platforms_resources.md`](./model_platforms_resources.md) - 主流AI模型平台与资源获取
  - Hugging Face生态系统
  - ModelScope魔搭平台
  - 开源模型资源整合(LLaMA、Stable Diffusion、Whisper)

### 部署与运维
- [`local_deployment_solutions.md`](./local_deployment_solutions.md) - 本地模型部署方案
  - 硬件环境准备
  - 推理框架选择
  - 容器化部署

- [`model_optimization_quantization.md`](./model_optimization_quantization.md) - 模型优化与量化
  - 模型压缩技术
  - 量化技术详解
  - 推理加速优化

### 开发框架
- [`ai_development_frameworks.md`](./ai_development_frameworks.md) - AI应用开发框架
  - 国内主流框架概览
  - LangChain深度解析
  - 多语言实现对比

## 使用建议

1. **新手入门**: 建议按顺序阅读 `ai_architecture_overview.md` → `model_platforms_resources.md`
2. **实践部署**: 重点关注 `local_deployment_solutions.md` 和 `model_optimization_quantization.md`
3. **应用开发**: 详细学习 `ai_development_frameworks.md` 中的框架使用

## 待完善内容

以下主题的文档将在后续补充：
- 云端AI服务平台
- 边缘AI部署
- 多模态AI模型详解
- 向量数据库与检索系统
- AI应用监控与运维
- 安全与合规考虑
- 实战案例分析
- 附录资源

## 贡献指南

欢迎对文档进行补充和完善：
- 保持Markdown格式统一
- 代码示例需可执行
- 专业术语需提供解释
- 按主题分类存放