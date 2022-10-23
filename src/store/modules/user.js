import { storage } from "@/utils"
import Cookies from "js-cookie";

export default {
	state: {
		token: storage.get("__token__") || "",
		userInfo: storage.get("__userInfo__") || {},
		permLists: storage.get("__permLists__") || []
	},
	getters: {
		userInfo: state => state.userInfo,
		token: state => state.token,
		permLists: state => state.permLists
	},
	mutations: {
		// 设置授权标识
		SET_TOKEN(state, { token, expire }) {
			state.token = token;
			storage.set("__token__", token);
			Cookies.set("token", token, {
				expires: new Date(Date.now() + expire * 1000),
			});
		},
		// 移除授权标识
		CLEAR_TOKEN(state) {
			state.token = null;
			storage.clear("__token__");
			Cookies.remove("token")
		},
		// 设置用户信息
		SET_USERINFO(state, val) {
			state.info = val;
			storage.set("__userInfo__", val);
		},
		// 移除用户信息
		CLEAR_USER(state) {
			state.info = {};
			storage.clear("__userInfo__");
		},
		// 设置权限列表
		SET_PERMLISTS(state, lists) {
			state.permLists = lists
			storage.set("__permLists__", lists);
		},
		// 移除权限列表
		CLEAR_PERMLISTS(state) {
			state.permLists = []
			storage.clear("__permLists__");
		},
	},
	actions: {
		// 用户登录
		userLogin({ commit, dispatch }, payload = {}) {
			return this.$service.common.login(payload)
				.then(res => {
					commit("SET_TOKEN", res);
				})
				.catch(err => {
					dispatch("userRemove")
					return Promise.reject('登录失败!')
				});
		},
		// 用户退出
		userLogout({ dispatch }, payload = {}) {
			return this.$service.common.logout(payload).then(res => {
				dispatch("userRemove")
			})
		},
		// 用户信息
		userInfo({ commit, dispatch }, payload = {}) {
			return this.$service.user.getUserInfo(payload)
				.then(res => {
					commit("SET_USERINFO", res);
				})
				.catch(err => {
					dispatch("userRemove")
					return Promise.reject('获取用户信息失败!')
				});
		},
		// 权限列表
		permMenus({ commit, dispatch }, payload = {}) {
			return this.$service.common.getPermMenus(payload)
				.then(res => {
					dispatch("menuLists", res.menuLists || [])
					if (Array.isArray(res.perms)) {
						if (res.perms.length === 0) {
							dispatch("userRemove")
							return Promise.reject('该账号没有权限!')
						} else {
							commit("SET_PERMLISTS", res.perms);
						}
					} else {
						dispatch("userRemove")
						return Promise.reject('获取权限失败!')
					}
				})
				.catch(err => {
					dispatch("userRemove")
					return Promise.reject('获取权限菜单错误!')
				})
		},
		// 用户退出/token失效
		userRemove({ commit }) {
			commit("CLEAR_TOKEN");
			commit("CLEAR_USER");
			commit("CLEAR_PERMLISTS")
			commit("RESET_PROCESS");
			commit("RESET_MENULISTS");
		},
	},
};
