import store from "@/store";
import { ignore } from "@/router";


// 路由前置守卫
export function beforeGuards(to, from, next) {
	const { token, browser, app } = store.getters;
	// 窗口标题
	document.title = `${app.name} - ${to.meta.title}`
	// 判断是否有token
	if (token) {
		if (to.path.indexOf("/auth") === 0) {
			// 登录成功且 token 未过期，回到首页
			return next("/");
		}
		// 添加路由进程
		store.commit("ADD_PROCESS", {
			label: (to.meta && to.meta.title) || to.name,
			value: to.fullPath
		});
	} else {
		if (!ignore.token.some(e => to.path.indexOf(e) === 0)) {
			return next("/auth");
		}
	}
	// H5 下折叠左侧菜单
	if (browser.isMobile) {
		store.commit("COLLAPSE_MENU", true);
	}
	next();
}



