import request from "./request";
import { baseURL, isDev } from "@/config/env";

export default class BaseService {
	constructor() {
		const crud = {
			page: "page",
			list: "list",
			info: "info",
			add: "add",
			delete: "delete",
			update: "update"
		};
		// 权限点
		if (!this.permission) this.permission = {}
		for (let i in crud) {
			if (this.namespace) {
				this.permission[i] = this.namespace.replace(/\//g, ":") + ":" + crud[i];
			} else {
				this.permission[i] = crud[i];
			}
		}
	}
	// http请求
	request(options = {}) {
		if (!options.params) options.params = {}
		let ns = "";
		// 是否 mock 模式
		if (!this.mock) {
			if (isDev) {
				ns = this.proxy || baseURL;
			} else {
				ns = this.proxy ? this.url : baseURL;
			}
		}
		// 拼接前缀
		if (this.namespace) {
			ns += "/" + this.namespace;
		}
		// 处理 http
		if (options.url.indexOf("http") !== 0) {
			options.url = ns + options.url;
		}
		return request(options);
	}
	// list请求
	list(data) {
		return this.request({
			url: "/list",
			method: "POST",
			data
		});
	}
	// page请求
	page(data) {
		return this.request({
			url: "/page",
			method: "POST",
			data
		});
	}
	// info请求
	info(params) {
		return this.request({
			url: "/info",
			params
		});
	}
	// update请求
	update(data) {
		return this.request({
			url: "/update",
			method: "POST",
			data
		});
	}
	// delete请求
	delete(data) {
		return this.request({
			url: "/delete",
			method: "POST",
			data
		});
	}
	// add请求
	add(data) {
		return this.request({
			url: "/add",
			method: "POST",
			data
		});
	}
}
