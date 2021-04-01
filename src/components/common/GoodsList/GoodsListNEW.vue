<template>
  <GoodsList currentTab="new" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GoodsList from './GoodsList.vue';
export default defineComponent({
  name: 'GoodsListNEW',
  components: {
    GoodsList,
  },
});
</script>

<style scoped lang="scss"></style>
