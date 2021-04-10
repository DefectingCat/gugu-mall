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
  <DetailGoodsInfo :detailInfo="detailInfo" @goodsImgLoad="goodsImgLoad" />
  <DetailParams ref="params" :paramInfo="paramInfo" />
  <DetailComment ref="comment" :commentInfo="commentInfo" />
  <DetailRecommend ref="recommendRef" :recommend="recommend" />
  <DetailActionBar />
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useRoute } from 'vue-router';
// network
import { state, detailReq } from '@/hook/detail/detailEffect';
import { detailData, imgEffect } from '@/hook/detail/detailImgEffect';

// common components
import navBar from '@/components/common/navBar.vue';
// vant
import { Swipe, SwipeItem } from 'vant';
// child components
import DetailBaseInfo from './children/DetailBaseInfo.vue';
import DetailShopInfo from './children/DetailShopInfo.vue';
import DetailGoodsInfo from './children/DetailGoodsInfo.vue';
import DetailParams from './children/DetailParams.vue';
import DetailComment from './children/DetailComment.vue';
import DetailRecommend from './children/DetailRecommend.vue';
import DetailActionBar from './children/DetailActionBar.vue';

export default defineComponent({
  name: 'Detail',
  components: {
    navBar,
    Swipe,
    SwipeItem,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailComment,
    DetailRecommend,
    DetailActionBar,
  },
  setup() {
    const route = useRoute();

    const { reqDetail, reqRecommend } = detailReq();
    reqDetail(route.params.iid as string);
    reqRecommend();
    const { titleClick, params, comment, recommendRef, recoredY } = imgEffect();

    const goodsImgLoad = () => {
      recoredY();
    };

    const {
      titles,
      topImages,
      goods,
      shop,
      detailInfo,
      paramInfo,
      commentInfo,
      recommend,
    } = toRefs(state);
    const { currentTitle } = toRefs(detailData);
    return {
      titles,
      topImages,
      goods,
      shop,
      detailInfo,
      paramInfo,
      commentInfo,
      recommend,
      titleClick,
      currentTitle,
      params,
      comment,
      recommendRef,
      goodsImgLoad,
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
