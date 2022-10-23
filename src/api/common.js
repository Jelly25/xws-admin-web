import { BaseService } from "@/service";

class Common extends BaseService {

	// 登录
	login({ data = {}, options = {} }) {
		return this.request({
			url: "/login",
			method: "POST",
			data,
			options
		});
	}

	// 注册
	register({ data = {}, options = {} }) {
		return this.request({
			url: "/register",
			method: "POST",
			data,
			options
		});
	}

	// 登出
	logout({ data = {}, options = {} }) {
		return this.request({
			url: "/logout",
			method: "POST",
			data,
			options
		});
	}

	// 获取菜单
	getPermMenus({ params = {}, options = {} }) {
		return this.request({
			url: "/sys/permmenus",
			method: "GET",
			params,
			options
		});
	}
}

export default Common;



