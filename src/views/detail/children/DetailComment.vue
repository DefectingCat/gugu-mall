<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length">
    <div class="comment-info__header">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="comment-info__user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>
    <div class="comment-info__detail">
      <p>{{ commentInfo.content }}</p>
      <van-image
        :src="item"
        v-for="(item, index) in commentInfo.images"
        :key="item"
        lazy-load
        fit="cover"
        @click="imgClick(index)"
      />
      <!-- 某咸鱼尝试使用teleport自己实现一个modal -->
      <!-- <teleport to="body">
        <transition name="modal-img">
          <div class="modal" v-show="showModal" @click="modalClick">
            <van-image :src="item" fit="cover" />
          </div>
        </transition>
      </teleport> -->
      <div class="comment-info__detail__other">
        <span class="date">{{ commentDate }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Image, ImagePreview } from 'vant';

export default defineComponent({
  name: 'DetailComment',
  components: {
    'van-image': Image,
  },
  props: {
    commentInfo: Object,
  },
  setup(props) {
    const commentDate = computed(() => {
      if (props.commentInfo) {
        const d = new Date(props.commentInfo.created);
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        return date;
      } else {
        return '';
      }
    });
    const imgClick = (i: number) => {
      if (props.commentInfo) {
        ImagePreview({
          images: props.commentInfo.images,
          startPosition: i,
        });
      }
    };
    // 某咸鱼尝试使用teleport自己实现一个modal
    // const commentData = reactive({
    //   showModal: false,
    //   item: '',
    // });
    // const modalClick = () => {
    //   commentData.item = '';
    //   commentData.showModal = false;
    // };
    // const { showModal, item } = toRefs(commentData);
    return {
      commentDate,
      imgClick,
    };
  },
});
</script>

<style scoped lang="scss">
.comment-info {
  padding: 5px 12px;
  color: #333;
  border-bottom: 5px solid #f2f5f8;
  &__header {
    display: flex;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
    justify-content: space-between;
  }
  &__user {
    display: flex;
    align-items: center;
    padding: 10px 0 5px;
    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }
  &__detail {
    p {
      font-size: 14px;
      color: #777;
      line-height: 1.5;
    }
    :deep(.van-image) {
      width: 75px;
      height: 75px;
    }
    &__other {
      .date {
        margin-right: 8px;
      }
      font-size: 12px;
      color: #999;
      margin-top: 10px;
    }
  }
}
// 某咸鱼尝试使用teleport自己实现一个modal
// .modal {
//   display: flex;
//   align-items: center;
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(158, 158, 158, 0.671);
//   z-index: 15;
//   img {
//     width: 100%;
//   }
// }
// .modal-img-enter-active {
//   transition: all 0.3s;
// }
// .modal-img-enter-from,
// .modal-img-leave-to {
//   opacity: 0;
// }
</style>
