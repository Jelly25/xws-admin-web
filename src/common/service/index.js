import store from "@/store";
import Vue from "vue";
import path from "path-browserify";

/**
 * @description: 将service api挂载到vue实例上
 * @author: jelly25
 * @date: 2022-07-24
 */
export default async function () {
	// 需要忽略的api模块
	const ignoreService = [];
	// 解析出来的api模块
	let modules = {};
	// 引入所有api模块
	const files = import.meta.globEager("../../api/**/*.js")
	// 解析模块
	Object.keys(files)
		.filter(e => !ignoreService.includes(e))
		.forEach(e => {
			let list = e.substr(10).split("/");
			let parents = list.slice(0, list.length - 1);
			let name = path.basename(e, ".js");
			let curr = modules;
			// let prev = null;
			// let key = null;
			// parents.forEach(k => {
			// 	console.log(k)
			// 	if (!curr[k]) {
			// 		curr[k] = {};
			// 	}
			// 	prev = curr;
			// 	curr = curr[k];
			// 	key = k;
			// });
			let ep = files[e];
			if (ep.default) {
				let service = new ep.default();
				if (name == "index") {
					return Promise.reject(`${e}:Service Module doesn't need 'index'`);
					// prev[key] = service;
				} else {
					curr[name] = service;
				}
			} else {
				return Promise.reject(`${e}:Service Module must use 'export default'`);
			}
		})
	Vue.prototype.$service = store.$service = modules;
}
