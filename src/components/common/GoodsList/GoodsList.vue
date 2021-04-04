<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="到底啦＞﹏＜"
    @load="onLoad"
    class="van-list"
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
import { defineComponent, toRefs } from 'vue';
// vant
import { List } from 'vant';
import GoodsListItem from './GoodsListItem.vue';
// network
import { state, homeRequestEffect } from '@/hook/home/homeEffect';

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
    const { loading, finished, reqGoods } = homeRequestEffect();
    reqGoods('new');
    reqGoods('sell');
    const onLoad = async () => {
      // 它肯定会是字符串的（；´д｀）ゞ
      if (props.currentTab) {
        await reqGoods(props.currentTab);
      }
    };
    const { goods } = toRefs(state);
    return {
      loading,
      finished,
      onLoad,
      goods,
    };
  },
});
</script>

<style scoped lang="scss">
.van-list {
  margin-bottom: 66px;
}
.goods-list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  &__col {
    width: 45%;
  }
}
// 穿透到子组件
::v-deep .van-list__loading {
  width: 100%;
}
</style>
