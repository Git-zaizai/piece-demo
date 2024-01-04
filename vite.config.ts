import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// @ts-ignore
import AutoImport from 'unplugin-auto-import/vite'
// @ts-ignore
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/  dts: 'types/auto-imports.d.ts',
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(
    configEnv.mode,
    process.cwd()
  ) as unknown as ImportMetaEnv

  for (const viteEnvKey in viteEnv) {
    if (viteEnv[viteEnvKey] === 'true') {
      viteEnv[viteEnvKey] = true
    } else if (viteEnv[viteEnvKey] === 'false') {
      viteEnv[viteEnvKey] = false
    }
  }

  return {
    plugins: [
      vue(),
      vueJsxPlugin(),
      VueSetupExtend(),
      AutoImport({
        dts: 'types/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          },
          '@vueuse/core'
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
        resolvers: [NaiveUiResolver()]
      })
    ],
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 1110,
      open: Boolean(viteEnv.VITE_OPEN)
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
      }
    }
  }
})
