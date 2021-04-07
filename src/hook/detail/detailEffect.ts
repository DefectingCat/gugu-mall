import { reactive } from 'vue';
import request from '@/hook/network/request';

interface ReqData {
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
}
interface State {
  titles: string[];
  topImages: string[];
  goods: unknown;
  shop: unknown;
  detailInfo: unknown;
}
interface DetailData {
  reqDetail: (iid: string) => Promise<void>;
}

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

export const state: State = reactive({
  titles: ['商品', '参数', '评论', '推荐'],
  topImages: [],
  goods: {},
  shop: {},
  detailInfo: {},
});

export function detailReq(): DetailData {
  const reqDetail = async (iid: string) => {
    const res = await request({
      url: '/detail',
      params: {
        iid,
      },
    });
    const data: ReqData = res.result;
    console.log(data);

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
  };
  return {
    reqDetail,
  };
}
