import { reactive, Ref, toRefs } from 'vue';
import request from '@/hook/network/request';
// import { AxiosResponse } from 'axios';

interface HomeEffect {
  banners: Ref<never[]>;
  reqSwiper: () => Promise<void>;
}

export function homeRequestEffect(): HomeEffect {
  const state = reactive({
    banners: [],
  });
  const reqSwiper = async (): Promise<void> => {
    const res = await request({
      url: '/home/multidata',
    });
    console.log(res);

    state.banners = res.data.banner.list;
  };
  const { banners } = toRefs(state);
  return {
    banners,
    reqSwiper,
  };
}
