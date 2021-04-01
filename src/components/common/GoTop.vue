<template>
  <div class="wrapper">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-shang"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'GoTop',
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  background-color: rgba(201, 201, 201, 0.5);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  .icon {
    height: 35px;
    width: 35px;
  }
}
</style>
