<template>
	<div class="page-500">
		<a-result status="500" title="500" sub-title="抱歉，服务器暂时出现问题了，请稍后重试！">
			<template #extra>
				<a-button type="primary" @click="$router.push('/')">返回首页</a-button>
			</template>
		</a-result>
	</div>
</template>
<script>

export default {
	name:"500"
};
</script>

<style lang="less" scoped>
.page-500{
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
