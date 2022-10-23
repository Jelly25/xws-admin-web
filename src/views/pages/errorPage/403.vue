<template>
	<div class="page-403">
		<a-result status="403" title="403" sub-title="抱歉，您没有权限访问该页面！">
			<template #extra>
				<a-button type="primary" @click="$router.push('/')">返回首页</a-button>
			</template>
		</a-result>
	</div>
</template>
<script>

export default {
	name:"403"
};
</script>

<style lang="less" scoped>
.page-403{
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
