import router from "@/router";
import addDynamicRoutes from "./dynamic"
import { beforeGuards } from "./guards"

export default async function () {
	// 添加动态路由方法
	router.addDynamicRoutes = addDynamicRoutes
	// 路由守卫
	router.beforeEach(beforeGuards)
}
