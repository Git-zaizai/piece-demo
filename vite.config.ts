import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// @ts-ignore
import AutoImport from 'unplugin-auto-import/vite'
// @ts-ignore
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import { visualizer } from 'rollup-plugin-visualizer';

// import shikiMdVue from './build/vite-shiki-md-vue'
import vitepressMdplugin from './build/vite-vue-mdtuvue/markdownToVue'
import manualChunksFun from './build/manualChunks'

/***
 * 
 * 
 * /naive-ui@2.34.3_vue@3.3.13
 */
// https://vitejs.dev/config/  dts: 'types/auto-imports.d.ts',
export default defineConfig(async configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv

  for (const viteEnvKey in viteEnv) {
    if (viteEnv[viteEnvKey] === 'true') {
      viteEnv[viteEnvKey] = true
    } else if (viteEnv[viteEnvKey] === 'false') {
      viteEnv[viteEnvKey] = false
    }
  }

  return {
    plugins: [
      vitepressMdplugin(),
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      vueJsx(),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.ts$/,
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ]
      }),
      Components({
        dts: 'types/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),
      visualizer({ open: true })
    ],
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 1110,
      open: Boolean(viteEnv.VITE_OPEN),
      /* proxy: {
        '/verifyUser': {
          target: 'http://127.0.0.1:4399',
          changeOrigin: true,
          rewrite: (path) => {
            console.log("🚀 ~ path:", path)
            return path.replace(/^\/verifyUser/, '/verifyUser')
          }
        }
      } */
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/var.scss";`
        }
      }
    },

    build: {
      target: ['es2022', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true
        }
      },
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          /*   manualChunks: manualChunksFun,
            // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容的hash值
            entryFileNames: 'js/[name].[hash].js',
            // 用于命名代码拆分时创建的共享块的输出命名
            chunkFileNames: 'js/[name].[hash].js',
            // 用于输出静态资源（如：css，图片等）的命名，[ext]表示文件扩展名
            assetFileNames: 'assets/[name].[hash].[ext]' */
          manualChunks: {
            ui: ['naive-ui', '@vicons/antd', '@vicons/carbon', '@vicons/fluent', '@vicons/ionicons4', '@vicons/ionicons5', '@vicons/tabler'],
            vue: ['vue', 'vue-router', 'pinia', 'pinia-plugin-persistedstate', '@vueuse/core'],
            shiki: ['shiki', '@shikijs/monaco']
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容的hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源（如：css，图片等）的命名，[ext]表示文件扩展名
          assetFileNames: 'assets/[name].[hash].[ext]',
        }
        /* rollupOptions: {
          output: {
            manualChunks: {
              jsonWorker: [`monaco-editor/esm/vs/language/json/json.worker`],
              cssWorker: [`monaco-editor/esm/vs/language/css/css.worker`],
              htmlWorker: [`monaco-editor/esm/vs/language/html/html.worker`],
              tsWorker: [`monaco-editor/esm/vs/language/typescript/ts.worker`],
              editorWorker: [`monaco-editor/esm/vs/editor/editor.worker`],
            },
          },
        }, */
      }
    }
  }
})
