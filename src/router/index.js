import Vue from "vue";
import VueRouter from "vue-router";

// Remove Navigating to current location (XXX) is not allowed
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error);
};

const routerReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function Replace(location) {
	return routerReplace.call(this, location).catch(error => error);
};

Vue.use(VueRouter);

// 忽略规则
const ignore = {
	token: ["/auth", "/terms", "/privacy", "/403", "/404", "/500"]
};

// 页面路由
const pageRoutes = [
	{
		path: "/auth",
		name: "auth",
		component: () => import("@/views/pages/auth/auth"),
		meta: { title: '认证登录页' },
	},
	{
		path: "/terms",
		name: "terms",
		component: () => import("@/views/pages/auth/terms"),
		meta: { title: '用户服务协议' },
	},
	{
		path: "/privacy",
		name: "privacy",
		component: () => import("@/views/pages/auth/privacy"),
		meta: { title: '隐私政策' },
	},
	{
		path: '/403',
		component: () => import('@/views/pages/errorPage/403'),
		name: '403',
		meta: {
			title: '无权访问该页面'
		}
	},
	{
		path: '/404',
		component: () => import('@/views/pages/errorPage/404'),
		name: '404',
		meta: {
			title: '页面找不到了'
		}
	},
	{
		path: '/500',
		component: () => import('@/views/pages/errorPage/500'),
		name: '500',
		meta: {
			title: '服务器错误'
		}
	},
	// 添加404匹配(未注册或未找到的路由通知跳转至404页面)
	{
		path: '*',
		redirect: '/404'
	}
]

// 静态模块路由列表
const staticModuleRoutes = [
	{
		path: "/",
		name: "index",
		component: () => import("@/views/layout/index.vue"),
		redirect: { path: '/scene' },
		meta: {
			title: '首页',
		},
		children: [
			{
				path: "/scene",
				name: "scene",
				meta: {
					title: '工作台',
					icon: "tablet",
					keepAlive: true,
					display: true,
				},
				component: () => import("@/views/modules/scene.vue")
			}
		]
	},
];

// 注册路由
const Router = new VueRouter({
	routes: pageRoutes.concat(staticModuleRoutes),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { x: 0, y: 0 };
		}
	}
});

export { ignore, staticModuleRoutes };
export default Router;
