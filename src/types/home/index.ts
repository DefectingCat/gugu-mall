import { Ref } from 'vue';

export type GoodsData = {
  page: number;
  list1: Record<string, unknown>[];
  list2: Record<string, unknown>[];
};
export type State = {
  banners: Record<string, unknown>[];
  recommend: Record<string, unknown>[];
  goods: {
    pop: GoodsData;
    new: GoodsData;
    sell: GoodsData;
    // 索引签名，通过定义接口用来对对象key的约束
    [key: string]: GoodsData;
  };
};
export type ListData = {
  loading: boolean;
  finished: boolean;
};
export type HomeData = {
  loading: Ref<boolean>;
  finished: Ref<boolean>;
  reqSwiper: () => Promise<void>;
  reqGoods: (type: string) => Promise<void>;
};
