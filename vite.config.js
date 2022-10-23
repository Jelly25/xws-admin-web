import { defineConfig } from 'vite'
import { createVuePlugin } from "vite-plugin-vue2"
import usePluginImport from 'vite-plugin-importer'
import { createHtmlPlugin } from 'vite-plugin-html';
import { visualizer } from 'rollup-plugin-visualizer';
import { SplitVendorChunkCache, staticImportedByEntry } from './src/utils/rollup'

export default ({ mode }) => {
	return defineConfig({
		base: mode === 'development' ? '/' : './',
		server: {
			open: true,
			hmr: {
				overlay: false
			}
		},
		plugins: [
			// vue2插件
			createVuePlugin(),
			// html插件
			createHtmlPlugin({
				minify: true,
				entry: "src/main.js",
				inject: {
					data: {
						title: "admin-web",
					}
				},
			}),
			// 按需引入(样式选择整体引入，因为插件的style属性除了引入对应组件的样式,也会引入一些必要的全局样式,导致打包较大。)
			usePluginImport({
				libraryName: 'ant-design-vue',
				libraryDirectory: 'lib',
				// style: "css",
				// style(name) {
				// 	return `${name}/style/index.css`;
				// }
			}),
			// 打包分析
			visualizer()
		],
		resolve: {
			/* alias映射 */
			alias: {
				"@": "/src"
			},
			/* 配置后缀扩展名（引入时可不加文件扩展名） */
			extensions: [".vue", ".js", ".json"],
		},
		build: {
			// chunk大小警告限制(默认500kb)
			chunkSizeWarningLimit: 1500,
			// 打包选项
			rollupOptions: {
				output: { //静态资源分类打包
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
					// 手动分包(解决chunk碎片化问题)
					manualChunks(id, { getModuleInfo }) {
						// const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`;
						// const cssLangRE = new RegExp(cssLangs);
						// const isCSSRequest = (request) => cssLangRE.test(request);
						// 分vendor包
						// if (id.includes('node_modules') && !isCSSRequest(id) && staticImportedByEntry(id, getModuleInfo, new SplitVendorChunkCache().cache)) {
						// 	return 'vendor';
						// }
						// 分manifest包
						if (((getModuleInfo(id).importers.length + getModuleInfo(id).dynamicImporters.length) > 1) && id.includes('src')) {
							return 'manifest';
						}
					}
				}
			}
		}
	})
}

