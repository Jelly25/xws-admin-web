import { storage } from "../utils"

// 路由模式
export const routerMode = "hash";
// 开发模式
export const isDev = import.meta.env.MODE.includes("development");
// Socket地址
export const socketUrl = 'your server url';

// 请求基础路径
export const baseURL = (function () {
	let apiURL = ""
	switch (import.meta.env.VITE_APP_NODE_ENV) {
		case "DEV":
			apiURL = 'your server url'
			break;
		case "DEV_FASTMOCK":
			apiURL = 'https://www.fastmock.site/mock/ed4c5ac83d9858e2e7fbcace4f9a5085/earth3d-api'
			break;
		case "PROD":
			apiURL = "https://www.fastmock.site/mock/ed4c5ac83d9858e2e7fbcace4f9a5085/earth3d-api"
			break;
		default:
			apiURL = ""
			break;
	}
	return apiURL
})();


// 程序配置参数
export const app = storage.get("__app__") || {
	name: "admin-web",
	config: {
		showAMenu: false, // 是否显示一级菜单栏
		showProcess: true, // 是否显示页面进程栏
		customMenu: true // 自定义菜单
	}
};

// 自定义菜单列表
export const customMenuList = [
	{
		id: "b9a5264e1af04d5aaecd0f089e5b6e3b",
		pid: "0",
		name: "logs",
		filePath: "",
		meta: { title: '日志管理', icon: "file", keepAlive: true, display: true },
		type: 0, // 0-->目录 1==>菜单
		children: [
			{
				id: "374dcceb3a734e649f01fdd8afaa63c3",
				pid: "b9a5264e1af04d5aaecd0f089e5b6e3b",
				name: "logs/login",
				filePath: "views/modules/logs/loginLog",
				meta: { title: '登录日志', icon: "file-text", keepAlive: true, display: true },
				type: 1, // 0-->目录 1==>菜单
			}
		]
	},
	{
		id: "dedd6fef7f224d8ab92415da8a321a28",
		pid: "0",
		name: "sys",
		filePath: "",
		meta: { title: '系统管理', icon: "setting", keepAlive: true, display: true },
		type: 0, // 0-->目录 1==>菜单
		children: [
			{
				id: "42e964a24f464134be05dbd98e3d54ad",
				pid: "dedd6fef7f224d8ab92415da8a321a28",
				name: "sys/user",
				filePath: "views/modules/system/user",
				meta: { title: '用户管理', icon: "user", keepAlive: true, display: true },
				type: 1, // 0-->目录 1==>菜单
			},
			{
				id: "987871f0592e467dada8086408395923",
				pid: "dedd6fef7f224d8ab92415da8a321a28",
				name: "sys/role",
				filePath: "views/modules/system/role",
				meta: { title: '角色管理', icon: "user-add", keepAlive: true, display: true },
				type: 1, // 0-->目录 1==>菜单
			},
			{
				id: "93730676d36d4fc38dde9c40d7d3ab1f",
				pid: "dedd6fef7f224d8ab92415da8a321a28",
				name: "sys/dept",
				filePath: "views/modules/system/dept",
				meta: { title: '部门管理', icon: "usergroup-add", keepAlive: true, display: true },
				type: 1, // 0-->目录 1==>菜单
			}
		]
	},
	{
		id: "b9a5264e1af04d5aaecd0f089e5b6e7b",
		pid: "0",
		name: "docs",
		filePath: "",
		meta: { title: 'antv文档', icon: "file", keepAlive: true, display: true },
		type: 0, // 0-->目录 1==>菜单
		children: [
			{
				id: "374dcceb3a734e649f01fdd8afaa63c8",
				pid: "b9a5264e1af04d5aaecd0f089e5b6e7b",
				name: "docs/antv",
				filePath: "https://1x.antdv.com",
				meta: { title: '文档', icon: "file-text", keepAlive: false, display: true },
				type: 1, // 0-->目录 1==>菜单
			}
		]
	},
]
