<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="到底啦＞﹏＜"
    @load="onLoad"
    class="van-list"
  >
    <GoodsList currentTab="sell" :goods="goods" />
  </van-list>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import GoodsList from './GoodsList.vue';
// network
import { state, homeRequestEffect } from '@/hook/home/homeEffect';
// vant
import { List } from 'vant';
export default defineComponent({
  name: 'GoodsListSELL',
  components: {
    'van-list': List,
    GoodsList,
  },
  setup() {
    const { loading, finished, reqGoods } = homeRequestEffect();
    const onLoad = async () => {
      await reqGoods('sell');
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
</style>
