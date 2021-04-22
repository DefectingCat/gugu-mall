import { reactive, onActivated, Ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

type RecordData = {
  scrolledY: number;
};
type RcordScroll = {
  recordData: RecordData;
};

/**
 * 记录页面离开时的滚动位置
 *
 * @param {el?} type Ref 可选参数，指定滚动的元素
 *
 * @return {Object} RecordData
 * RecordData：记录滚动的位置
 */
const recordScroll = (el?: Ref): RcordScroll => {
  const recordData: RecordData = reactive({
    scrolledY: 0,
  });

  if (el) {
    // 切换路由时记录首页滚动的位置
    onBeforeRouteLeave(() => {
      recordData.scrolledY = el.value.scrollTop;
    });
    onActivated(() => {
      el.value.scrollTop = recordData.scrolledY;
    });
  } else {
    onBeforeRouteLeave(() => {
      recordData.scrolledY = document.documentElement.scrollTop;
    });
    onActivated(() => {
      document.documentElement.scrollTop = recordData.scrolledY;
    });
  }

  return {
    recordData,
  };
};
export default recordScroll;
