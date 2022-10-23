
import SET_ROUTER from "./router";
import SET_SERVICE from "./service";
import "./browser/resize";

function loadCesium() {
	return new Promise((resolve, reject) => {
		let script = document.createElement("script")
		script.type = 'text/javascript'
		script.src = "https://static.xwsbj.com/web/npm/cesium@1.80.0/Cesium.js"
		document.head.append(script)
		script.onload = function () {
			resolve()
		}
		script.onerror = function () {
			reject("脚本加载失败,请稍后重试")
		}
	})
}

async function bootstrap() {
	try {
		await loadCesium()
		await SET_ROUTER();
		await SET_SERVICE();
	} catch (error) {
		return Promise.reject(error)
	}
}

export default bootstrap;
