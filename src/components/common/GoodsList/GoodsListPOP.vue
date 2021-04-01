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
});
</script>

<style scoped lang="scss"></style>
