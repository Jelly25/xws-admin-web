import router from "@/router";
import { revisePath } from "@/utils";
const modules = import.meta.glob('../../views/**/*.vue') // vite 文件导入vue模块

/**
 * 添加动态路由
 * @param {Array} menuLists
 * {
 * 	 component:"", 组件实例,
 * 	 filePath:"", 组件所在的文件路径(可能为本地组件也可能为iframe内嵌组件),
 *   meta:{ 组件元数据
 *		 title:"",
 *		 keepAlive:"",
 *   }
 * }
 */
export default function addDynamicRoutes(menuLists = []) {
	// 遍历menuLists生成router对象
	menuLists.map(e => {
		if (!e.component) {
			if (e.filePath) {
				if (/^(http[s]?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(e.filePath)) {
					// 组件为iframe嵌套网页
					e.path = revisePath(e.name)
					e.meta.iframeUrl = e.filePath;
					// e.component = () => import("@/views/pages/iframe/index.vue");
					e.component = modules[`../../views/pages/iframe/iframe.vue`]
				} else {
					// 生成component组件实例
					e.path = revisePath(e.name)
					// e.component = () => import(`@/${e.filePath}`/* @vite-ignore */); // vite中这么写会导致无法找到该模块
					e.component = modules[`../../${e.filePath}.vue`]
				}
			} else {
				e.redirect = "/404";
			}
		}
	});
	// 遍历添加路由
	menuLists.forEach(e => {
		router.addRoute("index", e);
	});
}
