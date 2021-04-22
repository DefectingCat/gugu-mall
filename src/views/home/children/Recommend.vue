<template>
  <div class="recommend">
    <div
      class="recommend__item"
      v-for="item of recommends"
      :key="'rec' + item.sort"
    >
      <a href="#">
        <img :src="item.image" alt="" v-lazy="item.image" />
        <div>
          {{ item.title }}
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Recommend',
  props: {
    recommends: Array,
  },
});
</script>

<style scoped lang="scss">
.recommend {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
  border-radius: 10px;
  padding: 10px 0;
  font-size: 12px;
  // border-bottom: 9px solid rgba(219, 219, 219, 0.651);
  // box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.15);
  background: #fff;
  &__item {
    text-align: center;
    width: 25%;
    a {
      text-decoration: none;
      color: $content-fontColor;
      text-align: center;
    }
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 5px;
    }
  }
}
</style>
