import { ComputedRef } from 'vue';

export type ReqData = {
  columns: string[];
  itemInfo: {
    title: string;
    desc: string;
    price: string;
    topImages: string[];
    highNowPrice: string;
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

export type State = {
  iid: string | string[];
  titles: string[];
  topImages: string[];
  goods: Goods;
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

export type DetailData = {
  state: State;
  reqDetail: (iid: string | string[]) => Promise<void>;
  reqRecommend: () => Promise<void>;
  hasComment: ComputedRef<number>;
};

export class Goods {
  title;
  desc;
  newPrice;
  oldPrice;
  discount;
  columns;
  services;
  nowPrice;
  constructor(
    itemInfo?: ReqData['itemInfo'],
    columns?: string[],
    services?: Record<string, unknown>[]
  ) {
    // 初始化类型时不传参
    if (itemInfo && columns && services) {
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.columns = columns;
      this.services = [];
      if (services.length) {
        for (let i = 0; i < 3; i++) {
          this.services.push(services[i].name);
        }
      }
      this.nowPrice = itemInfo.highNowPrice;
    }
  }
}

export class Shop {
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

export class GoodsParam {
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

export type CartObj = {
  iid: string | string[];
  imgURL: string;
  title: string | undefined;
  desc: string | undefined;
  nowPrice: string | undefined;
  price: string | undefined;
  count: number;
  checked: boolean;
};
