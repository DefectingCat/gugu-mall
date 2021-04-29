import { reactive, toRefs } from 'vue';
import request from '@/hook/network/request';
// types
import { State, ListData, HomeData } from '@/types/home';

// 配合动态组件即可实现商品数据的缓存
export const state: State = reactive({
  banners: [],
  recommend: [],
  goods: {
    pop: {
      page: 47,
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
 * loading、finished: vant UI list组件做加载判断
 * reqSwiper: 轮播图ajax
 * reqGoods: 商品列表ajax
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
    try {
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
    } catch {
      listData.finished = true;
    }
  };

  const { loading, finished } = toRefs(listData);
  return {
    loading,
    finished,
    reqSwiper,
    reqGoods,
  };
}
