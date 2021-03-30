import { reactive } from 'vue';
import request from '@/hook/network/request';
// import { AxiosResponse } from 'axios';

interface State {
  banners: Record<string, unknown>[];
  recommend: Record<string, unknown>[];
}

interface HomeData {
  state: State;
  reqSwiper: () => Promise<void>;
}

export function homeRequestEffect(): HomeData {
  const state = reactive({
    banners: [],
    recommend: [],
  });

  // 首页的请求
  const reqSwiper: () => Promise<void> = async () => {
    const res = await request({
      url: '/home/multidata',
    });
    state.banners = res.data.banner.list;
    state.recommend = res.data.recommend.list;
  };

  // const { banners, recommend } = toRefs(state);
  return {
    state,
    reqSwiper,
  };
}
