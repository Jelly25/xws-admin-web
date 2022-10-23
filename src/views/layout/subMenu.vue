<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon :type="props.menuInfo.meta.icon" /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="item.meta.display&&!item.children" :key="item.name">
        <a-icon :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else-if="item.meta.display&&item.children" :key="item.name" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
export default {
	name:"SubMenu",
	props:["menuInfo"]
}
</script>
