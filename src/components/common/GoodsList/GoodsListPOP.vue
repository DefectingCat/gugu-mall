<template>
  <GoodsList currentTab="pop" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GoodsList from './GoodsList.vue';
export default defineComponent({
  name: 'GoodsListPOP',
  components: {
    GoodsList,
  },
  setup() {
    console.log('pop');
  },
});
</script>

<style scoped lang="scss"></style>
