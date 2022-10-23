<template>
	<div class="page-iframe">
		<iframe :src="url" frameborder="0"></iframe>
	</div>
</template>

<script>
export default {
	data() {
		return {
			url: ""
		};
	},

	watch: {
		$route: {
			handler({ meta }) {
				this.url = meta.iframeUrl;
			},
			immediate: true
		}
	},

	mounted() {
		const iframe = this.$el.querySelector("iframe");
		// this.loading = true;
		// iframe.onload = () => {
		// 	this.loading = false;
		// };
	}
};
</script>

<style lang="less" scoped>
.page-iframe {
	height: 100%;

	iframe {
		height: 100%;
		width: 100%;
	}
}
</style>
