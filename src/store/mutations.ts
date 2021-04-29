import { MutationTree } from 'vuex';
// types
import { CartObj } from '@/types/detail';
import { State } from '@/types/store';

const mutations: MutationTree<State> = {
  addCart(state, obj: CartObj): void {
    // find 返回的只原有的值，可以直接修改
    const hasObj = state.cartList.find((item) => item.iid === obj.iid);
    // 如果已经被加入购物车，则count + 1，并增加价格
    if (hasObj) {
      hasObj.count++;
      hasObj.nowPrice
        ? // +号 用于类型转换，toFixed之后是string 需要再次使用一个 + 号
          (hasObj.price = +(+hasObj.nowPrice * hasObj.count).toFixed(1))
        : void 0;
    } else {
      state.cartList.push(obj);
    }
    console.log(state);
  },
};

export default mutations;
