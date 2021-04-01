<template>
  <GoodsList currentTab="sell" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GoodsList from './GoodsList.vue';
export default defineComponent({
  name: 'GoodsListSELL',
  components: {
    GoodsList,
  },
  setup() {
    console.log('sell');
  },
});
</script>

<style scoped lang="scss"></style>
