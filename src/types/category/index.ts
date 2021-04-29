import { Ref } from 'vue';

export type State = {
  categories: Record<string, unknown>[];
  subCategories: Record<string, unknown>;
};
export type ReqCategory = {
  state: State;
  getCategoryList: () => Promise<void>;
  getCategoryData: () => Promise<void>;
};

// imgEffect
export type CateData = {
  cateTopYs: number[];
  itemRefs: Record<string, Record<string, number>>[];
  currentIndex: number; // 当前索引
  listRefs: HTMLElement[]; //
  prePrevious: HTMLElement;
  preNext: HTMLElement;
};
export type ImgEffect = {
  titleClick: (e: MouseEvent & { target: Element }) => void;
  cateData: CateData;
  wrapper: Ref<unknown>;
  setItemRef: (el: Record<string, Record<string, number>>) => void;
  setListRef: (el: HTMLElement) => void;
};
