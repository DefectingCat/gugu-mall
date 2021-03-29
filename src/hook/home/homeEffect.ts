import { reactive, toRefs } from 'vue';
import request from '@/hook/network/request';
// import { AxiosResponse } from 'axios';

const state = reactive({
  banners: [],
  recommend: [],
  currentSwTab: 0,
});

export async function homeRequestEffect(): Promise<void> {
  // 首页的请求
  const res = await request({
    url: '/home/multidata',
  });
  state.banners = res.data.banner.list;
  state.recommend = res.data.recommend.list;
}

// SwitchTab emit 的点击
export function swTabClick(i: number): void {
  state.currentSwTab = i;
}

export const { banners, recommend, currentSwTab } = toRefs(state);
