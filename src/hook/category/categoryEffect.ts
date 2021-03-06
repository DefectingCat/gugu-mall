import request from '@/hook/network/request';
import { reactive } from 'vue';
// types
import { ReqCategory } from '@/types/category';

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
    state.subCategories = res;
  };

  return {
    state,
    getCategoryList,
    getCategoryData,
  };
};

export { reqCategory };
