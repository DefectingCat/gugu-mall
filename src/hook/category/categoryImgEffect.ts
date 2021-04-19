import { reactive, onUpdated, onMounted, onUnmounted, ref, Ref } from 'vue';

type CateData = {
  cateTopYs: number[];
  itemRefs: Record<string, Record<string, number>>[];
  currentIndex: number;
};
type ImgEffect = {
  titleClick: (e: MouseEvent & { target: Element }) => void;
  cateData: CateData;
  wrapper: Ref<unknown>;
  setItemRef: (el: Record<string, Record<string, number>>) => void;
};

/**
 * 分类滚动跟踪对应标签
 *
 * @param {} type void
 *
 * @return {Object} 接口ImgEffect
 * titleClick: 标签点击方法，切换样式
 * cateData: 存储标签序号与高度
 * wrapper: 子分类滚动的父元素
 * setItemRef: vfor使用ref时推送所有ref
 */
const imgEffect = (): ImgEffect => {
  const cateData: CateData = reactive({
    cateTopYs: [],
    itemRefs: [],
    currentIndex: 0,
  });
  const wrapper = ref();

  const titleClick = (e: MouseEvent & { target: Element }) => {
    const index = e.target.getAttribute('data-xfy-index');
    // cateData.currentIndex = (index as unknown) as number;
    wrapper.value.scrollTo({
      top: cateData.cateTopYs[(index as unknown) as number],
      behavior: 'smooth',
    });
  };

  const scrollListener = () => {
    const topY: number = wrapper.value.scrollTop;
    const len = cateData.cateTopYs.length;
    for (let i = 0; i <= len; i++) {
      if (topY >= cateData.cateTopYs[i] && topY < cateData.cateTopYs[i + 1]) {
        cateData.currentIndex == i ? void 0 : (cateData.currentIndex = i);
        break;
      }
    }
  };

  const setItemRef = (el: Record<string, Record<string, number>>) => {
    if (el) {
      cateData.itemRefs.push(el);
    }
  };
  onUpdated(() => {
    // 保存各个部件的高度
    if (cateData.itemRefs.length) {
      // lazyload 中的 perload 不会触发update，在update中不能获取到正确的高度。
      // 所以需要为subcategory中的图片设置对应的宽和高
      for (const i of cateData.itemRefs) {
        cateData.cateTopYs.push(i.$el.offsetTop - 44);
      }
    }
  });
  onMounted(() => {
    wrapper.value.addEventListener('scroll', scrollListener);
  });
  onUnmounted(() => {
    wrapper.value.removeEventListener('scroll', scrollListener);
  });
  return {
    titleClick,
    cateData,
    wrapper,
    setItemRef,
  };
};

export { imgEffect };
