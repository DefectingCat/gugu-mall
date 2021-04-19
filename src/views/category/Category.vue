<template>
  <navBar class="cate-nav">
    <template #center>
      <span>咕咕分类</span>
    </template>
  </navBar>
  <div class="category">
    <div class="category__left">
      <ul class="category__left__list" @click="titleClick($event)">
        <li
          v-for="(item, index) of categories"
          :key="item.title"
          :class="{ 'list--acitve': index == currentIndex }"
          :data-xfy-index="index"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="category__right" ref="wrapper">
      <Subcategories
        :ref="setItemRef"
        v-for="item in subCategories"
        :key="item"
        :data="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  toRef,
  toRefs,
} from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
// network
import { reqCategory } from '@/hook/category/categoryEffect';
import { imgEffect } from '@/hook/category/categoryImgEffect';
// children
import Subcategories from './children/SubCategories.vue';
export default defineComponent({
  name: 'Category',
  components: {
    navBar,
    Subcategories,
  },
  setup() {
    const { state, getCategoryList, getCategoryData } = reqCategory();
    onMounted(() => {
      getCategoryList();
      getCategoryData();
    });

    const { cateData, wrapper, setItemRef, titleClick } = imgEffect();
    const { cateTopYs, currentIndex, itemRefs } = toRefs(cateData);

    const { categories, subCategories } = toRefs(state);
    return {
      categories,
      currentIndex,
      subCategories,
      titleClick,
      setItemRef,
      cateTopYs,
      wrapper,
      itemRefs,
    };
  },
});
</script>

<style scoped lang="scss">
.cate-nav {
  // position: sticky;
  top: 0;
  background-color: rgba(201, 201, 201, 0.3);
  backdrop-filter: blur(5px);
  z-index: 10;
}
.category {
  display: flex;
  &__left {
    height: calc(100vh - 44px);
    background: rgb(235, 235, 235);
    overflow-y: scroll;
    &__list {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        height: 45px;
        width: 100px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        position: relative;
      }
      .list--acitve {
        background: #fff;
        color: $base-color;
      }
      .list--acitve::before {
        content: '';
        width: 3px;
        background: $base-color;
        height: 45px;
        position: absolute;
        left: 0;
      }
    }
  }
  &__right {
    height: calc(100vh - 44px);
    overflow-y: scroll;
    padding: 0 10px 0 10px;
    flex: 1;
  }
}
</style>
