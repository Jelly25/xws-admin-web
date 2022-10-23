<template>
	<div class="captcha-module">
		<img :src="'https://api.xwsbj.com/zhyl/captcha?uuid='+uuid" @click="handleRefreshCaptcha">
	</div>
</template>

<script>
import { getUUID } from "@/utils";
export default {
	name:"Captcha",
	data() {
		return {
			uuid:""
		}
	},
	created(){
		this.handleRefreshCaptcha()
	},
	methods: {
		handleRefreshCaptcha(){
			this.uuid = getUUID()
			this.$emit("receiveUUID",this.uuid)
		}
	},
}
</script>

<style lang="less" scoped>
.captcha-module{
	width: 160px;
	height: 40px;
	padding-left:20px;

	img{
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
}
</style>
