<template>
  <span class="info-header">热门推荐</span>
  <van-list
    :finished="true"
    finished-text="到底啦＞﹏＜"
    class="van-list"
    :immediate-check="false"
  >
    <GoodsList currentTab="goods" :goods="recommend" />
  </van-list>
</template>

<script lang="ts">
import GoodsList from '@/components/common/GoodsList/GoodsList.vue';
// vant
import { List } from 'vant';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DetailRecommend',
  props: {
    recommend: Object,
  },
  components: {
    GoodsList,
    'van-list': List,
  },
});
</script>

<style scoped lang="scss">
.recommend-info {
  padding: 5px;
}

.info-header {
  display: block;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  color: #333;
}
</style>
