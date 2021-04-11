<template>
  <navBar class="cate-nav">
    <template #center>
      <span>咕咕分类</span>
    </template>
  </navBar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// common components
import navBar from '@/components/common/navBar.vue';
export default defineComponent({
  name: 'Category',
  components: {
    navBar,
  },
  setup() {
    console.log('test');
  },
});
</script>

<style scoped lang="scss">
.cate-nav {
  position: sticky;
  top: 0;
  background-color: rgba(201, 201, 201, 0.3);
  backdrop-filter: blur(5px);
  z-index: 10;
}
</style>
