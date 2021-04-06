<template>
  <navBar class="detail-nav">
    <template #left>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </template>
    <template #center>
      <ul class="detail-nav__title">
        <li v-for="item of titles" :key="item">
          {{ item }}
        </li>
      </ul>
    </template>
  </navBar>

  <Swipe class="swiper" :autoplay="3000" indicator-color="white" lazy-render>
    <SwipeItem v-for="item of topImages" :key="item" class="swiper__item">
      <img :src="item" alt="" />
    </SwipeItem>
  </Swipe>

  <DetailBaseInfo :goods="goods" />
  <DetailShopInfo :shop="shop" />
  <div>this is detail</div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useRoute } from 'vue-router';
// network
import { state, detailReq } from '@/hook/detail/detailEffect';
// common components
import navBar from '@/components/common/navBar.vue';
// vant
import { Swipe, SwipeItem } from 'vant';
// child components
import DetailBaseInfo from './children/DetailBaseInfo.vue';
import DetailShopInfo from './children/DetailShopInfo.vue';

export default defineComponent({
  name: 'Detail',
  components: {
    navBar,
    Swipe,
    SwipeItem,
    DetailBaseInfo,
    DetailShopInfo,
  },
  setup() {
    const route = useRoute();
    const { reqDetail } = detailReq();
    reqDetail(route.params.iid as string);
    const { titles, topImages, goods, shop } = toRefs(state);
    return {
      titles,
      topImages,
      goods,
      shop,
    };
  },
});
</script>

<style scoped lang="scss">
.detail-nav {
  position: sticky;
  top: 0;
  background-color: #fff;
  // backdrop-filter: blur(5px);
  z-index: 10;
  & .icon {
    width: 20px;
    height: 20px;
  }
  &__title {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
  }
}
.swiper {
  img {
    width: 375px;
  }
  &__item {
    text-align: center;
    height: 300px;
  }
}
</style>
