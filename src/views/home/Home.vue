<template>
  <navBar class="home-nav">
    <template #center>
      <span>咕咕街</span>
    </template>
  </navBar>

  <div class="wrapper">
    <Swipe class="swiper" :autoplay="3000" indicator-color="white" lazy-render>
      <SwipeItem v-for="item of banners" :key="item.acm">
        <img :src="item.image" alt="" />
      </SwipeItem>
    </Swipe>

    <Recommend :recommends="recommend" />
    <WeekendRecommend />
  </div>

  <SwitchTab
    :titles="['流行', '新款', '精选']"
    @swTabClick="swTabClick"
    :currentSwTab="currentSwTab"
    ref="swTab"
  />
  <!-- 动态组件，实现商品数据缓存 -->
  <keep-alive>
    <component :is="currentTabComponent"></component>
  </keep-alive>
  <GoTop class="go-top" />
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
  ref,
  onActivated,
} from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
import GoodsListPOP from '@/components/common/GoodsList/GoodsListPOP.vue';
import GoodsListNEW from '@/components/common/GoodsList/GoodsListNEW.vue';
import GoodsListSELL from '@/components/common/GoodsList/GoodsListSELL.vue';
import GoTop from '@/components/common/GoTop.vue';
// vant
import { Swipe, SwipeItem } from 'vant';
// network
import { state, homeRequestEffect } from '@/hook/home/homeEffect';
// child components
import Recommend from './children/Recommend.vue';
import WeekendRecommend from './children/WeekendRecommend.vue';
import SwitchTab from './children/SwitchTab.vue';
import { onBeforeRouteLeave } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    navBar,
    GoodsListPOP,
    GoodsListNEW,
    GoodsListSELL,
    GoTop,
    Swipe,
    SwipeItem,
    Recommend,
    WeekendRecommend,
    SwitchTab,
  },
  setup() {
    const { reqSwiper } = homeRequestEffect();
    const homeData = reactive({
      currentSwTab: 0,
      swTabs: ['pop', 'new', 'sell'],
      currentTab: 'pop',
      currentTabComponent: 'GoodsListPOP',
      scrolledY: 0,
    });
    const swTab = ref();
    onMounted(() => {
      reqSwiper();
    });
    // SwitchTab emit 的点击
    function swTabClick(i: number): void {
      homeData.currentSwTab = i;
      homeData.currentTab = homeData.swTabs[i];
      homeData.currentTabComponent = `GoodsList${homeData.swTabs[
        i
      ].toUpperCase()}`;
    }

    // 切换路由时记录首页滚动的位置
    onBeforeRouteLeave(() => {
      homeData.scrolledY = document.documentElement.scrollTop;
    });
    onActivated(() => {
      document.documentElement.scrollTop = homeData.scrolledY;
    });

    const { currentSwTab, swTabs, currentTab, currentTabComponent } = toRefs(
      homeData
    );
    const { banners, recommend } = toRefs(state);
    return {
      banners,
      recommend,
      currentSwTab,
      swTabs,
      currentTab,
      currentTabComponent,
      swTabClick,
      swTab,
    };
  },
});
</script>
<style scoped lang="scss">
.wrapper {
  padding: 0px 6px;
}
.home-nav {
  position: sticky;
  top: 0;
  background-color: rgba(201, 201, 201, 0.3);
  backdrop-filter: blur(5px);
  z-index: 10;
}
.swiper {
  margin-top: 4px;
  border-radius: 10px;
  height: 192px;
  // box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  img {
    border-radius: 10px;
    width: 100%;
  }
}
.go-top {
  position: fixed;
  bottom: 80px;
  z-index: 11;
}
</style>
