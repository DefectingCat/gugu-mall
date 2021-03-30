<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
  <MainTabBar />
</template>

<script lang="ts">
import MainTabBar from '@/components/common/MainTabBar.vue';
export default {
  components: {
    MainTabBar,
  },
};
</script>

<style lang="scss"></style>
