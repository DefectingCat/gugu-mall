<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
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
  </van-list>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch } from 'vue';
// vant
import { List } from 'vant';
import GoodsListItem from './GoodsListItem.vue';
// network
import { homeRequestEffect } from '@/hook/home/homeEffect';
export default defineComponent({
  name: 'GoodsList',
  components: {
    'van-list': List,
    GoodsListItem,
  },
  props: {
    currentTab: String,
  },
  setup(props) {
    const { state, reqGoods } = homeRequestEffect();
    const onLoad = async () => {
      // 它肯定会是字符串的（；´д｀）ゞ
      await reqGoods(props?.currentTab as string);
    };
    // 没有滚动时第一次点击时手动加载
    watch(
      () => props?.currentTab,
      () => {
        if (!state.goods[props?.currentTab as string].list1.length) {
          reqGoods(props?.currentTab as string);
        }
      }
    );
    const { goods, loading, finished } = toRefs(state);
    return {
      onLoad,
      loading,
      finished,
      goods,
    };
  },
});
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin-bottom: 60px;
  &__col {
    width: 45%;
  }
}
// 穿透到子组件
::v-deep .van-list__loading {
  width: 100%;
}
</style>
