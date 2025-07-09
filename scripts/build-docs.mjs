#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync, renameSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// 项目根目录
const rootDir = resolve(__dirname, '..');

// docs和dist目录的路径
const docsDir = resolve(rootDir, 'docs');
const distDir = resolve(rootDir, 'dist');

// 步骤1: 执行pnpm build
console.log('📦 执行构建...');
try {
  execSync('pnpm build', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ 构建成功');
} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
}

// 步骤2: 如果有docs目录，删除docs目录
if (existsSync(docsDir)) {
  console.log('🗑️  删除已存在的docs目录...');
  try {
    rmSync(docsDir, { recursive: true, force: true });
    console.log('✅ docs目录删除成功');
  } catch (error) {
    console.error('❌ 删除docs目录失败:', error.message);
    process.exit(1);
  }
}

// 步骤3: 将dist目录改为docs目录
console.log('📁 将dist目录重命名为docs...');
try {
  renameSync(distDir, docsDir);
  console.log('✅ 重命名成功');
} catch (error) {
  console.error('❌ 重命名失败:', error.message);
  process.exit(1);
}

console.log('🎉 文档构建完成！可以将docs目录部署到GitHub Pages');