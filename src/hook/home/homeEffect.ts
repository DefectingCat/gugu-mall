import { reactive } from 'vue';
import request from '@/hook/network/request';
// import { AxiosResponse } from 'axios';
interface GoodsData {
  page: number;
  list1: Record<string, unknown>[];
  list2: Record<string, unknown>[];
}
interface State {
  banners: Record<string, unknown>[];
  recommend: Record<string, unknown>[];
  goods: {
    pop: GoodsData;
    new: GoodsData;
    sell: GoodsData;
    // 索引签名，通过定义接口用来对对象key的约束
    [key: string]: GoodsData;
  };
  loading: boolean;
  finished: boolean;
}
interface HomeData {
  state: State;
  reqSwiper: () => Promise<void>;
  reqGoods: (type: string) => Promise<void>;
}

export function homeRequestEffect(): HomeData {
  const state: State = reactive({
    banners: [],
    recommend: [],
    goods: {
      pop: {
        page: 0,
        list1: [],
        list2: [],
      },
      new: {
        page: 0,
        list1: [],
        list2: [],
      },
      sell: {
        page: 0,
        list1: [],
        list2: [],
      },
    },
    loading: false,
    finished: false,
  });

  // 首页的请求
  const reqSwiper = async (): Promise<void> => {
    const res = await request({
      url: '/home/multidata',
    });
    state.banners = res.data.banner.list;
    state.recommend = res.data.recommend.list;
  };

  // 商品的请求
  const reqGoods = async (type: string): Promise<void> => {
    const page = state.goods[type].page + 1;
    const res = await request({
      url: '/home/data',
      params: {
        type,
        page,
      },
    });
    const paging = Math.floor(res.data.list.length / 2);
    const p1 = res.data.list.slice(0, paging);
    const p2 = res.data.list.slice(paging, res.data.list.length);
    state.goods[type].list1.push(...p1);
    state.goods[type].list2.push(...p2);
    state.goods[type].page = page;
    state.loading = false;
  };

  // const { banners, recommend } = toRefs(state);
  return {
    state,
    reqSwiper,
    reqGoods,
  };
}
