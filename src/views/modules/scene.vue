<template>
	<div id="cesiumViewer"></div>
</template>

<script>
var viewer;
export default {
	name:"Scene",
	data() {
		return {

		}
	},
	beforeCreate(){

	},
	mounted(){
		this.init()
	},
	methods: {
		init() {
			Cesium.Ion.defaultAccessToken =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZjQzOTgxYS1hNjM2LTQyMDMtYmYzMi0zMDIzYTU1ZWQ3ODMiLCJpZCI6ODcxNzgsImlhdCI6MTY0OTM5OTgyNH0.GnvG86NDUPZofYwOiq_TrX5DWXZu3bJJmpGuhv9HiUQ';
			// 默认定位到中国上空
			Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(80, 22, 130, 55)
			// 摄像机默认视口远近
			Cesium.Camera.DEFAULT_VIEW_FACTOR=0.5
			// 摄像机默认pitch为90deg
			Cesium.Camera.DEFAULT_OFFSET=new Cesium.HeadingPitchRange(0,Cesium.Math.toRadians(-90),0)
			viewer = new Cesium.Viewer('cesiumViewer', {
				geocoder: false,
				homeButton: false,
				sceneModePicker: false,
				baseLayerPicker: false,
				navigationHelpButton: false,
				animation: false,
				timeline: false,
				fullscreenButton: false,
				vrButton: false,
				infoBox: false,
				selectionIndicator: false,
				// shadows: true,
				// terrainShadows: Cesium.ShadowMode.ENABLED,
				imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
					url: "https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&tk=a29f63fdb9514b7b529b39c72722bbff",
				}),
				// terrainProvider: Cesium.createWorldTerrain(), // 创建世界地形
			})
			// 版权清理
			viewer.cesiumWidget.creditContainer.style.display = "none";
			viewer.bottomContainer.style.display = "none";
			// 禁用光照
			viewer.scene.globe.enableLighting = false;
			// 手机或pad加载时提高画质
			if(Cesium.FeatureDetection.supportsImageRenderingPixelated()){
					viewer.resolutionScale = window.devicePixelRatio;
			}
			// 开启抗锯齿
			viewer.scene.fxaa = true;
			viewer.scene.postProcessStages.fxaa.enabled = true
		},
	},
}
</script>

<style lang="less" scoped>
#cesiumViewer{
	width: 100%;
	height: 100%;
}
</style>
