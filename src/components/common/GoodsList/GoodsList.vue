<template>
  <van-list
    class="goods-list"
    v-model:loading="isLoading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div class="goods-list__col">
      <GoodsListItem
        class="goods-list__col__item"
        v-for="item of list1"
        :key="item"
        :item="item"
      />
    </div>
    <div class="goods-list__col">
      <GoodsListItem
        class="goods-list__col__item"
        v-for="item of list2"
        :key="item"
        :item="item"
      />
    </div>
  </van-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// vant
import { List } from 'vant';
import GoodsListItem from './GoodsListItem.vue';
export default defineComponent({
  name: 'GoodsList',
  components: {
    'van-list': List,
    GoodsListItem,
  },
  props: {
    list1: Array,
    list2: Array,
    loading: Boolean,
    finished: Boolean,
  },
  setup(props, { emit }) {
    const isLoading = ref(props.loading);
    const onLoad = () => {
      emit('test');
    };
    return {
      onLoad,
      isLoading,
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
