<template>
  <navBar class="home-nav">
    <template #center>
      <p>首页</p>
    </template>
  </navBar>
  <div class="home-content">
    <Swipe
      class="home-content__swiper"
      :autoplay="3000"
      indicator-color="white"
    >
      <SwipeItem v-for="item of banners" :key="item.acm">
        <img :src="item.image" alt="" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import navBar from '@/components/common/navBar.vue';
// vant
import { Swipe, SwipeItem } from 'vant';
// network
import { homeRequestEffect } from '@/hook/home/homeRequest';

export default defineComponent({
  name: 'Home',
  components: {
    navBar,
    Swipe,
    SwipeItem,
  },
  setup() {
    const { banners, reqSwiper } = homeRequestEffect();
    onMounted(() => {
      reqSwiper();
    });
    return {
      banners,
    };
  },
});
</script>
<style scoped lang="scss">
.home-nav {
  top: 0;
  background-color: rgba(201, 201, 201, 0.3);
  backdrop-filter: blur(5px);
  position: fixed;
}
.home-content {
  position: relative;
  top: 44px;
  &__swiper {
    img {
      width: 100%;
    }
  }
}
</style>
