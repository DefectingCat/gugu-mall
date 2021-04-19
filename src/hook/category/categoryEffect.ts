import request from '@/hook/network/request';
import { reactive } from 'vue';

interface State {
  categories: Record<string, unknown>[];
  subCategories: Record<string, unknown>;
}
interface ReqCategory {
  state: State;
  getCategoryList: () => Promise<void>;
  getCategoryData: () => Promise<void>;
}

const reqCategory = (): ReqCategory => {
  const state = reactive({
    categories: [],
    subCategories: {},
  });
  const getCategoryList = async () => {
    const res = await request({
      url: '/category',
    });
    state.categories = res.data.category.list;
  };
  const getCategoryData = async () => {
    const res = await request({
      url: '/subcategory',
    });
    // 过滤多余数据
    if (res) {
      delete res.use;
      delete res._id;
    }
    console.log(res);
    state.subCategories = res;
  };

  return {
    state,
    getCategoryList,
    getCategoryData,
  };
};

export { reqCategory };
