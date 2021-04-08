<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length">
    <div class="goods-info__desc">
      <span class="start"></span>
      <span class="words">{{ detailInfo.desc }}</span>
      <span class="end"></span>
    </div>
    <div class="goods-info__list">
      <span>{{ detailInfo.detailImage[0].key }}</span>
      <van-image
        v-for="item in detailInfo.detailImage[0].list"
        :src="item"
        alt=""
        :key="item"
        lazy-load
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// vant
import { Image } from 'vant';
export default defineComponent({
  name: 'DetailGoodsInfo',
  components: {
    'van-image': Image,
  },
  props: {
    detailInfo: Object,
  },
});
</script>

<style scoped lang="scss">
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.goods-info__desc {
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  .start {
    display: block;
    width: 100px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
    &::after {
      content: '';
      height: 10px;
      width: 10px;
      background-color: #a3a3a5;
      position: absolute;
      bottom: 0;
    }
  }
  .words {
    padding: 15px 0;
    font-size: 14px;
  }
  .end {
    display: block;
    width: 100px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
    align-self: flex-end;
    &::after {
      content: '';
      height: 10px;
      width: 10px;
      background-color: #a3a3a5;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.goods-info__list {
  text-align: center;
  span {
    display: inline-block;
    color: #333;
    font-size: 15px;
    margin-bottom: 16px;
  }
  :deep(.van-image) {
    width: 375px;
  }
}
</style>
