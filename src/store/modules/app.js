import { app } from "@/config/env";
import { storage, deepMerge, getBrowser } from "@/utils";
const browser = getBrowser();

export default {
	state: {
		info: {
			...app
		},
		browser,
		collapse: browser.isMini ? true : false,
		contentLoading: false,
	},
	getters: {
		// 应用配置
		app: state => state.info,
		// 浏览器信息
		browser: state => state.browser,
		// 左侧菜单是否收起
		menuCollapse: state => state.collapse,
		// 模块区域加载
		contentLoading: state => state.contentLoading,
	},
	mutations: {
		// 设置浏览器信息
		SET_BROWSER(state) {
			state.browser = getBrowser();
		},
		// 切换加载状态
		TOGGLE_LOADING(state, val = false) {
			state.contentLoading = val;
		},
		// 收起左侧菜单
		COLLAPSE_MENU(state, val = false) {
			state.collapse = val;
		},
		// 更新应用配置
		UPDATE_APP(state, val) {
			deepMerge(state.info, val);
			storage.set("__app__", state.info);
		}
	},
	actions: {
		// 应用重载
		async appLoad({ getters, dispatch }) {
			// 如果token存在则重新获取用户信息、权限列表以及菜单列表
			if (getters.token) {
				// 获取用户信息
				dispatch("userInfo", { options: { needToast: false } });
				// 获取菜单和权限列表
				await dispatch("permMenus", { options: { needToast: false } });
			}
		}
	},
};
