import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import bootstrap from "@/common";
import './antd'

Vue.config.productionTip = false

// 应用启动程序
bootstrap()
	.then(async () => {
		// 加载菜单、用户信息
		await store.dispatch("appLoad");
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	})
	.catch(err => {
		Vue.prototype.$message.error(`应用程序启动失败:${err}`)
	});
