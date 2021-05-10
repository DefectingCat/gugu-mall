<template>
  <div class="bar-wrap">
    <div class="bar-wrap__check-point" @click="checkClick">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="showCheck"></use>
      </svg>
    </div>
    <span>全选</span>
    <span class="bar-wrap__tPrice">总价:{{ totalPrice }}</span>
    <span class="bar-wrap__settle">去结算</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from 'vue';
// types
import { CartObj } from '@/types/detail';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'CartActionBar',
  props: {
    cartList: Object as PropType<CartObj[]>,
  },
  setup(props) {
    const store = useStore();
    const { cartList } = toRefs(props);
    // 购物车总长度
    const len = computed(() => cartList?.value?.length);
    // 已经勾选的长度
    const checkedLen = computed(() => {
      let count = 0;
      if (cartList?.value) {
        for (const i of cartList?.value) {
          i.checked ? count++ : void 0;
        }
      }
      return count;
    });
    // 二者相等时则全选
    const showCheck = computed(() => {
      if (len.value === checkedLen.value) {
        return '#icon-gouxuan1';
      }
      return '#icon-gouxuan';
    });
    // 全选操作
    const checkClick = () => {
      if (cartList?.value) {
        // 判断是否已经全选
        if (len.value === checkedLen.value) {
          for (const i of cartList?.value) {
            // 已经全选时，直接提交，进行反选
            store.commit('checkItem', i);
          }
        } else {
          // 否则找到未选择的，进行选中
          for (const i of cartList?.value) {
            i.checked ? void 0 : store.commit('checkItem', i);
          }
        }
      }
    };
    // 计算已勾选的总价
    const totalPrice = computed(() => {
      let count = 0;
      if (cartList?.value) {
        for (const i of cartList?.value) {
          if (i.checked) {
            i.price ? (count += +i.price) : void 0;
          }
        }
      }
      return count;
    });
    return {
      len,
      checkedLen,
      showCheck,
      checkClick,
      totalPrice,
    };
  },
});
</script>

<style scoped lang="scss">
.bar-wrap {
  display: flex;
  height: 34px;
  border-radius: 10px;
  background-color: rgba(201, 201, 201, 0.3);
  backdrop-filter: blur(5px);
  width: 94%;
  align-items: center;
  font-size: 13px;
  color: $base-fontColor;
  &__check-point {
    display: flex;
    margin: 0 6px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
  &__tPrice {
    margin-left: auto;
  }
  // &__settle {
  // }
}
</style>
