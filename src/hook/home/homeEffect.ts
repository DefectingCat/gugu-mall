import { reactive, toRefs, Ref } from 'vue';
import request from '@/hook/network/request';

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
}
interface ListData {
  loading: boolean;
  finished: boolean;
}
interface HomeData {
  loading: Ref<boolean>;
  finished: Ref<boolean>;
  reqSwiper: () => Promise<void>;
  reqGoods: (type: string) => Promise<void>;
}

// 这里将商品的数据都集中放在这里让子组件`GoodsList`单独管理
// 配合动态组件即可实现商品数据的缓存
export const state: State = reactive({
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
});

/**
 * 首页轮播图以及商品列表数据请求
 *
 * @param {string} type reqGoods 接受一个类型的参数，
 * 请求不同的商品信息
 * @return {Object} 接口HomeData
 */
export function homeRequestEffect(): HomeData {
  const listData: ListData = reactive({
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
    listData.loading = false;
  };

  const { loading, finished } = toRefs(listData);
  return {
    loading,
    finished,
    reqSwiper,
    reqGoods,
  };
}
