import { reactive, computed } from 'vue';
import request from '@/hook/network/request';
import {
  ReqData,
  State,
  DetailData,
  Goods,
  Shop,
  GoodsParam,
} from '@/types/detail';

/**
 * 详情页数据请求
 *
 * @param {string} iid 请求对应id的商品
 * @return {Object} 接口DetailData
 * state: 存储详情页各个数据
 * reqDetail: 发送详情页ajax
 * reqRecommend: 发送推荐ajax
 * hasComment: 判断详情页是否有评论
 */
export function detailReq(): DetailData {
  const state: State = reactive({
    iid: '',
    titles: ['商品', '参数', '评论', '推荐'],
    topImages: [],
    // 初始化类型
    goods: new Goods(),
    shop: {},
    detailInfo: {},
    paramInfo: {
      image: '',
      infos: [],
      sizes: [],
    },
    commentInfo: {},
    recommend: {
      goods: {
        list1: [],
        list2: [],
      },
    },
  });

  // 这里的 iid 只会是 string
  const reqDetail = async (iid: string | string[]) => {
    // 顺便保存下 iid
    state.iid = iid;
    const res = await request({
      url: '/detail',
      params: {
        iid,
      },
    });
    const data: ReqData = res.result;

    // 轮播图
    state.topImages = data.itemInfo.topImages;
    // 价格等信息
    state.goods = new Goods(
      data.itemInfo,
      data.columns,
      data.shopInfo.services
    );

    // 店铺信息
    state.shop = new Shop(data.shopInfo);
    // goods desciption
    state.detailInfo = data.detailInfo;
    // 商品参数信息
    state.paramInfo = new GoodsParam(
      data.itemParams.info,
      data.itemParams.rule
    );
    // 用户评论信息
    data.rate.list
      ? (state.commentInfo = data.rate.list[0])
      : (state.commentInfo = {});
  };

  const reqRecommend = async () => {
    const res = await request({
      url: '/recommend',
    });
    const paging = Math.floor(res.data.list.length / 2);
    const p1: [] = res.data.list.slice(0, paging);
    const p2: [] = res.data.list.slice(paging, res.data.list.length);
    state.recommend.goods.list1.push(...p1);
    state.recommend.goods.list2.push(...p2);
  };

  // 检测是否有评论
  const hasComment = computed(() => {
    return Object.keys(state.commentInfo).length;
  });

  return {
    state,
    reqDetail,
    reqRecommend,
    hasComment,
  };
}
