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

import createDemoPlugin from './build/index.js'
import Markdown from 'unplugin-vue-markdown/vite'
import Shiki from '@shikijs/markdown-it'
import {
	transformerTwoslash,
} from '@shikijs/twoslash'

// https://vitejs.dev/config/  dts: 'types/auto-imports.d.ts',
export default defineConfig(async (configEnv) => {
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

	const shiki = await Shiki({
		themes: {
			light: 'one-dark-pro',
			dark: 'one-dark-pro',
		},
		transformers: [
			transformerTwoslash()
		]
	})

	return {
		plugins: [
			vue({
				include: [/\.vue$/, /\.md$/],
			}),
			Markdown({
				// default options passed to markdown-it
				// see: https://markdown-it.github.io/markdown-it/
				/* markdownItOptions: {
					html: true,
					linkify: true,
					typographer: true,
				}, */
				// A function providing the Markdown It instance gets the ability to apply custom settings/plugins
				markdownItSetup(md) {
					md.use(shiki)
				},
				// Class names for the wrapper div
				// wrapperClasses: 'markdown-body'
			}),
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
      sourcemap: true,
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
      /* rollupOptions: {
        output: {
          manualChunks: {
            jsonWorker: [`monaco-editor/esm/vs/language/json/json.worker`],
            cssWorker: [`monaco-editor/esm/vs/language/css/css.worker`],
            htmlWorker: [`monaco-editor/esm/vs/language/html/html.worker`],
            tsWorker: [`monaco-editor/esm/vs/language/typescript/ts.worker`],
            editorWorker: [`monaco-editor/esm/vs/editor/editor.worker`]
          }
        }
      } */
    }
  }
})
