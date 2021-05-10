import { MutationTree } from 'vuex';
// types
import { CartObj } from '@/types/detail';
import { State } from '@/types/store';

const storeToLocal = (state: State) => {
  localStorage.setItem('cartList', JSON.stringify(state.cartList));
};

const mutations: MutationTree<State> = {
  // 从 localStorage 恢复数据
  restoreLocal(state, list: CartObj[]) {
    state.cartList = list;
  },

  addCart(state, obj: CartObj): void {
    // find 返回的只原有的值，可以直接修改
    const hasObj = state.cartList.find((item) => item.iid === obj.iid);
    // 如果已经被加入购物车，则count + 1，并增加价格
    if (hasObj) {
      hasObj.count++;
      hasObj.nowPrice
        ? (hasObj.price = (+hasObj.nowPrice * hasObj.count).toFixed(1))
        : void 0;
    } else {
      state.cartList.push(obj);
    }
    storeToLocal(state);
  },

  // 勾选购物车内的物品
  checkItem(state, obj: CartObj): void {
    // 通过iid寻找当前项目
    const hasObj = state.cartList.find((item) => item.iid === obj.iid);
    if (hasObj) {
      hasObj.checked = !hasObj.checked;
    }
    storeToLocal(state);
  },

  // 操作购物车内物品的数量
  creaceItem(state, playload: { obj: CartObj; add: boolean }): void {
    // 通过iid寻找当前项目
    const hasObj = state.cartList.find((item) => item.iid === playload.obj.iid);
    if (hasObj) {
      // 通过传递boolean判断是添加还是减少
      playload.add ? hasObj.count++ : hasObj.count--;
      // 同时修改价格
      hasObj.nowPrice
        ? (hasObj.price = (+hasObj.nowPrice * hasObj.count).toFixed(1))
        : void 0;
    }
    storeToLocal(state);
  },

  // 删除购物车物品
  deleteItem(state, obj: CartObj) {
    // 通过iid寻找当前项目
    const hasObj = state.cartList.find((item) => item.iid === obj.iid);
    if (hasObj) {
      // 由于iid的唯一性，所以直接查找对应的下标
      const index = state.cartList.indexOf(hasObj);
      // 并删除
      state.cartList.splice(index, 1);
    }
    storeToLocal(state);
  },
};

export default mutations;
