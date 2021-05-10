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
          :ref="setListRef"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="category__right" ref="wrapper">
      <SubCategories
        :ref="setItemRef"
        v-for="item in subCategories"
        :key="item"
        :data="item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
// hook
import { reqCategory } from '@/hook/category/categoryEffect';
import { imgEffect } from '@/hook/category/categoryImgEffect';
// common hook
import recordScroll from '@/hook/common/recordScroll';
// children
import SubCategories from './children/SubCategory.vue';
export default defineComponent({
  name: 'Category',
  components: {
    navBar,
    SubCategories,
  },
  setup() {
    const { state, getCategoryList, getCategoryData } = reqCategory();
    onMounted(() => {
      getCategoryList();
      getCategoryData();
    });
    const { categories, subCategories } = toRefs(state);

    const { cateData, wrapper, setItemRef, titleClick, setListRef } =
      imgEffect();
    const { cateTopYs, currentIndex, itemRefs } = toRefs(cateData);

    // 记录滚动位置
    recordScroll(wrapper);

    return {
      categories,
      currentIndex,
      subCategories,
      titleClick,
      setItemRef,
      cateTopYs,
      wrapper,
      itemRefs,
      setListRef,
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
      background: #fff;
      li {
        display: flex;
        height: 45px;
        width: 100px;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        position: relative;
        background: rgb(235, 235, 235);
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
