import {
  reactive,
  onUpdated,
  onMounted,
  onUnmounted,
  ref,
  nextTick,
} from 'vue';
// types
import { CateData, ImgEffect } from '@/types/category';

/**
 * 分类滚动跟踪对应标签&小圆角
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
    // 小圆角
    listRefs: [],
    // 获取到的节点类型时HTMLElement，所以这里需要使用createElement创建一个HTMLElement
    prePrevious: document.createElement('div'),
    preNext: document.createElement('div'),
  });
  const wrapper = ref();

  const titleClick = (e: MouseEvent & { target: Element }) => {
    const index = e.target.getAttribute('data-xfy-index');
    // cateData.currentIndex = (index as unknown) as number;
    wrapper.value.scrollTo({
      top: cateData.cateTopYs[index as unknown as number],
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
    // 每次节点改变时，都会触发这个方法，会导致一直push
    // 为了防止长度无限增加，需要添加条件判断
    if (el && cateData.itemRefs.length < 16) {
      cateData.itemRefs.push(el);
    }
  };

  const setListRef = (el: HTMLElement) => {
    // 每次节点改变时，都会触发这个方法，会导致一直push
    // 为了防止长度无限增加，需要添加条件判断
    if (el && cateData.listRefs.length < 16) {
      cateData.listRefs.push(el);
    }
  };

  onUpdated(async () => {
    await nextTick();
    /*
     * 只要响应式数据没有在实际 DOM 中，则更新对应的数据是不会再次触发 updated。
     */
    // 保存各个部件的高度
    if (cateData.itemRefs.length && cateData.cateTopYs.length < 16) {
      // lazyload 中的 perload 不会触发update，在update中不能获取到正确的高度。
      // 所以需要为subcategory中的图片设置对应的宽和高
      for (const i of cateData.itemRefs) {
        cateData.cateTopYs.push(i.$el.offsetTop - 44);
      }
      // 为数组末尾添加一个最大值，做最后一个列表的判断
      cateData.cateTopYs.push(Number.MAX_VALUE);
    }
    // 咕咕咕
    // 选择当前激活的list的相邻兄弟节点
    const previous = cateData.listRefs[cateData.currentIndex]
      .previousElementSibling as HTMLElement;
    const next = cateData.listRefs[cateData.currentIndex]
      .nextElementSibling as HTMLElement;
    // 如果前或后一个节点存在，则添加小圆角
    if (previous) {
      cateData.prePrevious
        ? (cateData.prePrevious.style.borderBottomRightRadius = '')
        : void 0;
      previous.style.borderBottomRightRadius = '10px';
    }
    if (next) {
      cateData.preNext
        ? (cateData.preNext.style.borderTopRightRadius = '')
        : void 0;
      next.style.borderTopRightRadius = '10px';
    }
    // 保存当前的兄弟节点，等到激活的list切换时，将上两个兄弟节点的style去除
    cateData.prePrevious = previous;
    cateData.preNext = next;
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
    setListRef,
  };
};

export { imgEffect };
