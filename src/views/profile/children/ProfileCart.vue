<template>
  <div class="body-wrap">
    <div class="body-content">
      <!-- 头像部分 -->
      <div class="body-content__head">
        <svg class="icon icon-left" aria-hidden="true">
          <use xlink:href="#icon-shezhi1"></use>
        </svg>
        <img
          src="@/assets/img/profile/avatar.png"
          alt=""
          v-lazy="require(`@/assets/img/profile/avatar.png`)"
        />
        <svg class="icon icon-right" aria-hidden="true">
          <use xlink:href="#icon-bianji2"></use>
        </svg>
      </div>

      <!-- id 部分 -->
      <div class="body-content__info">
        <span>Arthur</span>
        <span>i@defect.ink</span>
      </div>

      <div class="hr"></div>

      <!-- 列表部分 -->
      <div class="body-content__list">
        <ul @click="listClick">
          <li
            v-for="item of listMsg"
            :key="item.id"
            class="list-item"
            :ref="setListItem"
            :data-xfy-id="item.id"
          >
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
      <!-- 列表 end -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted } from 'vue';
// hook
import { profileAnimation } from '@/hook/profile/animation';
import { profileEffect } from '@/hook/profile/effect';
export default defineComponent({
  name: 'ProfileCart',
  setup() {
    // 数据与点击
    const { listMsg, listClick } = profileEffect();

    // 过渡动画
    const { setListItem, listAnimat } = profileAnimation();
    onMounted(async () => {
      await nextTick();
      listAnimat();
    });

    return {
      listMsg,
      listClick,
      setListItem,
    };
  },
});
</script>

<style scoped lang="scss">
@keyframes slidein {
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(-20px);
  }
}
@keyframes spin {
  from {
    transform: translateY(5px);
  }
  to {
    transform: translateY(-25px);
  }
}

.body-wrap {
  padding: 0 15px;
  font-family: 'Ubuntu';
}

.body-content {
  // height: 400px;
  // background: white;
  background-color: rgba(230, 230, 230, 0.404);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  animation: 0.7s slidein;
  transform: translateY(-20px);
  // transform: translateY(0px);
  box-shadow: 1px 1px 20px rgba(134, 134, 134, 0.521);
  transition: all 0.3s ease;
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
      animation: 0.7s spin;
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
    color: #3a3939;
    .list-item {
      display: flex;
      height: 50px;
      align-items: center;
      font-size: 16px;
      transform: translateY(40px);
      opacity: 0;
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
