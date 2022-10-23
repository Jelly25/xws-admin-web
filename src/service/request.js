import axios from "axios";
import store from "@/store";
import router from '@/router'
import Cookies from 'js-cookie'
import { Message } from "ant-design-vue";
import { isDev, baseURL } from "@/config/env";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 设置axios请求参数
const http = axios.create({
	baseURL: baseURL,
	timeout: 1000 * 180,
	withCredentials: true
})

// NProgress进度条配置(不显示加载图标)
NProgress.configure({
	showSpinner: false
});

// 忽略规则
const ignore = {
	NProgress: [""],
	token: ["/login"]
};

const defaultOptions = () => {
	return {
		needToast: true,
		needProgress: true
	}
}
/**
 * Request拦截器
 * config 配置
 * config.needToast {Boolean} default true 响应时添加message提示
 * config.needProgress {Boolean} default true 请求时是否需要进度条
 */
http.interceptors.request.use(config => {
	let options = Object.assign(defaultOptions(), config.options)
	// 设置headers语言和token
	config.headers['Accept-Language'] = Cookies.get('language') || 'zh-CN'
	// 白名单逻辑判断监测
	if (config.url) {
		if (!ignore.token.some(e => config.url.includes(e))) {
			config.headers["Authorization"] = Cookies.get('token') || "";
		}
		if (options.needProgress) {
			NProgress.start();
		}
	}
	// 开发环境打印接口请求信息
	if (isDev) {
		console.group(config.url);
		console.log("method:", config.method);
		console.table("options:", options);
		console.table("data:", config.method == "get" ? config.params : config.data);
		console.groupEnd();
	}
	return config;
}, error => {
	return Promise.reject(error);
});

// Response
http.interceptors.response.use(async res => {
	let options = Object.assign(defaultOptions, res.config.options)
	NProgress.done();
	if (!res.data) return res;
	const { errCode, data, errMsg } = res.data;
	switch (errCode) {
		case 0:
			if (options.needToast) Message.success(errMsg, 2)
			return data;
		case 401:
			await store.dispatch("userRemove");
			Message.warning('登录已过期,请重新登录...', 2, () => {
				router.replace("/auth")
			})
			return Promise.reject(res.data);
		default:
			if (options.needToast) Message.error(errMsg, 2)
			return Promise.reject(res.data);
	}
}, error => {
	NProgress.done();
	Message.error(error.message)
	return Promise.reject(error.message)
});

export default http;
