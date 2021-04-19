import { reactive, computed, ComputedRef } from 'vue';
import request from '@/hook/network/request';

type ReqData = {
  columns: string[];
  itemInfo: {
    topImages: string[];
    [key: string]: unknown;
  };
  shopInfo: {
    services: Record<string, unknown>[];
    [key: string]: unknown;
  };
  detailInfo: unknown;
  itemParams: {
    info: {
      images: string[];
      set: [];
    };
    rule: {
      tables: [][];
    };
  };
  rate: {
    list: Record<string, unknown>[];
  };
};
type State = {
  titles: string[];
  topImages: string[];
  goods: unknown;
  shop: unknown;
  detailInfo: unknown;
  paramInfo: {
    image: string;
    infos: [];
    sizes: [][];
  };
  commentInfo: Record<string, unknown>;
  recommend: {
    goods: {
      list1: [];
      list2: [];
    };
  };
};
type DetailData = {
  state: State;
  reqDetail: (iid: string) => Promise<void>;
  reqRecommend: () => Promise<void>;
  hasComment: ComputedRef<number>;
};

class Goods {
  title;
  desc;
  newPrice;
  oldPrice;
  discount;
  columns;
  services;
  nowPrice;
  constructor(
    itemInfo: Record<string, unknown>,
    columns: string[],
    services: Record<string, unknown>[]
  ) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = [];
    for (let i = 0; i < 3; i++) {
      this.services.push(services[i].name);
    }
    this.nowPrice = itemInfo.highNowPrice;
  }
}

class Shop {
  logo;
  name;
  fans;
  sells;
  score;
  goodsCount;
  constructor(shopInfo: ReqData['shopInfo']) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

class GoodsParam {
  image: string;
  infos: [];
  sizes: [][];
  constructor(
    info: ReqData['itemParams']['info'],
    rule: ReqData['itemParams']['rule']
  ) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

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
    titles: ['商品', '参数', '评论', '推荐'],
    topImages: [],
    goods: {},
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

  const reqDetail = async (iid: string) => {
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
