<template>
  <ul class="sw-tab">
    <li
      class="sw-tab__item"
      v-for="(item, index) of titles"
      :key="item"
      @click="itemClick(index)"
      :class="{ 'sw-tab__item--active': index == currentSwTab }"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SwitchTab',
  props: {
    titles: Array,
    currentSwTab: Number,
  },
  setup(props, { emit }) {
    const itemClick = (i: number) => {
      emit('swTabClick', i);
    };
    return {
      itemClick,
    };
  },
});
</script>

<style scoped lang="scss">
.sw-tab {
  display: flex;
  justify-content: space-around;
  height: 32px;
  line-height: 32px;
  position: sticky;
  top: 40px;
  z-index: 10;
  background: #fff;
  padding-bottom: 4px;
  &__item {
    font-size: 14px;
    color: $content-fontColor;
    padding: 0 5px 5px 5px;
    transition: all 150ms;
    &--active {
      border-bottom: 2px solid $base-color;
      color: $base-color;
    }
  }
}
</style>
