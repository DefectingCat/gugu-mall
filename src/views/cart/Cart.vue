<template>
  <div class="cart-wrapper">
    <navBar class="cart-nav">
      <template #center>
        <span>购物车</span>
      </template>
    </navBar>

    <div v-if="cartList.length">
      <CartList v-for="item of cartList" :key="item.iid" :cart="item" />
      <CartActionBar class="action-bar" :cartList="cartList" />
    </div>
    <div v-else>
      <Empty description="这里空空的哟~" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
// children
import CartList from './children/CartList.vue';
import CartActionBar from './children/CartActionBar.vue';
// vuex
import { useStore } from 'vuex';
// vant
import { Empty } from 'vant';
export default defineComponent({
  name: 'Cart',
  components: {
    navBar,
    CartList,
    CartActionBar,
    Empty,
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
.action-bar {
  position: fixed;
  bottom: 67px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
