<template>
  <div class="cart-wrapper">
    <navBar class="cart-nav">
      <template #center>
        <span>购物车</span>
      </template>
    </navBar>

    <CartList v-for="item of cartList" :key="item.iid" :cart="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
// children
import CartList from './children/CartList.vue';
// vuex
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Cart',
  components: {
    navBar,
    CartList,
  },
  setup() {
    const store = useStore();

    const cartList = computed(() => store.state.cartList);
    return {
      cartList,
    };
  },
});
</script>

<style scoped lang="scss">
.cart-wrapper {
  padding-bottom: 60px;
}
.cart-nav {
  // position: sticky;
  top: 0;
  background-color: rgba(201, 201, 201, 0.3);
  backdrop-filter: blur(5px);
  z-index: 10;
}
</style>
