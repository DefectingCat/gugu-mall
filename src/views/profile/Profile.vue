<template>
  <div class="head-wrap">
    <h2>Profile</h2>
  </div>
  <ProfileCart />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// children
import ProfileCart from './children/ProfileCart.vue';
export default defineComponent({
  name: 'Profile',
  components: {
    ProfileCart,
  },
  // setup() {},
});
</script>

<style scoped lang="scss">
.head-wrap {
  font-family: 'Ubuntu';
  position: relative;
  background: black;
  // background-color: rgb(230, 230, 230);
  height: 180px;
  color: white;
  z-index: -1;
  h2 {
    margin: 0;
    padding: 60px 0 0px 10px;
    font-size: 35px;
  }
}
.head-wrap::after {
  content: '';
  position: absolute;
  background: black;
  // background-color: rgb(230, 230, 230);
  display: inline-block;
  width: 375px;
  height: 70px;
  left: 0;
  bottom: -35px;
  border-radius: 50%;
}
</style>
