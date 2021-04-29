<template>
  <SwipeCell>
    <div class="cart-item">
      <div class="cart-item__check-point">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gouxuan"></use>
        </svg>
      </div>
      <Card :thumb="cart.imgURL">
        <template #title>
          <span class="cart-item__text cart-item__title">{{ cart.title }}</span>
        </template>

        <template #desc>
          <span class="cart-item__text">{{ cart.desc }}</span>
        </template>

        <template #price>
          <span class="cart-item__price">￥{{ cart.price }}</span>
        </template>

        <template #num>
          <div class="cart-item__num">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jian"></use>
            </svg>
            <span>{{ cart.count }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jia"></use>
            </svg>
          </div>
        </template>
      </Card>
    </div>

    <template #right>
      <Button square type="danger" text="删除" class="delete-button" />
    </template>
  </SwipeCell>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
// vant
import { SwipeCell } from 'vant';
import { Card } from 'vant';
import { Button } from 'vant';
// types
import { CartObj } from '@/types/detail';
export default defineComponent({
  name: 'Cart',
  components: {
    SwipeCell,
    Card,
    Button,
  },
  props: {
    cart: {
      type: Object as PropType<CartObj>,
    },
  },
});
</script>

<style scoped lang="scss">
.delete-button {
  height: 100%;
}
.cart-item {
  display: flex;
  background-color: #fafafa;
  align-items: center;
  margin-bottom: 8px;
  &__check-point {
    display: flex;
    margin: 0 6px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
  :deep(.van-card) {
    flex: 1;
    padding-left: 0;
    margin-top: 0;
  }
  &__title {
    font-size: 16px;
    margin-bottom: 6px;
    display: block;
    width: 250px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  // &__text {
  // }
  &__price {
    color: $base-color;
    font-size: 17px;
  }
  &__num {
    display: flex;
    align-items: center;
    margin-right: 6px;
    svg {
      width: 20px;
      height: 20px;
    }
    span {
      display: inline-block;
      height: 20px;
      width: 20px;
      background: #e2e2e2;
      border-radius: 5px;
      text-align: center;
      margin: 0 2px;
    }
  }
}
</style>
