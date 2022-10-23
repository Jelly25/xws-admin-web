<template>
	<div class="terms-container">
		<h1 class="terms-title">智慧城市用户服务协议</h1>
		<div class="terms-date"></div>
		<div class="terms-content"></div>
	</div>
</template>

<script>
export default {
	name:"Terms"
}
</script>

<style lang="less" scoped>
.terms-container{
	min-height: 20px;
	max-width: 960px;
	padding: 60px 30px;
	margin: 0 auto;

	.terms-title{
		margin: 0;
		color: #1f2329;
    font-size: 36px;
    font-weight: 600;
    line-height: 54px;
	}
}

@media screen and (max-width: 850px) {
	.terms-title {
		font-size: 22px;
		line-height: 30px;
	}
}
</style>
