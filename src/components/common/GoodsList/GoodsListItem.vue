<template>
  <div class="item" @click="goodsItemClick">
    <van-image :src="getImg" alt="" lazy-load />
    <div>
      <p>
        {{ item.title }}
      </p>
      <div class="item__des">
        <span class="item__des__price">
          {{ item.orgPrice }}
        </span>
        <svg class="icon item__des__star" aria-hidden="true">
          <use xlink:href="#icon-Star"></use>
        </svg>
        <span>
          {{ item.cfav }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
// vant
import { Image } from 'vant';

export default defineComponent({
  name: 'GoodsListItem',
  components: {
    'van-image': Image,
  },
  props: {
    item: Object,
  },
  setup(props) {
    const router = useRouter();
    const goodsItemClick = (): void => {
      if (props.item?.iid) {
        router.push('/detail/' + props.item?.iid);
      }
    };
    const getImg = computed(() => {
      if (props.item) {
        return props?.item.img || props?.item.image || props?.item.show.img;
      } else {
        return '';
      }
    });
    return {
      goodsItemClick,
      getImg,
    };
  },
});
</script>

<style scoped lang="scss">
.item {
  font-size: 14px;
  margin-top: 8px;
  :deep(.van-image__img) {
    width: 100%;
    border-radius: 8px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px 0 5px 0;
  }
  &__des {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    line-height: 14px;
    &__star {
      width: 14px;
      margin-right: 4px;
    }
    &__price {
      color: $base-color;
      margin-right: 5px;
    }
  }
}
</style>
