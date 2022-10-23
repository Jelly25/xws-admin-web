<template>
	<a-layout-header id="page-layout_nav">
		<div class="app-topbar__left">
			<a-icon class="trigger-fold" style="fontSize:20px" :type="menuCollapse ? 'menu-unfold' : 'menu-fold'" @click="COLLAPSE_MENU(!menuCollapse)"></a-icon>
		</div>
		<div class="app-topbar__right">
			<div class="app-topbar__settings">
				<a-icon style="fontSize:20px;cursor:pointer" :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'" @click="toggleFullscreen()"></a-icon>
			</div>
			<div class="app-topbar__user">
				<a-dropdown :trigger="['click']">
					<div class="userinfo">
						<span class="user_name">{{userInfo.username}}</span>
						<a-avatar icon="user" @click="e => e.preventDefault()"/>
					</div>
					<a-menu slot="overlay">
						<a-menu-item key="1">修改密码</a-menu-item>
						<a-menu-item key="2" @click="handleLogout">退出登录</a-menu-item>
					</a-menu>
				</a-dropdown>
			</div>
		</div>
  </a-layout-header>
</template>

<script>
import { mapGetters,mapMutations,mapActions } from "vuex";
import { api as $fullscreen } from 'vue-fullscreen';
export default {
	name:"NavBar",
	data() {
		return {
			fullscreen:false,
		}
	},
	computed:{
		...mapGetters(["menuCollapse","userInfo"]),
	},
	methods:{
		...mapMutations(["COLLAPSE_MENU"]),
		...mapActions(["userLogout"]),
		// 全屏切换
		async toggleFullscreen(){
			await $fullscreen.toggle()
      this.fullscreen = !$fullscreen.isFullscreen
		},
		// 执行退出操作
		async handleLogout(){
			await this.userLogout()
			this.$router.push("/auth")
		}
	}
}
</script>

<style lang="less" scoped>
#page-layout_nav{
	display:flex;
	justify-content:space-between;
	align-items:center;
	padding: 0 10px;
	height: 50px;
	line-height: 50px;
	background:#fff;

	.app-topbar__left{
		display:flex;
		align-items:center;

		.trigger-fold{
			display:flex;
			cursor:pointer
		}
	}

	.app-topbar__right{
		display: flex;
		align-items: center;

		.app-topbar__settings{
			margin-right: 20px;
			/deep/ .anticon{
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.app-topbar__user{
			.userinfo {
				display: flex;
				align-items: center;
				cursor: pointer;

				.user_name {
					font-size: 20px;
					margin-right: 10px;
				}
			}
		}
	}
}
</style>
