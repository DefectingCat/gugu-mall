<template>
  <transition name="top">
    <div class="wrapper" v-show="showGoTop" @click="topClick">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shang"></use>
      </svg>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
} from 'vue';
// https://github.com/iamdustan/smoothscroll
import smoothscroll from 'smoothscroll-polyfill';
export default defineComponent({
  name: 'GoTop',
  setup() {
    // kick off the polyfill!
    smoothscroll.polyfill();
    const state = reactive({
      scrollTop: 0,
      showGoTop: false,
    });
    const recordSroll = () => {
      state.scrollTop = document.documentElement.scrollTop;
    };
    const topClick = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    onMounted(() => {
      // 监听滚动
      window.addEventListener('scroll', recordSroll);
    });
    onUnmounted(() => {
      // 离开 home 时取消监听 scroll 事件
      window.removeEventListener('scroll', recordSroll);
    });
    watch(
      () => state.scrollTop,
      (val) => {
        val > 999 ? (state.showGoTop = true) : (state.showGoTop = false);
      }
    );
    const { showGoTop } = toRefs(state);
    return {
      showGoTop,
      topClick,
    };
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: rgba(201, 201, 201, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  .icon {
    height: 35px;
    width: 35px;
  }
}
/* GoTop 过渡动画 */
.top-enter-active,
.top-leave-active {
  transition: all 0.3s ease;
}
.top-enter-from,
.top-leave-to {
  right: -45px;
}
</style>
