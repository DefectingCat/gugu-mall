<template>
  <navBar class="detail-nav">
    <template #left>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </template>
    <template #center>
      <ul class="detail-nav__title" @click="titleClick">
        <li
          :class="{ 'detail-nav__title--active': currentTitle == index }"
          v-for="(item, index) of titles"
          :key="item"
          :data-xfy-index="index"
        >
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
  <DetailGoodsInfo :detailInfo="detailInfo" />
  <div>this is detail</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
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
import DetailGoodsInfo from './children/DetailGoodsInfo.vue';

export default defineComponent({
  name: 'Detail',
  components: {
    navBar,
    Swipe,
    SwipeItem,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
  },
  setup() {
    const route = useRoute();
    const detailData = reactive({
      currentTitle: 0,
    });
    const { reqDetail } = detailReq();
    reqDetail(route.params.iid as string);

    // https://www.designcise.com/web/tutorial/how-to-fix-property-does-not-exist-on-type-eventtarget-typescript-error
    const titleClick = (e: MouseEvent & { target: Element }) => {
      const target = e.target;
      if (target.nodeName.toLowerCase() === 'li') {
        detailData.currentTitle = (target.getAttribute(
          'data-xfy-index'
          // If this was intentional, convert the expression to 'unknown' first.
          // convertScript 双重无敌断言
        ) as unknown) as number;
      }
    };

    const { titles, topImages, goods, shop, detailInfo } = toRefs(state);
    const { currentTitle } = toRefs(detailData);
    return {
      titles,
      topImages,
      goods,
      shop,
      detailInfo,
      titleClick,
      currentTitle,
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
    &--active {
      color: $base-color;
    }
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
