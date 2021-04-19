import { reactive, Ref, ref, onMounted, onUnmounted } from 'vue';
// util
import { debounce } from '@/hook/common/util';

interface DetailData {
  currentTitle: number;
  themeTopYs: number[];
}
interface ImgEffect {
  detailData: DetailData;
  titleClick: (e: MouseEvent & { target: Element }, hasComment: number) => void;
  params: Ref<unknown>;
  comment: Ref<unknown>;
  recommendRef: Ref<unknown>;
  recoredY: () => void;
  imgLoad: () => void;
  scrollListener: () => void;
}

/**
 * 图片加载完成后通知更新滚动距离
 *
 * @param null
 * @return {Object} 接口ImgEffect
 */
const imgEffect = (): ImgEffect => {
  const detailData: DetailData = reactive({
    currentTitle: 0,
    themeTopYs: [],
  });
  const params = ref();
  const comment = ref();
  const recommendRef = ref();

  // https://www.designcise.com/web/tutorial/how-to-fix-property-does-not-exist-on-type-eventtarget-typescript-error
  const titleClick = (
    e: MouseEvent & { target: Element },
    hasComment: number
  ) => {
    const target = e.target;
    const Y = (target.getAttribute('data-xfy-index') as unknown) as number;

    if (target.nodeName.toLowerCase() === 'li') {
      if (!hasComment && Y == 2) {
        void 0;
      } else {
        // detailData.currentTitle = Y;
        detailData.themeTopYs.length === 4 && Y == 3
          ? window.scrollTo({
              top: detailData.themeTopYs[Y - 1],
              behavior: 'smooth',
            })
          : window.scrollTo({
              top: detailData.themeTopYs[Y],
              behavior: 'smooth',
            });
      }
    }
  };

  const recoredY = (): void => {
    detailData.themeTopYs = [];
    detailData.themeTopYs.push(0);
    detailData.themeTopYs.push(params.value.$el.offsetTop - 44);
    comment.value.$el.nodeType === 1
      ? detailData.themeTopYs.push(comment.value.$el.offsetTop - 44)
      : void 0;
    detailData.themeTopYs.push(
      recommendRef.value.$el.nextElementSibling.offsetTop - 44
    );
    detailData.themeTopYs.push(Number.MAX_VALUE);
  };
  const imgLoaded = (): void => {
    recoredY();
  };
  // 图片加载完成后记录 top 值
  const imgLoad = debounce(imgLoaded, 100);

  const scrollListener = (): void => {
    const listener = () => {
      const topY: number = document.documentElement.scrollTop;
      const len = detailData.themeTopYs.length;

      for (let i = 0; i < len; i++) {
        if (
          topY >= detailData.themeTopYs[i] &&
          topY < detailData.themeTopYs[i + 1]
        ) {
          if (detailData.currentTitle !== i) {
            // 在没有评论的情况下多加1
            len === 4 && i === 2
              ? (detailData.currentTitle = i + 1)
              : (detailData.currentTitle = i);
          }
          break;
        }
      }
    };
    onMounted(() => {
      window.addEventListener('scroll', listener);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', listener);
    });
  };

  return {
    detailData,
    titleClick,
    params,
    comment,
    recommendRef,
    recoredY,
    imgLoad,
    scrollListener,
  };
};

export { imgEffect };
