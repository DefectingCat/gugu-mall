<template>
  <navBar class="home-nav">
    <template #center>
      <p>咕咕街</p>
    </template>
  </navBar>

  <Swipe class="swiper" :autoplay="3000" indicator-color="white">
    <SwipeItem v-for="item of banners" :key="item.acm">
      <img :src="item.image" alt="" />
    </SwipeItem>
  </Swipe>

  <Recommend :recommends="recommend" />
  <WeekendRecommend />
  <SwitchTab
    :titles="['流行', '新款', '精选']"
    @swTabClick="swTabClick"
    :currentSwTab="currentSwTab"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
// vant
import { Swipe, SwipeItem } from 'vant';
// network
import {
  banners,
  recommend,
  currentSwTab,
  homeRequestEffect,
  swTabClick,
} from '@/hook/home/homeEffect';
// child components
import Recommend from './children/Recommend.vue';
import WeekendRecommend from './children/WeekendRecommend.vue';
import SwitchTab from './children/SwitchTab.vue';

export default defineComponent({
  name: 'Home',
  components: {
    navBar,
    Swipe,
    SwipeItem,
    Recommend,
    WeekendRecommend,
    SwitchTab,
  },
  setup() {
    onMounted(() => {
      homeRequestEffect();
    });
    return {
      banners,
      recommend,
      currentSwTab,
      swTabClick,
    };
  },
});
</script>
<style scoped lang="scss">
.home-nav {
  position: sticky;
  top: 0;
  background-color: rgba(201, 201, 201, 0.3);
  backdrop-filter: blur(5px);
  z-index: 10;
}
.swiper {
  img {
    width: 375px;
  }
}
</style>
