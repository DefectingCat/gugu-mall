<template>
  <ActionBar>
    <ActionBarIcon icon="chat-o" text="客服" color="#ee0a24" />
    <ActionBarIcon icon="shop-o" text="店铺" />
    <ActionBarIcon icon="star-o" text="收藏" />
    <ActionBarButton type="warning" text="加入购物车" />
    <ActionBarButton type="danger" text="立即购买" />
  </ActionBar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// vant
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
export default defineComponent({
  name: 'DetailActionBar',
  components: {
    ActionBar,
    ActionBarIcon,
    ActionBarButton,
  },
});
</script>

<style scoped lang="scss"></style>
