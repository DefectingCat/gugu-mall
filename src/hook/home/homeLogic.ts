import {
  reactive,
  Ref,
  ref,
  onUpdated,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue';

type HomeData = {
  currentSwTab: number;
  swTabs: string[];
  currentTab: string;
  // 当前切换组件
  currentTabComponent: string;
  // 当前切换组件距离顶部的距离
  currentSwY: number;
  // 三个组件分别滚动的距离
  swScrollY: number[];
  // 点击时是否跳转到对应的位置
  tryScroll: boolean;
};
type HomeLogic = {
  homeData: HomeData;
  swTab: Ref<unknown>;
  swTabClick: (i: number) => void;
};

const homeLogic = (): HomeLogic => {
  const homeData: HomeData = reactive({
    currentSwTab: 0,
    swTabs: ['pop', 'new', 'sell'],
    currentTab: 'pop',
    currentTabComponent: 'GoodsListPOP',
    currentSwY: 0,
    swScrollY: [],
    tryScroll: true,
  });
  const swTab = ref();

  onUpdated(async () => {
    await nextTick();
    if (swTab.value) {
      homeData.currentSwY = swTab.value.$el.offsetTop - 44;
    }
  });

  // SwitchTab emit 的点击
  const swTabClick = (i: number): void => {
    homeData.currentSwTab = i;
    homeData.currentTab = homeData.swTabs[i];
    homeData.currentTabComponent = `GoodsList${homeData.swTabs[
      i
    ].toUpperCase()}`;
    // 滚动到记录的对应位置
    if (homeData.tryScroll) {
      window.scrollTo({ top: homeData.swScrollY[homeData.currentSwTab] });
    }
  };

  const scrollListener = () => {
    const scorllY = document.documentElement.scrollTop;
    // 初始化三个组件的位置为距离顶部的高度
    if (!homeData.swScrollY.length) {
      homeData.swScrollY = [
        homeData.currentSwY,
        homeData.currentSwY,
        homeData.currentSwY,
      ];
      // 如果向下滚动，且距离大于距离顶部的位置
    } else if (scorllY >= homeData.currentSwY) {
      // 就记录每个组件的滚动距离，并且在点击时恢复对应的位置
      homeData.tryScroll = true;
      homeData.swScrollY[homeData.currentSwTab] = scorllY;
    } else {
      homeData.tryScroll = false;
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', scrollListener);
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListener);
  });

  return {
    homeData,
    swTab,
    swTabClick,
  };
};

export default homeLogic;
