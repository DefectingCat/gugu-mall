<template>
  <div class="base-title">
    <h2>
      {{ goods.title }}
    </h2>
  </div>

  <div class="base-price">
    <span class="base-price__new">
      {{ goods.newPrice }}
    </span>
    <span class="base-price__old">
      {{ goods.oldPrice }}
    </span>
    <span class="base-price__discount" v-show="goods.discount">
      {{ goods.discount }}
    </span>
  </div>
  <div class="base-other">
    <span v-for="item of goods.columns" :key="item">
      {{ item }}
    </span>
  </div>

  <div class="base-services">
    <span
      v-for="item of goods.services"
      :key="item"
      class="base-services__item"
    >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-right"></use>
      </svg>
      <span> {{ item }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DetailBaseInfo',
  props: {
    goods: Object,
  },
});
</script>

<style scoped lang="scss">
.base-title {
  font-weight: bold;
  padding: 0px 8px 0px 8px;
  font-size: 18px;
  h2 {
    font: inherit;
  }
}
.base-price {
  display: flex;
  padding: 0px 8px 8px 8px;
  align-items: flex-end;
  &__new {
    color: #ff699c;
    font-size: 22px;
    margin-right: 8px;
  }
  &__old {
    color: rgb(180, 180, 180);
    text-decoration: line-through;
    font-size: 14px;
    margin-right: 8px;
  }
  &__discount {
    display: inline-block;
    background-color: #ff699c;
    color: #fff;
    border-radius: 8px;
    align-self: flex-start;
    font-size: 12px;
    padding: 4px;
  }
}
.base-other {
  display: flex;
  color: rgb(180, 180, 180);
  font-size: 10px;
  justify-content: space-between;
  padding: 0 0 8px 0;
  margin: 8px 8px 0 8px;
  border-bottom: 1px solid hsla(0, 0%, 39.2%, 0.1);
}
.base-services {
  display: flex;
  justify-content: space-around;
  margin: 16px 0 16px 0;
  &__item {
    display: flex;
    height: 18px;
    align-items: center;
    font-size: 14px;
    color: $base-fontColor;
    & .icon {
      width: 15px;
      height: 15px;
      margin-right: 4px;
    }
  }
}
</style>
