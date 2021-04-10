import { reactive, Ref, ref } from 'vue';
// util
import { debounce } from '@/hook/common/util';

interface DetailData {
  currentTitle: number;
  themeTopYs: number[];
}
interface ImgEffect {
  titleClick: (e: MouseEvent & { target: Element }) => void;
  params: Ref<unknown>;
  comment: Ref<unknown>;
  recommendRef: Ref<unknown>;
  recoredY: () => void;
  imgLoad: () => void;
}

const detailData: DetailData = reactive({
  currentTitle: 0,
  themeTopYs: [],
});

/**
 * 图片加载完成后通知更新滚动距离
 *
 * @param null
 * @return {Object} 接口ImgEffect
 */
const imgEffect = (): ImgEffect => {
  const params = ref();
  const comment = ref();
  const recommendRef = ref();

  // https://www.designcise.com/web/tutorial/how-to-fix-property-does-not-exist-on-type-eventtarget-typescript-error
  const titleClick = (e: MouseEvent & { target: Element }) => {
    const target = e.target;
    const Y = (target.getAttribute('data-xfy-index') as unknown) as number;
    if (target.nodeName.toLowerCase() === 'li') {
      detailData.currentTitle = Y;
    }
    window.scrollTo({
      top: detailData.themeTopYs[Y],
      behavior: 'smooth',
    });
  };

  const recoredY = (): void => {
    detailData.themeTopYs = [];
    detailData.themeTopYs.push(0);
    detailData.themeTopYs.push(params.value.$el.offsetTop - 44);
    detailData.themeTopYs.push(comment.value.$el.offsetTop - 44);
    detailData.themeTopYs.push(
      recommendRef.value.$el.nextElementSibling.offsetTop - 44
    );
    console.log(detailData.themeTopYs);
  };
  const imgLoaded = (): void => {
    recoredY();
  };
  const imgLoad = debounce(imgLoaded, 100);
  return { titleClick, params, comment, recommendRef, recoredY, imgLoad };
};
export { detailData, imgEffect };
