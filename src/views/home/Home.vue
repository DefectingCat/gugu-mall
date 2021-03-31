<template>
  <navBar class="home-nav">
    <template #center>
      <span>咕咕街</span>
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
  <GoodsList
    :list1="goods[currentTab].list1"
    :list2="goods[currentTab].list2"
    :loading="loading"
    :finished="finished"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs, reactive } from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
import GoodsList from '@/components/common/GoodsList/GoodsList.vue';
// vant
import { Swipe, SwipeItem } from 'vant';
// network
import { homeRequestEffect } from '@/hook/home/homeEffect';
// child components
import Recommend from './children/Recommend.vue';
import WeekendRecommend from './children/WeekendRecommend.vue';
import SwitchTab from './children/SwitchTab.vue';

export default defineComponent({
  name: 'Home',
  components: {
    navBar,
    GoodsList,
    Swipe,
    SwipeItem,
    Recommend,
    WeekendRecommend,
    SwitchTab,
  },
  setup() {
    const { state, reqSwiper, reqGoods } = homeRequestEffect();
    onMounted(() => {
      reqSwiper();
      reqGoods('pop');
    });
    const homeData = reactive({
      currentSwTab: 0,
      swTabs: ['pop', 'new', 'sell'],
      currentTab: 'pop',
      loading: false,
      finished: false,
    });
    // SwitchTab emit 的点击
    function swTabClick(i: number): void {
      homeData.currentSwTab = i;
      homeData.currentTab = homeData.swTabs[i];
    }
    const { currentSwTab, swTabs, currentTab, loading, finished } = toRefs(
      homeData
    );
    const { banners, recommend, goods } = toRefs(state);
    return {
      banners,
      recommend,
      goods,
      currentSwTab,
      swTabs,
      currentTab,
      loading,
      finished,
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
