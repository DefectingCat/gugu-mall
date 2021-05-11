<template>
  <div class="body-wrap">
    <div class="body-content">
      <div class="body-content__head">
        <svg class="icon icon-left" aria-hidden="true">
          <use xlink:href="#icon-shezhi1"></use>
        </svg>
        <img src="@/assets/img/profile/avatar.png" alt="" />
        <svg class="icon icon-right" aria-hidden="true">
          <use xlink:href="#icon-bianji2"></use>
        </svg>
      </div>

      <div class="body-content__info">
        <span>Arthur</span>
        <span>i@defect.ink</span>
      </div>

      <div class="hr"></div>

      <div class="body-content__list">
        <ul>
          <li v-for="item of listMsg" :key="item.id" class="list-item">
            <svg class="icon list-item__icon-left" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            {{ item.msg }}
            <svg class="icon list-item__icon-right" aria-hidden="true">
              <use xlink:href="#icon-you"></use>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
export default defineComponent({
  name: 'ProfileCart',
  setup() {
    const listMsg = reactive([
      { id: 1, msg: '我的消息', icon: '#icon-xiaoxi' },
      { id: 2, msg: '我的会员', icon: '#icon-huiyuan' },
      { id: 3, msg: '积分商城', icon: '#icon-jifen' },
      { id: 4, msg: '问候咸鱼作者', icon: '#icon-yu' },
      { id: 4, msg: '看看咸鱼其他项目', icon: '#icon-qitazhengquan' },
    ]);
    return {
      listMsg,
    };
  },
});
</script>

<style scoped lang="scss">
.body-wrap {
  padding: 0 15px;
}

.body-content {
  // height: 400px;
  // background: white;
  background-color: rgba(230, 230, 230, 0.404);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  transform: translateY(-20px);
  box-shadow: 1px 1px 20px rgba(134, 134, 134, 0.521);
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // position: relative;
    height: 50px;
    img {
      height: 100px;
      width: 100px;
      // background: white;
      // border: 2px solid white;
      border-radius: 50%;
      background-color: rgba(201, 201, 201, 0.404);
      backdrop-filter: blur(5px);
      transform: translateY(-25px);
      // position: absolute;
      // left: 50%;
      // top: -50px;
      // transform: translateX(-50%);
    }
    .icon-left {
      margin-left: 20px;
      width: 25px;
      height: 25px;
    }
    .icon-right {
      margin-right: 20px;
      width: 22px;
      height: 22px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    margin-top: 10px;
    span {
      margin-bottom: 5px;
    }
  }

  .hr {
    height: 1px;
    background-color: rgba(206, 205, 205, 0.342);
    width: 90%;
    margin: 14px auto 0 auto;
  }

  &__list {
    padding: 20px 18px;
    .list-item {
      display: flex;
      height: 50px;
      align-items: center;
      font-size: 17px;
      &__icon-left {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        transform: translateY(-1px);
      }
      &__icon-right {
        width: 14px;
        height: 14px;
        margin-left: auto;
      }
    }
  }
}
</style>
