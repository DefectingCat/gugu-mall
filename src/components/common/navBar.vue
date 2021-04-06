<template>
  <div class="nav-bar">
    <div class="nav-bar__left" @click="leftClick">
      <slot name="left"></slot>
    </div>
    <div class="nav-bar__center">
      <slot name="center"></slot>
    </div>
    <div class="nav-bar__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'navBar',
  setup() {
    const router = useRouter();
    const leftClick = () => {
      router.go(-1);
    };
    return {
      leftClick,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  width: 100%;
  align-items: center;
  font-size: 15px;
  &__left,
  &__right {
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;
  }
  &__center {
    flex: 1;
    text-align: center;
  }
}
</style>
