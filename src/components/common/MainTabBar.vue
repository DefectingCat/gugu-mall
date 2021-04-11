<template>
  <div class="tab-bar" v-show="showBar">
    <div
      class="base-item"
      @click="itemClick(item.path)"
      v-for="item of info"
      :key="item.path"
    >
      <svg
        class="icon base-item__img"
        :class="{ 'base-item__img--active': item.path == nowPath }"
        aria-hidden="true"
      >
        <use :xlink:href="`#${item.img}`"></use>
      </svg>

      <span class="base-item__word">{{ item.msg }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router';
export default defineComponent({
  name: 'MainTabBar',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      info: [
        { path: '/', img: 'icon-shouye', msg: '首页' },
        { path: '/category', img: 'icon-leimupinleifenleileibie', msg: '分类' },
        { path: '/cart', img: 'icon-shoppingcart', msg: '购物车' },
        { path: '/profile', img: 'icon-wode', msg: '我的' },
      ],
    });
    const nowPath = computed(() => {
      return route.path;
    });

    const itemClick = (routePath: string) => {
      if (nowPath.value != routePath) {
        // 这绝对是一个路由地址ρ(*╯^╰)
        router.push(routePath as RouteLocationRaw);
      }
    };

    // 进入 /detail 页面不显示
    const showBar = computed(() => {
      const pathArr = route.path.split('/');
      console.log(route.path);

      if (pathArr[1] === 'detail') {
        return false;
      }
      return true;
    });

    const { info } = toRefs(state);
    return {
      info,
      itemClick,
      showBar,
      nowPath,
    };
  },
});
</script>

<style scoped lang="scss">
.tab-bar {
  display: flex;
  height: 54px;
  background-color: rgba(201, 201, 201, 0.3);
  position: fixed;
  bottom: 2%;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  width: 94%;
  margin: auto;
  border-radius: 12px;
  flex-flow: row;
  justify-content: space-around;
  align-items: center;
  z-index: 12;
}
.base-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 12px;

  &__img--active {
    color: $base-color;
  }
  &__word {
    color: $content-fontColor;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-bottom: 4px;
  }
}
</style>
