<template>
  <ul class="sub-cate">
    <span class="sub-cate__title">{{ data.info.title }}</span>
    <li class="sub-cate__item" v-for="item of data.list" :key="item">
      <img :src="item.image" alt="" v-lazy="item.image" />
      <span>{{ item.title }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Subcategories',
  props: {
    data: Object,
  },
});
</script>

<style scoped lang="scss">
.sub-cate {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-evenly;
  &__title {
    width: 100%;
    text-align: center;
    height: 32px;
    line-height: 32px;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 15px;
    background: rgba(201, 201, 201, 0.3);
    border-radius: 8px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    width: 33%;
    align-items: center;
    font-size: 12px;
    color: $main-fontColor;
    margin: 5px 0;
    img {
      // lazyload 中的 perload 不会触发update，在update中不能获取到正确的高度。
      // 所以需要为subcategory中的图片设置对应的宽和高
      width: 60px;
      height: 60px;
      margin: 8px 0;
    }
  }
}
</style>
