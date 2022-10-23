<template>
	<a-layout-sider v-model="menuCollapse" :trigger="null" collapsible>
		<div class="sidebar__logo">
			<img src="@/assets/images/app-logo.png" />
			<span v-show="!menuCollapse">{{app.name}}</span>
		</div>
		<a-menu theme="dark" mode="inline" :inlineIndent="15" :selected-keys="activeMenu" @click="handleNavToPath">
			<template v-for="item in sideMenus">
        <a-menu-item v-if="item.meta.display==true&&!item.children" :key="item.name" :title="item.meta.title">
          <a-icon :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else-if="item.meta.display==true&&item.children" :menu-info="item" :key="item.name" />
      </template>
		</a-menu>
	</a-layout-sider>
</template>

<script>
import { mapGetters } from "vuex";
import SubMenu from "./subMenu.vue";
export default {
	components:{ SubMenu },
	name:"SideBar",
	computed:{
		...mapGetters(["app","menuCollapse","sideMenus"]),
		activeMenu(){
			return [this.$route.name]
		}
	},
	methods:{
		handleNavToPath({item, key, keyPath}){
			this.$router.push({name:key})
		}
	}
}
</script>

<style lang="less" scoped>
.sidebar__logo {
  display: flex;
	align-items: center;
	justify-content: center;
	height: 80px;
	cursor: pointer;
	user-select: none;

	img {
		height: 30px;
		width: 30px;
	}

	span {
		color: #fff;
		font-weight: bold;
		font-size: 26px;
		margin-left: 10px;
		font-family: inherit;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
