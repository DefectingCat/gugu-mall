<template>
  <navBar class="detail-nav">
    <template #left>
      <div class="detail-nav__left" @click="leftClick">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
    </template>
    <template #center>
      <ul class="detail-nav__title" @click="titleClick($event, hasComment)">
        <li
          :class="{
            'detail-nav__title--active': currentTitle == index,
            'detail-nav__title--deactive':
              index == 2 && !Object.keys(commentInfo).length,
          }"
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
  <DetailActionBar @addToCart="addToCart" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// network
import { detailReq } from '@/hook/detail/detailEffect';
import { imgEffect } from '@/hook/detail/detailImgEffect';
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
// vuex
import { useStore } from 'vuex';
// types
import { CartObj } from '@/types/detail';

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
    const router = useRouter();
    const store = useStore();

    const { state, reqDetail, reqRecommend, hasComment } = detailReq();
    reqDetail(route.params.iid);
    reqRecommend();
    const {
      iid,
      titles,
      topImages,
      goods,
      shop,
      detailInfo,
      paramInfo,
      commentInfo,
      recommend,
    } = toRefs(state);

    const {
      detailData,
      titleClick,
      params,
      comment,
      recommendRef,
      recoredY,
      scrollListener,
    } = imgEffect();
    const goodsImgLoad = () => {
      recoredY();
    };
    scrollListener();
    const { currentTitle } = toRefs(detailData);

    const leftClick = () => {
      router.go(-1);
    };

    const addToCart = () => {
      const obj: CartObj = {
        iid: iid.value,
        imgURL: topImages.value[0],
        title: goods.value.title,
        desc: goods.value.desc,
        nowPrice: goods.value.nowPrice,
        price: 0,
        count: 1,
      };
      store.commit('addCart', obj);
    };

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
      hasComment,
      leftClick,
      addToCart,
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
  &__left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
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
    &--deactive {
      color: rgb(179, 179, 179);
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
