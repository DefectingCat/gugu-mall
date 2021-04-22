<template>
  <div class="weekly-recom">
    <span class="weekly-recom__title">本周推荐</span>
    <div class="weekly-recom__icon">
      <div class="weekly-recom__icon__img" v-for="item of icon" :key="item.id">
        <img :src="require(`@/assets/img/home/r${item.id}.png`)" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'WeekendRecommend',
  setup() {
    const state = reactive({
      icon: [
        { id: 1, name: '霸街长袖裙' },
        { id: 2, name: '时尚懒人套装' },
        { id: 3, name: '微胖遮肉穿搭' },
        { id: 4, name: '降温保暖鞋' },
        { id: 5, name: '颜值爆表套装裙' },
        { id: 6, name: '小心机V领' },
        { id: 7, name: '万圣节必备口红' },
        { id: 8, name: '软萌暖心宝宝' },
      ],
    });
    const { icon } = toRefs(state);
    return {
      icon,
    };
  },
});
</script>

<style scoped lang="scss">
.weekly-recom {
  border-radius: 10px;
  // box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.15);
  background: #fff;
  margin: 15px 0;
  &__title {
    text-align: center;
    display: block;
    height: 34px;
    line-height: 34px;
  }
  &__icon {
    display: grid;
    grid-template-rows: repeat(2, min-content);
    grid-template-columns: repeat(4, 25%);
    &__img {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
    }
    img {
      width: 72px;
      height: 72px;
      margin-bottom: 10px;
    }
  }
}
</style>
