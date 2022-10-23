<template>
	<div class="app-process">
		<div class="app-process__left" @click="toScroll(true)">
			<a-icon type="left" />
		</div>
		<div class="app-process__scroller" ref="scroller">
			<div class="app-process__item" v-for="(item, index) in processList" :key="index" :ref="`item-${index}`" :class="{ active: item.active }" :data-index="index" @click="onTap(item, index)">
				<a-dropdown :trigger="['contextmenu']">
					<div class="dropdown-trigger-box">
						<span>{{ item.label }}</span>
						<a-icon type="close" class="icon-close" v-if="index > 0 && item.active" @click="onDel(index)"/>
					</div>
					<a-menu slot="overlay">
						<a-menu-item key="1" v-if="index > 0" @click="handleClickCtxMenu('current',item.value)">关闭当前</a-menu-item>
						<a-menu-item key="2" @click="handleClickCtxMenu('other',item.value)">关闭其它</a-menu-item>
						<a-menu-item key="3" @click="handleClickCtxMenu('all')">关闭所有</a-menu-item>
					</a-menu>
				</a-dropdown>
			</div>
		</div>
		<div class="app-process__right" @click="toScroll(false)">
			<a-icon type="right" />
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { last } from "@/utils";

export default {
	name: "Process",
	computed: {
		...mapGetters(["processList"])
	},
	watch: {
		"$route.path"(val) {
			this.adScroll(this.processList.findIndex((e) => e.value === val) || 0);
		}
	},
	mounted(){
	},
	methods: {
		...mapMutations(["ADD_PROCESS", "DEL_PROCESS", "SET_PROCESS","RESET_PROCESS"]),
		// 点击进程栏事件
		onTap(item, index) {
			this.adScroll(index);
			this.$router.push(item.value);
		},
		// 删除进程
		onDel(index) {
			this.DEL_PROCESS(index);
			this.toPath();
		},
		// 右键进程栏触发事件
		handleClickCtxMenu(type,path){
			switch (type) {
				case "current":
					this.onDel(this.processList.findIndex((e) => e.value == path));
					this.toPath()
					break;
				case "other":
					this.SET_PROCESS(this.processList.filter((e) => e.value == path || e.value == "/scene"));
					this.toPath()
					break;
				case "all":
					this.RESET_PROCESS()
					this.toPath()
					break;
				default:
					break;
			}
		},
		// 删除进程后重置当前进程为最后一个tab
		toPath() {
			const active = this.processList.find((e) => e.active);
			if (!active) {
				const next = last(this.processList);
				this.$router.push(next ? next.value : "/");
			}
		},
		// 进程较多时点击进程栏同时会自动向左向右滚动距离以展示较近的tab
		adScroll(index) {
			if (index < 0) {
				index = 0;
			}
			const el = this.$refs[`item-${index}`][0];
			if (el) {
				this.scrollTo(el.offsetLeft + el.clientWidth - this.$refs["scroller"].clientWidth);
			}
		},
		// 进程栏左右滚动
		toScroll(f) {
			this.scrollTo(this.$refs["scroller"].scrollLeft + (f ? -100 : 100));
		},
		scrollTo(left) {
			this.$refs["scroller"].scrollTo({
				left,
				behavior: "smooth"
			});
		}
	}
};
</script>

<style lang="less" scoped>
.app-process {
	display: flex;
	align-items: center;
	height: 30px;
	position: relative;

	&__left,
	&__right {
		background-color: #fff;
		height: 30px;
		line-height: 30px;
		padding: 0 2px;
		border-radius: 3px;
		cursor: pointer;

		&:hover {
			background-color: #eee;
		}

		/deep/ .anticon{
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	&__left {
		margin-right: 10px;
	}

	&__right {
		margin-left: 10px;
	}

	&__scroller {
		width: 100%;
		flex: 1;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	&__item {
		display: inline-flex;
		align-items: center;
		border-radius: 3px;
		height: 30px;
		background-color: #fff;
		font-size: 12px;
		margin-right: 10px;
		color: #909399;
		cursor: pointer;

		&:last-child {
			margin-right: 0;
		}

		&.active {
			span {
				color: #4165d7;
				font-weight: 700;
				user-select: none;
			}
		}

		&:not(.active):hover{
			background-color: #eee;
		}

		.dropdown-trigger-box{
			display: flex;
			padding: 0 10px;

			.icon-close {
				width: 14px;
				margin-left: 5px;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover{
					color: #fff;
					background-color: #4165d7;
				}
			}
		}
	}
}
</style>
