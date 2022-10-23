<template>
	<div class="privacy-container">
		<h1 class="privacy-title">智慧城市隐私政策</h1>
		<div class="privacy-date"></div>
		<div class="privacy-content"></div>
	</div>
</template>

<script>
export default {
	name:"Privacy"
}
</script>

<style lang="less" scoped>
.privacy-container{
	min-height: 20px;
	max-width: 960px;
	padding: 60px 30px;
	margin: 0 auto;

	.privacy-title{
		margin: 0;
		color: #1f2329;
    font-size: 36px;
    font-weight: 600;
    line-height: 54px;
	}
}

@media screen and (max-width: 850px) {
	.privacy-title {
		font-size: 22px;
		line-height: 30px;
	}
}
</style>
