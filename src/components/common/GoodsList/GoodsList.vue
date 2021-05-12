<template>
  <!-- 额外嵌套一个div，将van-list的placeholder挤下去，否则会影响上拉加载 -->
  <div class="goods-list">
    <div class="goods-list__col">
      <GoodsListItem
        class="goods-list__col__item"
        v-for="item of goods[currentTab].list1"
        :key="item"
        :item="item"
        :ref="setList1Ref"
      />
    </div>
    <div class="goods-list__col">
      <GoodsListItem
        class="goods-list__col__item"
        v-for="item of goods[currentTab].list2"
        :key="item"
        :item="item"
        :ref="setList2Ref"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GoodsListItem from './GoodsListItem.vue';

export default defineComponent({
  name: 'GoodsList',
  components: {
    GoodsListItem,
  },
  props: {
    currentTab: String,
    goods: Object,
  },
  setup() {
    // 使用 Intersection Observer API 来监听项目是否和视口相交
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 断言为 HTMLElement 才可操作 style
          const target = entry.target as HTMLElement;
          setTimeout(() => {
            target.style.transform = `translateY(0px)`;
            target.style.opacity = `1`;
          }, 300);
          // 动画完成后取消监听
          observer.unobserve(entry.target);
        }
      });
    });
    // vfor 循环中使用两个方法添加列表监听
    const setList1Ref = (el: { $el: HTMLElement }) => {
      el ? observer.observe(el.$el) : void 0;
    };
    const setList2Ref = (el: { $el: HTMLElement }) => {
      el ? observer.observe(el.$el) : void 0;
    };

    return {
      setList1Ref,
      setList2Ref,
    };
  },
});
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  &__col {
    width: 45%;
  }
  // 穿透到子组件
  :deep(.van-list__loading) {
    width: 100%;
  }
}
</style>
