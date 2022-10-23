<template>
	<div class="page-404">
		<a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在！">
			<template #extra>
				<a-button type="primary" @click="$router.push('/')">返回首页</a-button>
			</template>
		</a-result>
	</div>
</template>

<script>
export default {
	name:"404"
};
</script>

<style lang="less" scoped>
.page-404{
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
