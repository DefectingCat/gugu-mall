<template>
  <!-- 额外嵌套一个div，将van-list的placeholder挤下去，否则会影响上拉加载 -->
  <div class="goods-list">
    <div class="goods-list__col">
      <GoodsListItem
        class="goods-list__col__item"
        v-for="item of goods[currentTab].list1"
        :key="item"
        :item="item"
      />
    </div>
    <div class="goods-list__col">
      <GoodsListItem
        class="goods-list__col__item"
        v-for="item of goods[currentTab].list2"
        :key="item"
        :item="item"
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
