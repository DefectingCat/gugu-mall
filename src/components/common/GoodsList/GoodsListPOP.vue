<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="到底啦＞﹏＜"
    @load="onLoad"
    class="van-list"
    :immediate-check="false"
  >
    <GoodsList
      currentTab="pop"
      :loading="loading"
      :finished="finished"
      :goods="goods"
    />
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
  name: 'GoodsListPOP',
  components: {
    'van-list': List,
    GoodsList,
  },
  setup() {
    const { loading, finished, reqGoods } = homeRequestEffect();
    reqGoods('new');
    reqGoods('sell');
    reqGoods('pop');
    const onLoad = async () => {
      await reqGoods('pop');
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
