<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Detail,Profile">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <MainTabBar />
</template>

<script lang="ts">
import MainTabBar from '@/components/common/MainTabBar.vue';
// vuex
import { useStore } from 'vuex';
export default {
  components: {
    MainTabBar,
  },
  setup(): void {
    const store = useStore();
    // 先检查 localStorage 是否有数据
    const localList = localStorage.getItem('cartList');
    if (localList) {
      store.commit('restoreLocal', JSON.parse(localList));
    }
  },
};
</script>

<style lang="scss"></style>
