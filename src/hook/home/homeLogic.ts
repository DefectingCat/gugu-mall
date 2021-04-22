import { reactive, Ref, ref } from 'vue';

type HomeData = {
  currentSwTab: number;
  swTabs: string[];
  currentTab: string;
  currentTabComponent: string;
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
  });
  const swTab = ref();

  // SwitchTab emit 的点击
  const swTabClick = (i: number): void => {
    homeData.currentSwTab = i;
    homeData.currentTab = homeData.swTabs[i];
    homeData.currentTabComponent = `GoodsList${homeData.swTabs[
      i
    ].toUpperCase()}`;
  };
  return {
    homeData,
    swTab,
    swTabClick,
  };
};

export default homeLogic;
