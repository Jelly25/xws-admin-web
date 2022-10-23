import { join } from 'path-browserify'

// 本地存储
export const storage = {
	set(key, value) {
		value = JSON.stringify(value)
		localStorage.setItem(key, value)
	},
	get(key) {
		let value = localStorage.getItem(key)
		return JSON.parse(value)
	},
	clear(key) {
		localStorage.removeItem(key)
	},
	clearAll() {
		localStorage.clear()
	}
}

// 获取url参数
export function getUrlParam(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

/**
 * 获取uuid
 */
export function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
	})
}

// 判断是否是pc端
export function isPc() {
	const userAgentInfo = navigator.userAgent;
	const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

// 获取浏览器相关信息
export function getBrowser() {
	const { clientHeight, clientWidth } = document.documentElement;
	// 浏览器信息
	const ua = navigator.userAgent.toLowerCase();
	// 浏览器类型
	let type = (ua.match(/firefox|chrome|safari|opera/g) || ["other"])[0];
	if ((ua.match(/msie|trident/g) || [])[0]) {
		type = "msie";
	}
	// 平台标签
	let tag = "";
	const isTocuh =
		"ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1;
	if (isTocuh) {
		if (ua.indexOf("ipad") !== -1) {
			tag = "pad";
		} else if (ua.indexOf("mobile") !== -1) {
			tag = "mobile";
		} else if (ua.indexOf("android") !== -1) {
			tag = "androidPad";
		} else {
			tag = "pc";
		}
	} else {
		tag = "pc";
	}
	// 浏览器内核
	let prefix = "";
	switch (type) {
		case "chrome":
		case "safari":
		case "mobile":
			prefix = "webkit";
			break;
		case "msie":
			prefix = "ms";
			break;
		case "firefox":
			prefix = "Moz";
			break;
		case "opera":
			prefix = "O";
			break;
		default:
			prefix = "webkit";
			break;
	}
	// 操作平台
	const plat = ua.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
	// 屏幕信息
	let screen = "full";
	if (clientWidth < 768) {
		screen = "xs";
	} else if (clientWidth < 992) {
		screen = "sm";
	} else if (clientWidth < 1200) {
		screen = "md";
	} else if (clientWidth < 1920) {
		screen = "xl";
	} else {
		screen = "full";
	}
	// 是否 ios
	const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	// 浏览器版本
	const version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];
	// 是否 PC 端
	const isPC = tag === "pc";
	// 是否移动端
	const isMobile = isPC ? false : true;
	// 是否移动端 + 屏幕宽过小
	const isMini = screen === "xs" || isMobile;
	return {
		height: clientHeight,
		width: clientWidth,
		version,
		type,
		plat,
		tag,
		prefix,
		isMobile,
		isIOS,
		isPC,
		isMini,
		screen
	};
}

// 兼容history和hash两种路由模式的跳转
export function href(path, newWindow) {
	const { origin, pathname } = window.location;
	if (pathname == path) {
		return false;
	}
	let url = "";
	if (routerMode == "history") {
		url = origin + join(process.env.BASE_URL, path)
	} else {
		url = href.substring(0, href.indexOf("#"));
	}
	if (newWindow) {
		window.open(url);
	} else {
		window.location.href = url;
	}
}

/**
 * 数组排序
 * @param {*} list 需要进行排序的数组
 * @param {*} key 排序字段
 * @returns
 */
export function orderBy(list, key) {
	return list.sort((a, b) => a[key] - b[key]);
}

/**
 * 一维数组转化为树形结构
 * @param {*} list 需要进行转化的数组
 * @param {*} treeId 根据哪个字段进行树形转化
 * @param {*} orderKey 根据哪个字段进行排序
 * @returns
 */
export function deepTree(list, treeId = "pid", orderKey) {
	let newList = [];
	let map = {};
	list.forEach((e) => (map[e.id] = e));
	list.forEach((e) => {
		let parent = map[e[treeId]];
		if (parent) {
			(parent.children || (parent.children = [])).push(e);
		} else {
			newList.push(e);
		}
	});
	const fn = (list) => {
		list.map((e) => {
			if (e.children instanceof Array) {
				if (orderKey) {
					e.children = orderBy(e.children, orderKey);
				}
				fn(e.children);
			}
		});
	};
	fn(newList);
	return orderKey ? orderBy(newList, orderKey) : newList;
}

/**
 * 树形结构转化为一维数组
 * @param {*} list 需要进行转化的数组
 * @returns
 */
export function revDeepTree(list = []) {
	let d = [];
	let id = 0;
	const deep = (list, pid) => {
		list.forEach((e) => {
			if (!e.id) {
				e.id = id++;
			}
			e.pid = pid;
			d.push(e);
			if (e.children && isArray(e.children)) {
				deep(e.children, e.id);
			}
		});
	};
	deep(list || [], null);
	return d;
}

/**
 * 防抖函数
 * @param {*} fn
 * @param {*} delay
 * @returns
 */
export function debounce(fn, delay) {
	let timer = null;
	return function () {
		let args = arguments;
		let context = this;
		if (timer) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		} else {
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		}
	};
}

/**
 * 判断是否为数组
 * @param {*} value 判断值
 * @returns
 */
export function isArray(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

/**
 * 判断是否为对象
 * @param {*} value 判断值
 * @returns
 */
export function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * 判断是否为数字
 * @param {*} value 判断值
 * @returns
 */
export function isNumber(value) {
	return !isNaN(Number(value));
}

/**
 * 判断是否为函数
 * @param {*} value 判断值
 * @returns
 */
export function isFunction(value) {
	return typeof value == "function";
}

/**
 * 判断是否为字符串
 * @param {*} value 判断值
 * @returns
 */
export function isString(value) {
	return typeof value == "string";
}

/**
 * 判断是否为空（空数组 空对象 空字符串 undefined null）
 * @param {*} value 判断值
 * @returns
 */
export function isEmpty(value) {
	if (isArray(value)) {
		return value.length === 0;
	}
	if (isObject(value)) {
		return Object.keys(value).length === 0;
	}
	return value === "" || value === undefined || value === null;
}

/**
 * 判断是否为布尔值
 * @param {*} value 判断值
 * @returns
 */
export function isBoolean(value) {
	return typeof value === "boolean";
}

/**
 * 获取数组或字符串最后一项
 * @param {*} value 数据值
 * @returns
 */
export function last(data) {
	if (isArray(data) || isString(data)) {
		return data[data.length - 1];
	}
}

/**
 * 深拷贝
 * @param {*} obj 拷贝对象
 * @returns
 */
export function cloneDeep(obj) {
	let d = isArray(obj) ? obj : {};
	if (isObject(obj)) {
		for (let key in obj) {
			if (obj.hasOwnProperty && obj.hasOwnProperty(key)) {
				if (obj[key] && typeof obj[key] === "object") {
					d[key] = cloneDeep(obj[key]);
				} else {
					d[key] = obj[key];
				}
			}
		}
	}
	return d;
}

/**
 * 对象浅拷贝
 * @param {*} obj
 * @returns
 */
export function clone(obj) {
	return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}

/**
 * 同Object.assign 合并对象
 * @param {*} a
 * @param {*} b
 * @returns
 */
export function deepMerge(a, b) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}

/**
 * 判断节点是否包含
 * @param {*} parent
 * @param {*} node
 * @returns
 */
export function contains(parent, node) {
	if (document.documentElement.contains) {
		return parent !== node && parent.contains(node);
	} else {
		while (node && (node = node.parentNode)) if (node === parent) return true;
		return false;
	}
}

/**
 * 路径前缀自动拼接“/”
 * @param {*} path
 * @returns
 */
export const revisePath = path => {
	if (!path) {
		return "";
	}
	if (path[0] == "/") {
		return path;
	} else {
		return `/${path}`;
	}
};

export function firstMenu(list) {
	let path = "";
	const fn = arr => {
		arr.forEach(e => {
			if (e.type == 1) {
				if (!path) {
					path = e.path;
				}
			} else {
				fn(e.children);
			}
		});
	};
	fn(list);
	return path || "/404";
}

/**
 * 创建link标签
 * @param {*} url
 * @param {*} id
 * @returns
 */
export function createLink(url, id) {
	const link = document.createElement("link");
	link.href = url;
	link.type = "text/css";
	link.rel = "stylesheet";
	if (id) {
		link.id = id;
	}
	document
		.getElementsByTagName("head")
		.item(0)
		.appendChild(link);
}

