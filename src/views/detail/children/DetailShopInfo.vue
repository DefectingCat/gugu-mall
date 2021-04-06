<template>
  <div class="shop-info">
    <div class="shop-info__logo">
      <img :src="shop.logo" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-info__main">
      <div class="shop-info__main__item shop-info__main__left">
        <div class="info-sells">
          <div class="sells-count">
            {{ sellCount }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-info__main__item shop-info__main__right">
        <ul>
          <li v-for="item of shop.score" :key="item">
            <span>{{ item.name }}</span>
            <span
              class="item-score"
              :class="{ 'score-better': item.isBetter }"
              >{{ item.score }}</span
            >
            <span class="item-bet" :class="{ 'better-more': item.isBetter }">{{
              item.isBetter ? '高' : '低'
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'DetailShopInfo',
  props: {
    shop: Object,
  },
  setup(props) {
    const sellCount = computed(() => {
      if (props?.shop?.sells < 10000) {
        return props?.shop?.sells;
      } else {
        return (props?.shop?.sells / 10000).toFixed(0) + '万';
      }
    });
    return {
      sellCount,
    };
  },
});
</script>

<style scoped lang="scss">
.shop-info {
  padding: 25px 8px;
  border-top: 5px solid #f2f5f8;
  border-bottom: 5px solid #f2f5f8;
  &__logo {
    display: flex;
    align-items: center;
    img {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      width: 45px;
      margin-right: 10px;
    }
    span {
      color: $main-fontColor;
    }
  }
  &__main {
    display: flex;
    align-items: center;
    margin-top: 15px;
    &__item {
      flex: 1;
    }
    &__left {
      display: flex;
      justify-content: space-evenly;
      color: #333;
      text-align: center;
      align-items: center;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      .sells-count,
      .goods-count {
        font-size: 18px;
      }
      .sells-text,
      .goods-text {
        margin-top: 10px;
        font-size: 12px;
      }
    }
    &__right {
      margin-left: 35px;
      ul {
        display: flex;
        flex-direction: column;
      }
      li {
        font-size: 13px;
        display: grid;
        grid-template-columns: 64px 40px 13px;
        .item-score {
          color: rgb(94, 167, 50);
        }
        .item-bet {
          background: rgb(94, 167, 50);
          color: #fff;
        }
        span {
          margin: 5px 0 5px 0;
        }
        .better-more {
          background: #f13e3a;
          color: #fff;
        }
        .score-better {
          color: #f13e3a;
        }
      }
    }
  }
}
</style>
