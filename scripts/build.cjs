/**
 * @description 全量打包文件
 * @author zhangcj
 * @date 2022-10-20 15:10:17
 */
const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

// 打包入口文件夹
const entryDir = path.resolve(__dirname, '../src/components')
// 打包出口文件
const outDir = path.resolve(__dirname, '../lib')

// vite 基础配置
const baseCofig = defineConfig({
  build: {
    // 清空输出文件夹
    emptyOutDir: true
  },
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
// rollup配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

//  生成package.json
const createAllPackageJSON = () => {
  const fileStr = `
  {
    "name": "arsc-front-components",
    "version": "1.0.1",
    "main": "inde.umd.cjs",
    "module": "index.es.js",
    "types": "index.d.ts",
    "author": {
      "name": "zhangcj"
    },
    "keywords": [
      "element-plus",
      "ts",
      "组件封装",
      "二次封装",
      "vue-components"
    ]
  }
  `
  fsExtra.outputFile(path.resolve(outDir, `package.json`), fileStr, 'utf-8')
}

const createTypesFile = (name) => {
  const fileStr = `
  import { App } from 'vue'
  declare const _default: {
    install(app: App): void
  }

  export default _default
  `
  fsExtra.outputFile(
    path.resolve(outDir, `${name ? name + '/' : ''}index.d.ts`),
    fileStr,
    'utf-8'
  )
}

// 全量打包
const buildAll = async () => {
  await build({
    ...baseCofig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: outDir
    }
  })
  createAllPackageJSON()
  createTypesFile()
}

// 单个组件打包
// name: 组件名称
const buildSingle = async (name) => {
  await build({
    ...baseCofig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: path.resolve(outDir, name)
    }
  })
}

//  生成package.json
const createPackageJSON = (name) => {
  const fileStr = `
  {
    "name":"${name}",
    "main":"index.umd.cjs",
    "module":"index.es.js",
    "style":"style.css"
  }
  `
  fsExtra.outputFile(
    path.resolve(outDir, `${name}/package.json`),
    fileStr,
    'utf-8'
  )
}

// 打包成库
const buildLib = async () => {
  await buildAll()
  // 获取组件名称组成的数组
  const components = fs.readdirSync(entryDir).filter((name) => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })

  for (const name of components) {
    await buildSingle(name)
    createPackageJSON(name)
    createTypesFile(name)
  }
}

buildLib()
